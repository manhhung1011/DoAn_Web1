var nameProduct, maProduct, sanPhamHienTai; // Tên sản phẩm trong trang này, 
// là biến toàn cục để có thể dùng ở bát cứ đâu trong trang
// không cần tính toán lấy tên từ url nhiều lần

window.onload = function () {
    khoiTao();

    // thêm tags (từ khóa) vào khung tìm kiếm
    var tags = ["Nồi chiên", "Máy xay", "Vợt cầu lông", "Giày thể thao", "Tai nghe bluetooth"];
    for (var t of tags) addTags(t, "index.html?search=" + t, true);

    phanTich_URL_chiTietSanPham();

    // autocomplete cho khung tim kiem
    autocomplete(document.getElementById('search-box'), list_products);

    // Thêm gợi ý sản phẩm
    sanPhamHienTai && suggestion();
}

function khongTimThaySanPham() {
    document.getElementById('productNotFound').style.display = 'block';
    document.getElementsByClassName('chitietSanpham')[0].style.display = 'none';
}

function phanTich_URL_chiTietSanPham() {
    nameProduct = window.location.href.split('?')[1]; // lấy tên
    if(!nameProduct) return khongTimThaySanPham();

    nameProduct = decodeURIComponent(nameProduct);
    // tách theo dấu '-' vào gắn lại bằng dấu ' ', code này giúp bỏ hết dấu '-' thay vào bằng khoảng trắng.
    // code này làm ngược lại so với lúc tạo href cho sản phẩm trong file classes.js
    nameProduct = nameProduct.split('-').join(' ');

    // Fuzzy name matching with diacritics normalization
    function normalizeName(name) {
        return name.toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd');
    }
    var normalizedQuery = normalizeName(nameProduct);
    for(var p of list_products) {
        if(normalizeName(p.name) === normalizedQuery) {
            maProduct = p.masp;
            break;
        }
    }

    sanPhamHienTai = timKiemTheoMa(list_products, maProduct);
    if(!sanPhamHienTai) return khongTimThaySanPham();

    var divChiTiet = document.getElementsByClassName('chitietSanpham')[0];

    // Đổi title
    document.title = nameProduct + ' - Thế giới mua sắm';

    // Cập nhật tên h1
    var h1 = document.getElementById('product-title');
    h1.innerHTML = nameProduct;

    // Cập nhật sao
    var rating = "";
    if (sanPhamHienTai.rateCount > 0) {
        for (var i = 1; i <= 5; i++) {
            if (i <= sanPhamHienTai.star) {
                rating += `<i class="fa fa-star"></i>`
            } else {
                rating += `<i class="fa fa-star-o"></i>`
            }
        }
        rating += `<span> ` + sanPhamHienTai.rateCount + ` đánh giá</span>`;
    }
    divChiTiet.getElementsByClassName('rating')[0].innerHTML += rating;

    // Cập nhật giá + label khuyến mãi
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    if (sanPhamHienTai.promo.name != 'giareonline') {
        price.innerHTML = `<strong>` + sanPhamHienTai.price + `₫</strong>`;
        price.innerHTML += new Promo(sanPhamHienTai.promo.name, sanPhamHienTai.promo.value).toWeb();
    } else {
        document.getElementsByClassName('ship')[0].style.display = ''; // hiển thị 'giao hàng trong 1 giờ'
        price.innerHTML = `<strong>` + sanPhamHienTai.promo.value + `&#8363;</strong>
					        <span>` + sanPhamHienTai.price + `&#8363;</span>`;
    }

    // Cập nhật chi tiết khuyến mãi
    document.getElementById('detailPromo').innerHTML = getDetailPromo(sanPhamHienTai);

    // Cập nhật thông số động - chỉ hiển thị thuộc tính có dữ liệu phù hợp sản phẩm
    var info = document.getElementsByClassName('info')[0];
    var s = '';
    var detail = sanPhamHienTai.detail;
    var specs = {
        'Chất liệu': 'material',
        'Kích thước': 'size',
        'Màu sắc': 'colors',
        'Chất liệu vải': 'fabric',
        'Form dáng': 'fit',
        'Công suất': 'power',
        'Dung tích': 'capacity',
        'Màn hình': 'screen',
        'Hệ điều hành': 'os',
        'CPU': 'cpu',
        'RAM': 'ram',
        'Bộ nhớ trong': 'rom',
        'Pin': 'battery',
        'Camera sau': 'camara',
        'Camera trước': 'camaraFront'
    };
    // Universal specs - show all available
    for(var specName in specs) {
        var field = specs[specName];
        if(detail[field]) {
            s += addThongSo(specName, detail[field]);
        }
    }
    // Add unmapped details
    for(var key in detail) {
        if(!Object.values(specs).includes(key)) {
            s += '<li><p>' + key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') + ':</p><div>' + detail[key] + '</div></li>';
        }
    }
    if(s == '') s = '<li><p>Chưa có thông số chi tiết</p></li>';
    info.innerHTML = s;

// Cập nhật hình
    var hinh = divChiTiet.getElementsByClassName('picture')[0];
    hinh = hinh.getElementsByTagName('img')[0];
    var localImg = localProductImages[sanPhamHienTai.masp] || 'img/products/placeholder-product.jpg' || sanPhamHienTai.img;
    hinh.src = localImg;
    hinh.onerror = function() { this.src = 'img/logo.png'; }; // fallback
    document.getElementById('bigimg').src = localImg;
    document.getElementById('bigimg').onerror = function() { this.src = 'img/logo.png'; };

    // Hình nhỏ - dynamic based on product masp
    var mainImg = localProductImages[sanPhamHienTai.masp] || sanPhamHienTai.img;
    var smallImgs = [mainImg, mainImg, mainImg, mainImg]; // fallback to main for all small
    for(var i=0; i<smallImgs.length; i++) {
        addSmallImg(smallImgs[i]);
    }

    // Khởi động thư viện hỗ trợ banner - chỉ chạy sau khi tạo xong hình nhỏ
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 5,
        center: true,
        smartSpeed: 450,
    });
}

