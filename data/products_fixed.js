var list_products = [
  // ===== Thời Trang Nam =====
  {
    "name": "Áo Thun Nam Premium Basic",
    "company": "Thời Trang Nam",
    "img": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    "price": "250.000",
    "star": 4,
    "rateCount": 128,
    "promo": { "name": "giamgia", "value": "50.000" },
    "detail": {
      "material": "100% Cotton",
      "fit": "Thoáng khí, co giãn 4 chiều",
      "size": "XS - 3XL",
      "colors": "Trắng, Đen, Xanh, Xám (Nhiều màu)",
      "fabric": "Siêu mềm, thoáng mát",
      "care": "Dễ giặt, không phai màu",
      "origin": "Hàng Việt Nam chất lượng cao"
    },
    "masp": "TTM0"
  },
  {
    "name": "Quần Nam Khaki Cao Cấp",
    "company": "Thời Trang Nam",
    "img": "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    "price": "450.000",
    "star": 5,
    "rateCount": 256,
    "promo": { "name": "tragop", "value": "0" },
    "detail": {
      "material": "Khaki cotton cao cấp",
      "fit": "Slim fit chuẩn form",
      "size": "28 - 38",
      "colors": "Xám, Be, Đen",
      "fabric": "Ít nhăn, thoáng khí, bền màu",
      "feature": "Sang trọng, nam tính",
      "care": "Giặt máy an toàn"
    },
    "masp": "TTM1"
  },
  {
    "name": "Áo Sơ Mi Nam Tay Dài",
    "company": "Thời Trang Nam",
    "img": "https://images.unsplash.com/photo-1596362051433-8f6ccf87aabc?w=400&h=400&fit=crop",
    "price": "350.000",
    "star": 4,
    "rateCount": 189,
    "promo": { "name": "moiramat", "value": "0" },
    "detail": {
      "material": "Cotton 70%, Polyester 30%",
      "fit": "Regular fit",
      "size": "XS - 2XL",
      "colors": "Trắng, Xanh, Đỏ",
      "feature": "Khuy tự nhiên, cổ Vĩnh Phúc, thêu tinh tế",
      "occasion": "Công sở, lịch sự",
      "care": "Giặt nước ấm"
    },
    "masp": "TTM2"
  },
  // ===== Điện Thoại & Phụ kiện =====
  {
    "name": "iPhone 14 Pro Max",
    "company": "Điện Thoại & Phụ Kiện",
    "img": "https://images.unsplash.com/photo-1592286927505-1fed2f2c7f87?w=400&h=400&fit=crop",
    "price": "25.990.000",
    "star": 5,
    "rateCount": 512,
    "promo": { "name": "tragop", "value": "0" },
    "detail": {
      "screen": "6.7 inch Super Retina XDR",
      "os": "iOS 16 (cập nhật iOS 17)",
      "camara": "48 MP chính + 12 MP ultra-wide + 12 MP telephoto",
      "camaraFront": "12 MP TrueDepth",
      "cpu": "Apple A16 Bionic 6-core",
      "ram": "6 GB",
      "rom": "256 GB / 512 GB / 1 TB",
      "battery": "4323 mAh, sạc nhanh 20W, MagSafe",
      "connectivity": "5G, WiFi 6E, Bluetooth 5.3, Face ID"
    },
    "masp": "DTP0"
  },
  {
    "name": "Samsung Galaxy S23 Ultra",
    "company": "Điện Thoại & Phụ Kiện",
    "img": "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop",
    "price": "24.990.000",
    "star": 5,
    "rateCount": 478,
    "promo": { "name": "giamgia", "value": "1.000.000" },
    "detail": {
      "screen": "6.8 inch Dynamic AMOLED 2X, 120Hz QHD+",
      "os": "Android 13, One UI 5.1 (up 4 năm Android)",
      "camara": "200 MP chính + 12 MP ultra-wide + 10 MP tele 3x + 10 MP tele 10x",
      "camaraFront": "12 MP",
      "cpu": "Snapdragon 8 Gen 2 for Galaxy",
      "ram": "8 GB / 12 GB",
      "rom": "256 GB / 512 GB / 1 TB",
      "battery": "5000 mAh, sạc nhanh 45W, sạc không dây",
      "connectivity": "5G, WiFi 6E, UWB"
    },
    "masp": "DTP1"
  },
  // Continue for other categories similarly...
  {
    "name": "Tai Nghe Bluetooth Sony WH-1000XM5",
    "company": "Điện Thoại & Phụ Kiện",
    "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "price": "9.990.000",
    "star": 5,
    "rateCount": 356,
    "promo": { "name": "moiramat", "value": "0" },
    "detail": {
      "technology": "ANC chủ động cao cấp HD",
      "connectivity": "Bluetooth 5.2 + LDAC",
      "battery": "30 giờ (ANC on), sạc nhanh 3 phút = 3 giờ",
      "driver": "30mm carbon fiber",
      "weight": "250g",
      "feature": "Speak-to-Chat, Adaptive Sound Control, 360 Reality Audio",
      "mic": "8 micro AI beamforming",
      "multiDevice": "Kết nối 2 thiết bị",
      "origin": "Nhật Bản"
    },
    "masp": "DTP2"
  },
  // Add more products with proper fields...
];
console.log('Products loaded:', list_products.length);
