export interface Location {
  name: string;
  slug: string;
}

export interface Province {
  id: number;
  name: string;
  slug: string;
  region: string;
  image: string;
  locations: Location[];
}

export const VIETNAM_PROVINCES: Province[] = [
  // Thành phố trực thuộc Trung ương
  { 
    id: 1, 
    name: "Hà Nội", 
    slug: "ha-noi", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1758104372690-0e14bc4dec5c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Hoàn Kiếm", slug: "hoan-kiem" }, { name: "Cầu Giấy", slug: "cau-giay" }, { name: "Hai Bà Trưng", slug: "hai-ba-trung" }, { name: "Đống Đa", slug: "dong-da" }, { name: "Tây Hồ", slug: "tay-ho" }] 
  },
  { 
    id: 2, 
    name: "Hồ Chí Minh", 
    slug: "ho-chi-minh", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1593407741958-59550f282621?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Quận 1", slug: "quan-1" }, { name: "Quận 2", slug: "quan-2" }, { name: "Quận 7", slug: "quan-7" }, { name: "Bình Thạnh", slug: "binh-thanh" }, { name: "Phú Nhuận", slug: "phu-nhuan" }] 
  },
  { 
    id: 3, 
    name: "Đà Nẵng", 
    slug: "da-nang", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Sơn Trà", slug: "son-tra" }, { name: "Hải Châu", slug: "hai-chau" }, { name: "Ngũ Hành Sơn", slug: "ngu-hanh-son" }, { name: "Thanh Khê", slug: "thanh-khe" }, { name: "Liên Chiểu", slug: "lien-chieu" }] 
  },
  { 
    id: 4, 
    name: "Hải Phòng", 
    slug: "hai-phong", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1623546802249-89cf2bba0d38?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Hồng Bàng", slug: "hong-bang" }, { name: "Lê Chân", slug: "le-chan" }, { name: "Ngô Quyền", slug: "ngo-quyen" }, { name: "Kiến An", slug: "kien-an" }, { name: "Đồ Sơn", slug: "do-son" }] 
  },
  { 
    id: 5, 
    name: "Cần Thơ", 
    slug: "can-tho", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1630842855860-1cef444bd83c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Ninh Kiều", slug: "ninh-kieu" }, { name: "Cái Răng", slug: "cai-rang" }, { name: "Bình Thủy", slug: "binh-thuy" }, { name: "Ô Môn", slug: "o-mon" }, { name: "Thốt Nốt", slug: "thot-not" }] 
  },
  
  // Miền Bắc
  { 
    id: 6, 
    name: "Quảng Ninh", 
    slug: "quang-ninh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Hạ Long", slug: "ha-long" }, { name: "Cẩm Phả", slug: "cam-pha" }, { name: "Móng Cái", slug: "mong-cai" }, { name: "Uông Bí", slug: "uong-bi" }, { name: "Vân Đồn", slug: "van-don" }] 
  },
  { 
    id: 7, 
    name: "Bắc Ninh", 
    slug: "bac-ninh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1695697411330-6431dad497ed?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Bắc Ninh", slug: "tp-bac-ninh" }, { name: "Từ Sơn", slug: "tu-son" }, { name: "Thuận Thành", slug: "thuan-thanh" }, { name: "Gia Bình", slug: "gia-binh" }, { name: "Quế Võ", slug: "que-vo" }] 
  },
  { 
    id: 8, 
    name: "Hải Dương", 
    slug: "hai-duong", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1740101957007-68c92a37cf5d?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Hải Dương", slug: "tp-hai-duong" }, { name: "Chí Linh", slug: "chi-linh" }, { name: "Kinh Môn", slug: "kinh-mon" }, { name: "Nam Sách", slug: "nam-sach" }, { name: "Gia Lộc", slug: "gia-loc" }] 
  },
  { 
    id: 9, 
    name: "Hưng Yên", 
    slug: "hung-yen", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1708400586119-e28c3a10d3f7?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Hưng Yên", slug: "tp-hung-yen" }, { name: "Văn Lâm", slug: "van-lam" }, { name: "Văn Giang", slug: "van-giang" }, { name: "Yên Mỹ", slug: "yen-my" }, { name: "Mỹ Hào", slug: "my-hao" }] 
  },
  { 
    id: 10, 
    name: "Vĩnh Phúc", 
    slug: "vinh-phuc", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1754797007463-8171d41f1209?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Vĩnh Yên", slug: "vinh-yen" }, { name: "Phúc Yên", slug: "phuc-yen" }, { name: "Bình Xuyên", slug: "binh-xuyen" }, { name: "Tam Dương", slug: "tam-duong" }, { name: "Lập Thạch", slug: "lap-thach" }] 
  },
  
  { 
    id: 11, 
    name: "Thái Nguyên", 
    slug: "thai-nguyen", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1688221046081-1e318ab5d44a?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Thái Nguyên", slug: "tp-thai-nguyen" }, { name: "Sông Công", slug: "song-cong" }, { name: "Đại Từ", slug: "dai-tu" }, { name: "Phổ Yên", slug: "pho-yen" }, { name: "Võ Nhai", slug: "vo-nhai" }] 
  },
  { 
    id: 12, 
    name: "Lạng Sơn", 
    slug: "lang-son", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1758002273369-3052c5e86943?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Lạng Sơn", slug: "tp-lang-son" }, { name: "Cao Lộc", slug: "cao-loc" }, { name: "Chi Lăng", slug: "chi-lang" }, { name: "Văn Quan", slug: "van-quan" }, { name: "Bắc Sơn", slug: "bac-son" }] 
  },
  { 
    id: 13, 
    name: "Cao Bằng", 
    slug: "cao-bang", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1721112336471-b93c7fd82b79?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Cao Bằng", slug: "tp-cao-bang" }, { name: "Bảo Lâm", slug: "bao-lam" }, { name: "Hà Quảng", slug: "ha-quang" }, { name: "Trùng Khánh", slug: "trung-khanh" }, { name: "Nguyên Bình", slug: "nguyen-binh" }] 
  },
  { 
    id: 14, 
    name: "Bắc Kạn", 
    slug: "bac-kan", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1720777366540-ca547cbddfa1?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Bắc Kạn", slug: "tp-bac-kan" }, { name: "Chợ Đồn", slug: "cho-don" }, { name: "Ba Bể", slug: "ba-be" }, { name: "Chợ Mới", slug: "cho-moi" }, { name: "Ngân Sơn", slug: "ngan-son" }] 
  },
  { 
    id: 15, 
    name: "Tuyên Quang", 
    slug: "tuyen-quang", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1724935412035-a35ed28c8518?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Tuyên Quang", slug: "tp-tuyen-quang" }, { name: "Sơn Dương", slug: "son-duong" }, { name: "Yên Sơn", slug: "yen-son" }, { name: "Hàm Yên", slug: "ham-yen" }, { name: "Chiêm Hóa", slug: "chiem-hoa" }] 
  },
  
  { 
    id: 16, 
    name: "Phú Thọ", 
    slug: "phu-tho", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1714013582537-d4b9491a698c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Việt Trì", slug: "viet-tri" }, { name: "Phú Thọ", slug: "phu-tho" }, { name: "Đoan Hùng", slug: "doan-hung" }, { name: "Hạ Hòa", slug: "ha-hoa" }, { name: "Thanh Ba", slug: "thanh-ba" }] 
  },
  { 
    id: 17, 
    name: "Hà Giang", 
    slug: "ha-giang", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1688221045610-b45514752bd2?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Hà Giang", slug: "tp-ha-giang" }, { name: "Đồng Văn", slug: "dong-van" }, { name: "Mèo Vạc", slug: "meo-vac" }, { name: "Yên Minh", slug: "yen-minh" }, { name: "Quản Bạ", slug: "quan-ba" }] 
  },
  { 
    id: 18, 
    name: "Lào Cai", 
    slug: "lao-cai", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1706498511874-f940ed690f3b?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Lào Cai", slug: "tp-lao-cai" }, { name: "Sa Pa", slug: "sa-pa" }, { name: "Bảo Thắng", slug: "bao-thang" }, { name: "Bảo Yên", slug: "bao-yen" }, { name: "Bát Xát", slug: "bat-xat" }] 
  },
  { 
    id: 19, 
    name: "Yên Bái", 
    slug: "yen-bai", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1684599508219-97e26192c054?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Yên Bái", slug: "tp-yen-bai" }, { name: "Nghĩa Lộ", slug: "nghia-lo" }, { name: "Mù Cang Chải", slug: "mu-cang-chai" }, { name: "Văn Yên", slug: "van-yen" }, { name: "Yên Bình", slug: "yen-binh" }] 
  },
  { 
    id: 20, 
    name: "Điện Biên", 
    slug: "dien-bien", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1718626044699-7741e5388351?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Điện Biên Phủ", slug: "dien-bien-phu" }, { name: "Mường Lay", slug: "muong-lay" }, { name: "Tủa Chùa", slug: "tua-chua" }, { name: "Điện Biên Đông", slug: "dien-bien-dong" }, { name: "Tuần Giáo", slug: "tuan-giao" }] 
  },
  
  { 
    id: 21, 
    name: "Lai Châu", 
    slug: "lai-chau", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1722807359333-5a7885d67675?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Lai Châu", slug: "tp-lai-chau" }, { name: "Tam Đường", slug: "tam-duong" }, { name: "Mường Tè", slug: "muong-te" }, { name: "Sìn Hồ", slug: "sin-ho" }, { name: "Phong Thổ", slug: "phong-tho" }] 
  },
  { 
    id: 22, 
    name: "Sơn La", 
    slug: "son-la", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1727752040431-c4134a5a3895?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Sơn La", slug: "tp-son-la" }, { name: "Mộc Châu", slug: "moc-chau" }, { name: "Yên Châu", slug: "yen-chau" }, { name: "Mai Sơn", slug: "mai-son" }, { name: "Phù Yên", slug: "phu-yen-sonla" }] 
  },
  { 
    id: 23, 
    name: "Hòa Bình", 
    slug: "hoa-binh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1728011861481-228f2cf426cf?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Hòa Bình", slug: "tp-hoa-binh" }, { name: "Mai Châu", slug: "mai-chau" }, { name: "Đà Bắc", slug: "da-bac" }, { name: "Lương Sơn", slug: "luong-son" }, { name: "Kim Bôi", slug: "kim-boi" }] 
  },
  { 
    id: 24, 
    name: "Bắc Giang", 
    slug: "bac-giang", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1714130033616-6e597a394d8e?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Bắc Giang", slug: "tp-bac-giang" }, { name: "Yên Dũng", slug: "yen-dung" }, { name: "Lục Ngạn", slug: "luc-ngan" }, { name: "Lục Nam", slug: "luc-nam" }, { name: "Việt Yên", slug: "viet-yen" }] 
  },
  { 
    id: 25, 
    name: "Nam Định", 
    slug: "nam-dinh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1714013582531-f486b0aefd52?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Nam Định", slug: "tp-nam-dinh" }, { name: "Mỹ Lộc", slug: "my-loc" }, { name: "Vụ Bản", slug: "vu-ban" }, { name: "Ý Yên", slug: "y-yen" }, { name: "Nghĩa Hưng", slug: "nghia-hung" }] 
  },
  
  { 
    id: 26, 
    name: "Thái Bình", 
    slug: "thai-binh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1625319231748-bf2ebb2c242c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Thái Bình", slug: "tp-thai-binh" }, { name: "Quỳnh Phụ", slug: "quynh-phu" }, { name: "Hưng Hà", slug: "hung-ha" }, { name: "Đông Hưng", slug: "dong-hung" }, { name: "Thái Thụy", slug: "thai-thuy" }] 
  },
  { 
    id: 27, 
    name: "Ninh Bình", 
    slug: "ninh-binh", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1746454234373-ef611bfc4bf3?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Ninh Bình", slug: "tp-ninh-binh" }, { name: "Tam Điệp", slug: "tam-diep" }, { name: "Hoa Lư", slug: "hoa-lu" }, { name: "Gia Viễn", slug: "gia-vien" }, { name: "Nho Quan", slug: "nho-quan" }] 
  },
  { 
    id: 28, 
    name: "Hà Nam", 
    slug: "ha-nam", 
    region: "North", 
    image: "https://images.unsplash.com/photo-1694614491694-c834ccb6bb17?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Phủ Lý", slug: "phu-ly" }, { name: "Duy Tiên", slug: "duy-tien" }, { name: "Kim Bảng", slug: "kim-bang" }, { name: "Lý Nhân", slug: "ly-nhan" }, { name: "Thanh Liêm", slug: "thanh-liem" }] 
  },
  { 
    id: 29, 
    name: "Thanh Hóa", 
    slug: "thanh-hoa", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1544084944-15269ec7b5a0?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Thanh Hóa", slug: "tp-thanh-hoa" }, { name: "Sầm Sơn", slug: "sam-son" }, { name: "Bỉm Sơn", slug: "bim-son" }, { name: "Hoằng Hóa", slug: "hoang-hoa" }, { name: "Quảng Xương", slug: "quang-xuong" }] 
  },
  { 
    id: 30, 
    name: "Nghệ An", 
    slug: "nghe-an", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1733778567742-efcfd45235b3?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Vinh", slug: "vinh" }, { name: "Cửa Lò", slug: "cua-lo" }, { name: "Hoàng Mai", slug: "hoang-mai-nghean" }, { name: "Diễn Châu", slug: "dien-chau" }, { name: "Đô Lương", slug: "do-luong" }] 
  },
  { 
    id: 31, 
    name: "Hà Tĩnh", 
    slug: "ha-tinh", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1662199669552-8fd8a40c8b67?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Hà Tĩnh", slug: "tp-ha-tinh" }, { name: "Hồng Lĩnh", slug: "hong-linh" }, { name: "Hương Khê", slug: "huong-khe" }, { name: "Kỳ Anh", slug: "ky-anh" }, { name: "Cẩm Xuyên", slug: "cam-xuyen" }] 
  },
  { 
    id: 32, 
    name: "Quảng Bình", 
    slug: "quang-binh", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1648426129837-58c912cba4dc?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Đồng Hới", slug: "dong-hoi" }, { name: "Ba Đồn", slug: "ba-don" }, { name: "Bố Trạch", slug: "bo-trach" }, { name: "Quảng Ninh (QB)", slug: "quang-ninh-qb" }, { name: "Lệ Thủy", slug: "le-thuy" }] 
  },
  { 
    id: 33, 
    name: "Quảng Trị", 
    slug: "quang-tri", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1547024842-a0e3d2127406?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Đông Hà", slug: "dong-ha" }, { name: "Quảng Trị", slug: "quang-tri-city" }, { name: "Hướng Hóa", slug: "huong-hoa" }, { name: "Vĩnh Linh", slug: "vinh-linh" }, { name: "Gio Linh", slug: "gio-linh" }] 
  },
  
  { 
    id: 34, 
    name: "Thừa Thiên Huế", 
    slug: "thua-thien-hue", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1694057545368-9c80e6f21e4c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Huế", slug: "tp-hue" }, { name: "Phú Lộc", slug: "phu-loc" }, { name: "Phú Vang", slug: "phu-vang" }, { name: "Phong Điền", slug: "phong-dien" }, { name: "Quảng Điền", slug: "quang-dien" }] 
  },
  { 
    id: 35, 
    name: "Quảng Nam", 
    slug: "quang-nam", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1713685714770-384c5654f6be?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Tam Kỳ", slug: "tam-ky" }, { name: "Hội An", slug: "hoi-an" }, { name: "Điện Bàn", slug: "dien-ban" }, { name: "Duy Xuyên", slug: "duy-xuyen" }, { name: "Núi Thành", slug: "nui-thanh" }] 
  },
  { 
    id: 36, 
    name: "Quảng Ngãi", 
    slug: "quang-ngai", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1696690955499-f756cb97a410?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Quảng Ngãi", slug: "tp-quang-ngai" }, { name: "Đức Phổ", slug: "duc-pho" }, { name: "Bình Sơn", slug: "binh-son" }, { name: "Sơn Tịnh", slug: "son-tinh" }, { name: "Tư Nghĩa", slug: "tu-nghia" }] 
  },
  { 
    id: 37, 
    name: "Bình Định", 
    slug: "binh-dinh", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1634356067859-251dd7a49d56?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Quy Nhơn", slug: "quy-nhon" }, { name: "An Nhơn", slug: "an-nhon" }, { name: "Tuy Phước", slug: "tuy-phuoc" }, { name: "Hoài Nhơn", slug: "hoai-nhon" }, { name: "Phù Cát", slug: "phu-cat" }] 
  },
  { 
    id: 38, 
    name: "Phú Yên", 
    slug: "phu-yen", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1739596677403-3a4515dad31c?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Tuy Hòa", slug: "tp-tuy-hoa" }, { name: "Sông Cầu", slug: "song-cau" }, { name: "Đồng Xuân", slug: "dong-xuan" }, { name: "Tuy An", slug: "tuy-an" }, { name: "Sơn Hòa", slug: "son-hoa" }] 
  },
  { 
    id: 39, 
    name: "Đắk Lắk", 
    slug: "dak-lak", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1739596674720-eae1a1fc5ef4?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Buôn Ma Thuột", slug: "buon-ma-thuot" }, { name: "Buôn Hồ", slug: "buon-ho" }, { name: "Ea H'leo", slug: "ea-hleo" }, { name: "Krông Pắc", slug: "krong-pac" }, { name: "Krông Bông", slug: "krong-bong" }] 
  },
  { 
    id: 40, 
    name: "Đắk Nông", 
    slug: "dak-nong", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1739596676444-621ae4c007e1?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Gia Nghĩa", slug: "gia-nghia" }, { name: "Đắk Mil", slug: "dak-mil" }, { name: "Cư Jút", slug: "cu-jut" }, { name: "Đắk Song", slug: "dak-song" }, { name: "Krông Nô", slug: "krong-no" }] 
  },
  { 
    id: 41, 
    name: "Gia Lai", 
    slug: "gia-lai", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1695745430624-2124ec1d4441?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Pleiku", slug: "pleiku" }, { name: "An Khê", slug: "an-khe" }, { name: "Ayun Pa", slug: "ayun-pa" }, { name: "Chư Sê", slug: "chu-se" }, { name: "Đức Cơ", slug: "duc-co" }] 
  },
  { 
    id: 42, 
    name: "Kon Tum", 
    slug: "kon-tum", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1708400586155-d099561c8299?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Kon Tum", slug: "tp-kon-tum" }, { name: "Đắk Glei", slug: "dak-glei" }, { name: "Ngọc Hồi", slug: "ngoc-hoi" }, { name: "Đắk Tô", slug: "dak-to" }, { name: "Kon Plông", slug: "kon-plong" }] 
  },
  { 
    id: 43, 
    name: "Lâm Đồng", 
    slug: "lam-dong", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1608753529548-3898cb559f48?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Đà Lạt", slug: "da-lat" }, { name: "Bảo Lộc", slug: "bao-loc" }, { name: "Đức Trọng", slug: "duc-trong" }, { name: "Di Linh", slug: "di-linh" }, { name: "Lâm Hà", slug: "lam-ha" }] 
  },
  
  // Miền Nam
  { 
    id: 44, 
    name: "Bình Phước", 
    slug: "binh-phuoc", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Đồng Xoài", slug: "dong-xoai" }, { name: "Bình Long", slug: "binh-long" }, { name: "Chơn Thành", slug: "chon-thanh" }, { name: "Bù Đăng", slug: "bu-dang" }, { name: "Phước Long", slug: "phuoc-long" }] 
  },
  { 
    id: 45, 
    name: "Tây Ninh", 
    slug: "tay-ninh", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1737192577682-b34a1fe5b4cb?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Tây Ninh", slug: "tp-tay-ninh" }, { name: "Hòa Thành", slug: "hoa-thanh" }, { name: "Trảng Bàng", slug: "trang-bang" }, { name: "Tân Biên", slug: "tan-bien" }, { name: "Châu Thành", slug: "chau-thanh-tn" }] 
  },
  { 
    id: 46, 
    name: "Bình Dương", 
    slug: "binh-duong", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1602600133122-b6f21c212484?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Thủ Dầu Một", slug: "thu-dau-mot" }, { name: "Dĩ An", slug: "di-an" }, { name: "Thuận An", slug: "thuan-an" }, { name: "Tân Uyên", slug: "tan-uyen" }, { name: "Bến Cát", slug: "ben-cat" }] 
  },
  { 
    id: 47, 
    name: "Đồng Nai", 
    slug: "dong-nai", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1628244046105-7238e892fb2f?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Biên Hòa", slug: "bien-hoa" }, { name: "Long Khánh", slug: "long-khanh" }, { name: "Nhơn Trạch", slug: "nhon-trach" }, { name: "Trảng Bom", slug: "trang-bom" }, { name: "Long Thành", slug: "long-thanh" }] 
  },
  { 
    id: 48, 
    name: "Bà Rịa - Vũng Tàu", 
    slug: "ba-ria-vung-tau", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Vũng Tàu", slug: "vung-tau" }, { name: "Bà Rịa", slug: "ba-ria" }, { name: "Phú Mỹ", slug: "phu-my" }, { name: "Châu Đức", slug: "chau-duc" }, { name: "Long Điền", slug: "long-dien" }] 
  },
  
  { 
    id: 49, 
    name: "Long An", 
    slug: "long-an", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1695697345735-441e83b10106?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Tân An", slug: "tan-an" }, { name: "Kiến Tường", slug: "kien-tuong" }, { name: "Châu Thành", slug: "chau-thanh-la" }, { name: "Bến Lức", slug: "ben-luc" }, { name: "Thủ Thừa", slug: "thu-thua" }] 
  },
  { 
    id: 50, 
    name: "Tiền Giang", 
    slug: "tien-giang", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1639227080614-9a58691fcc12?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Mỹ Tho", slug: "my-tho" }, { name: "Gò Công", slug: "go-cong" }, { name: "Cai Lậy", slug: "cai-lay" }, { name: "Châu Thành", slug: "chau-thanh-tg" }, { name: "Tân Phước", slug: "tan-phuoc" }] 
  },
  { 
    id: 51, 
    name: "Bến Tre", 
    slug: "ben-tre", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1582211612436-2d5cf3aadbc1?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Bến Tre", slug: "tp-ben-tre" }, { name: "Châu Thành", slug: "chau-thanh-bt" }, { name: "Chợ Lách", slug: "cho-lach" }, { name: "Mỏ Cày", slug: "mo-cay" }, { name: "Giồng Trôm", slug: "giong-trom" }] 
  },
  { 
    id: 52, 
    name: "Trà Vinh", 
    slug: "tra-vinh", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1673934149508-318260ef31f2?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Trà Vinh", slug: "tp-tra-vinh" }, { name: "Càng Long", slug: "cang-long" }, { name: "Tiểu Cần", slug: "tieu-can" }, { name: "Châu Thành", slug: "chau-thanh-tv" }, { name: "Cầu Kè", slug: "cau-ke" }] 
  },
  { 
    id: 53, 
    name: "Vĩnh Long", 
    slug: "vinh-long", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1631864301342-31456d890601?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Vĩnh Long", slug: "tp-vinh-long" }, { name: "Bình Minh", slug: "binh-minh" }, { name: "Long Hồ", slug: "long-ho" }, { name: "Mang Thít", slug: "mang-thit" }, { name: "Tam Bình", slug: "tam-binh" }] 
  },
  
  { 
    id: 54, 
    name: "Đồng Tháp", 
    slug: "dong-thap", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1556225496-ff493e20d9a0?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Cao Lãnh", slug: "cao-lanh" }, { name: "Sa Đéc", slug: "sa-dec" }, { name: "Hồng Ngự", slug: "hong-ngu" }, { name: "Tân Hồng", slug: "tan-hong" }, { name: "Lấp Vò", slug: "lap-vo" }] 
  },
  { 
    id: 55, 
    name: "An Giang", 
    slug: "an-giang", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1696690969074-366c2c467a9e?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Long Xuyên", slug: "long-xuyen" }, { name: "Châu Đốc", slug: "chau-doc" }, { name: "Tân Châu", slug: "tan-chau" }, { name: "An Phú", slug: "an-phu" }, { name: "Tịnh Biên", slug: "tinh-bien" }] 
  },
  { 
    id: 56, 
    name: "Kiên Giang", 
    slug: "kien-giang", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1740102411344-4e878602acc4?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Rạch Giá", slug: "rach-gia" }, { name: "Hà Tiên", slug: "ha-tien" }, { name: "Phú Quốc", slug: "phu-quoc" }, { name: "Kiên Lương", slug: "kien-luong" }, { name: "Hòn Đất", slug: "hon-dat" }] 
  },
  { 
    id: 57, 
    name: "Hậu Giang", 
    slug: "hau-giang", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1668202385442-5923c3026cd6?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Vị Thanh", slug: "vi-thanh" }, { name: "Ngã Bảy", slug: "nga-bay" }, { name: "Long Mỹ", slug: "long-my" }, { name: "Phụng Hiệp", slug: "phung-hiep" }, { name: "Châu Thành A", slug: "chau-thanh-a" }] 
  },
  { 
    id: 58, 
    name: "Sóc Trăng", 
    slug: "soc-trang", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1624075250557-9e020cecaaf6?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Sóc Trăng", slug: "tp-soc-trang" }, { name: "Vĩnh Châu", slug: "vinh-chau" }, { name: "Kế Sách", slug: "ke-sach" }, { name: "Mỹ Tú", slug: "my-tu" }, { name: "Mỹ Xuyên", slug: "my-xuyen" }] 
  },
  
  { 
    id: 59, 
    name: "Bạc Liêu", 
    slug: "bac-lieu", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1754797007413-2d95b63b6652?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Bạc Liêu", slug: "tp-bac-lieu" }, { name: "Giá Rai", slug: "gia-rai" }, { name: "Phước Long", slug: "phuoc-long-bl" }, { name: "Vĩnh Lợi", slug: "vinh-loi" }, { name: "Hồng Dân", slug: "hong-dan" }] 
  },
  { 
    id: 60, 
    name: "Cà Mau", 
    slug: "ca-mau", 
    region: "South", 
    image: "https://images.unsplash.com/photo-1630842853602-88c14e7ded57?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "TP Cà Mau", slug: "tp-ca-mau" }, { name: "Năm Căn", slug: "nam-can" }, { name: "Ngọc Hiển", slug: "ngoc-hien" }, { name: "Đầm Dơi", slug: "dam-doi" }, { name: "Thới Bình", slug: "thoi-binh" }] 
  },
   { 
    id: 61, 
    name: "Bình Thuận", 
    slug: "binh-thuan", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1748102288847-b2607862c249?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Phan Thiết", slug: "phan-thiet" }, { name: "La Gi", slug: "la-gi" }, { name: "Mũi Né", slug: "mui-ne" }, { name: "Bắc Bình", slug: "bac-binh" }, { name: "Hàm Thuận Bắc", slug: "ham-thuan-bac" }] 
  },
  { 
    id: 62, 
    name: "Ninh Thuận", 
    slug: "ninh-thuan", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1625319246631-ea4198db2072?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Phan Rang", slug: "phan-rang" }, { name: "Ninh Hải", slug: "ninh-hai" }, { name: "Ninh Phước", slug: "ninh-phuoc" }, { name: "Bác Ái", slug: "bac-ai" }, { name: "Thuận Nam", slug: "thuan-nam" }] 
  },
  { 
    id: 63, 
    name: "Khánh Hòa", 
    slug: "khanh-hoa", 
    region: "Central", 
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80", 
    locations: [{ name: "Nha Trang", slug: "nha-trang" }, { name: "Cam Ranh", slug: "cam-ranh" }, { name: "Ninh Hòa", slug: "ninh-hoa" }, { name: "Vạn Ninh", slug: "van-ninh" }, { name: "Diên Khánh", slug: "dien-khanh" }] 
  }
];