// Chi tiết khuyến mãi
function getDetailPromo(sp) {
    switch (sp.promo.name) {
        case 'tragop':
            var span = `<span style="font-weight: bold"> lãi suất ` + sp.promo.value + `% </span>`;
            return `Khách hàng có thể mua trả góp sản phẩm với ` + span + `với thời hạn 6 tháng kể từ khi mua hàng.`;

        case 'giamgia':
            var span = `<span style="font-weight: bold">` + sp.promo.value + `</span>`;
            return `Khách hàng sẽ được giảm ` + span + `₫ khi tới mua trực tiếp tại cửa hàng`;

        case 'moiramat':
            return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;

        case 'giareonline':
            var del = stringToNum(sp.price) - stringToNum(sp.promo.value);
            var span = `<span style="font-weight: bold">` + numToString(del) + `</span>`;
            return `Sản phẩm sẽ được giảm ` + span + `₫ khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`;

        default:
            var span = `<span style="font-weight: bold">61 xe Wave Alpha</span>`;
            return `Cơ hội trúng ` + span + ` khi trả góp Home Credit`;
    }
}

function addThongSo(ten, giatri) {
    return `<li>
                <p>` + ten + `</p>
                <div>` + giatri + `</div>
            </li>`;
}

// add hình
function addSmallImg(img) {
    var newDiv = `<div class='item'>
                        <a>
                            <img src=` + img + ` onclick="changepic(this.src)">
                        </a>
                    </div>`;
    var banner = document.getElementsByClassName('owl-carousel')[0];
    banner.innerHTML += newDiv;
}

// đóng mở xem hình
function opencertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(1)";
}

function closecertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(0)";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
    document.getElementById("bigimg").src = src;
}

// Thêm sản phẩm vào các khung sản phẩm
function addKhungSanPham(list_sanpham, tenKhung, color, ele) {
	// convert color to code
	var gradient = `background-image: linear-gradient(120deg, ` + color[0] + ` 0%, ` + color[1] + ` 50%, ` + color[0] + ` 100%);`
	var borderColor = `border-color: ` + color[0];
	var borderA = `	border-left: 2px solid ` + color[0] + `;
					border-right: 2px solid ` + color[0] + `;`;

	// mở tag
	var s = `<div class="khungSanPham" style="` + borderColor + `">
				<h3 class="tenKhung" style="` + gradient + `">* ` + tenKhung + ` *</h3>
				<div class="listSpTrongKhung flexContain">`;

	for (var i = 0; i < list_sanpham.length; i++) {
		s += addProduct(list_sanpham[i], null, true);
		// truyền vào 'true' để trả về chuỗi rồi gán vào s
	}

	// thêm khung vào contain-khung
	ele.innerHTML += s;
}

/// gợi ý sản phẩm
function suggestion(){
    // ====== Lay ra thong tin san pham hien tai ====== 
    const giaSanPhamHienTai = stringToNum(sanPhamHienTai.price);

    // ====== Tìm các sản phẩm tương tự theo tiêu chí ====== 
    const sanPhamTuongTu = list_products
    // Lọc sản phẩm trùng
    .filter((_) => _.masp !== sanPhamHienTai.masp)
    // Tính điểm cho từng sản phẩm
    .map(sanPham => {
        // Tiêu chí 1: giá sản phẩm ko lệch nhau quá 1 triệu
        const giaSanPham = stringToNum(sanPham.price);
        let giaTienGanGiong = Math.abs(giaSanPham - giaSanPhamHienTai) < 1000000;

        // Tiêu chí 2: các thông số kỹ thuật giống nhau
        let soLuongChiTietGiongNhau = 0;
        for(let key in sanPham.detail) {
            let value = sanPham.detail[key];
            let currentValue = sanPhamHienTai.detail[key];

            if(value == currentValue) soLuongChiTietGiongNhau++;
        }
        let giongThongSoKyThuat  = soLuongChiTietGiongNhau >= 3;

        // Tiêu chí 3: cùng hãng sản xuất 
        let cungHangSanXuat = sanPham.company ===  sanPhamHienTai.company

        // Tiêu chí 4: cùng loại khuyến mãi
        let cungLoaiKhuyenMai = sanPham.promo?.name === sanPhamHienTai.promo?.name;
        
        // Tiêu chí 5: có đánh giá, số sao
        let soDanhGia = Number.parseInt(sanPham.rateCount, 10)
        let soSao = Number.parseInt(sanPham.star, 10);

        // Tính điểm cho sản phẩm này (càng thoả nhiều tiêu chí điểm càng cao => càng nên gợi ý)
        let diem = 0;
        if(giaTienGanGiong) diem += 20;
        if(giongThongSoKyThuat) diem += soLuongChiTietGiongNhau;
        if(cungHangSanXuat) diem += 15;
        if(cungLoaiKhuyenMai) diem += 10;
        if(soDanhGia > 0) diem += (soDanhGia + '').length;
        diem += soSao;

        // Thêm thuộc tính diem vào dữ liệu trả về
        return {
            ...sanPham,
            diem: diem
        };
    })
    // Sắp xếp theo số điểm cao xuống thấp
    .sort((a,b) => b.diem - a.diem)
    // Lấy ra 10 sản phẩm đầu tiên
    .slice(0, 10);

    console.log(sanPhamTuongTu)

    // ====== Hiển thị 5 sản phẩm lên web ====== 
    if(sanPhamTuongTu.length) {
        let div = document.getElementById('goiYSanPham');
        addKhungSanPham(sanPhamTuongTu, 'Bạn có thể thích', ['#434aa8', '#ec1f1f'], div);
    }
}