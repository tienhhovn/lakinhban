/* =========================================================================
   TÁM SAO BÁT TRẠCH (Bát Trạch Tinh)
   Sinh Khí – Thiên Y – Diên Niên (Phước Đức) – Phục Vị   => CÁT
   Họa Hại – Lục Sát – Ngũ Quỷ – Tuyệt Mệnh              => HUNG
   Kèm giải thích chi tiết & cách hóa giải chi tiết theo Ngũ Hành
   ========================================================================= */

import type { ElementKey } from "./elements";

export type StarKey =
  | "sinh_khi"
  | "thien_y"
  | "dien_nien"
  | "phuc_vi"
  | "tuyet_menh"
  | "ngu_quy"
  | "luc_sat"
  | "hoa_hai";

export type AppLevel = "tot" | "kha" | "duoc" | "tranh" | "toitruong";

export interface StarApplication {
  label: string;
  level: AppLevel;
  text: string;
}

export interface StarInfo {
  key: StarKey;
  name: string;
  alias: string;
  starName: string;
  element: ElementKey;
  quality: "cat" | "hung";
  grade: string;
  score: number;
  /** màu cung trên la bàn: đỏ/vàng = Cát, xanh thẫm = Hung (chuẩn la bàn cổ) */
  ringColor: string;
  ringColor2: string;
  textColor: string;
  /** màu nhấn cho giao diện kết quả */
  accent: string;
  summary: string;
  governs: string[];
  risks: string[];
  best: string[];
  remedies: { title: string; detail: string }[];
  applications: StarApplication[];
}

export const STARS: Record<StarKey, StarInfo> = {
  sinh_khi: {
    key: "sinh_khi",
    name: "Sinh Khí",
    alias: "Sao Tham Lang",
    starName: "Tham Lang Tinh",
    element: "Moc",
    quality: "cat",
    grade: "Đại Cát",
    score: 10,
    ringColor: "#d92b2b",
    ringColor2: "#8f1414",
    textColor: "#ffe8e8",
    accent: "#ef4444",
    summary:
      "Cát tinh mạnh nhất trong Bát Trạch: nguồn sinh khí vượng nhất, chủ tài lộc, công danh và sinh lực. Hướng này đón được khí sinh vượng bổ trợ trực tiếp cho chính mệnh của gia chủ.",
    governs: [
      "TÀI LỘC: tiền bạc sinh sôi, kinh doanh phát đạt, làm ăn thuận lợi, tài lộc như nước chảy vào nhà.",
      "CÔNG DANH: thăng tiến nhanh, được cấp trên tin tưởng giao việc lớn, danh tiếng lan xa.",
      "SINH LỰC: cơ thể tràn đầy năng lượng, hợp người trẻ, người mới khởi nghiệp, người cần hồi phục.",
      "GIA ĐẠO: con cháu đông đúc, dễ có tin vui (cưới hỏi, sinh con), gia đình hưng vượng.",
    ],
    risks: [],
    best: [
      "CỬA CHÍNH / CỔNG: mở về hướng Sinh Khí để đón toàn bộ sinh khí vào nhà. Đây là lựa chọn số 1 khi mua hoặc xây nhà.",
      "BÀN LÀM VIỆC: ngồi làm việc với mặt quay về hướng Sinh Khí khi ký kết, đàm phán, phỏng vấn.",
      "ĐẦU GIƯỜNG: hướng đầu giường về Sinh Khí giúp ngủ sâu, tỉnh táo, hồi phục sức khỏe nhanh.",
      "BẾP: bếp tọa (dựa lưng) về hướng hung và ngửa miệng lò về Sinh Khí, theo phép tọa hung hướng cát.",
      "VẬT PHẨM: cây xanh sống (Mộc), bình hồ lô, tượng Thần Tài Thổ Địa đặt tại cung Sinh Khí của ngôi nhà.",
    ],
    remedies: [],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "tot", text: "Tuyệt hảo. Nếu chỉ chọn được một hướng tốt thì hãy chọn đúng hướng này." },
      { label: "Hướng cổng / lối đi chính", level: "tot", text: "Rất tốt: sinh khí vào nhà liên tục mỗi ngày." },
      { label: "Hướng bếp (ngửa lò)", level: "tot", text: "Rất tốt: lửa quay về Sinh Khí thì tài lộc vượng, gia chủ khỏe mạnh." },
      { label: "Hướng đầu giường", level: "tot", text: "Rất tốt cho người trụ cột, người cần sức khỏe và sự nghiệp." },
      { label: "Hướng bàn làm việc", level: "tot", text: "Rất tốt cho nghề kinh doanh, tài chính, bán hàng, quản lý." },
      { label: "Hướng bàn thờ", level: "tot", text: "Được: gia tiên phù hộ cho tài lộc và sự nghiệp của con cháu." },
    ],
  },
  thien_y: {
    key: "thien_y",
    name: "Thiên Y",
    alias: "Sao Cự Môn",
    starName: "Cự Môn Tinh",
    element: "Tho",
    quality: "cat",
    grade: "Đại Cát",
    score: 9,
    ringColor: "#e8630c",
    ringColor2: "#9a3b03",
    textColor: "#ffeade",
    accent: "#f97316",
    summary:
      "Cát tinh chủ sức khỏe và quý nhân. Thiên Y nghĩa là thầy thuốc trời: hóa giải bệnh tật, gặp dữ hóa lành, đặc biệt phù trợ cho người lớn tuổi và người đang điều trị bệnh.",
    governs: [
      "SỨC KHỎE: bệnh tật thuyên giảm, thân thể khỏe mạnh, trường thọ. Sao thuộc Thổ nên chủ về tì vị, xương khớp.",
      "QUÝ NHÂN: luôn có người giúp đỡ khi gặp khó, được thầy thuốc và người có tâm chỉ dẫn.",
      "HÓA GIẢI: chuyển hung thành cát, giảm bớt ảnh hưởng của các hướng xấu còn lại trong nhà.",
      "TÌNH CẢM: gia đình ấm áp, chan hòa, dễ cảm thông và chia sẻ.",
    ],
    risks: [],
    best: [
      "PHÒNG NGỦ NGƯỜI GIÀ / NGƯỜI BỆNH: kê đầu giường về Thiên Y là lựa chọn tốt nhất.",
      "CỬA PHỤ / CỬA BÊN HÔNG: nếu cửa chính không thể về Thiên Y thì làm cửa phụ và dùng làm lối đi thường xuyên.",
      "PHÒNG ĂN: bàn ăn quay về Thiên Y giúp cả gia đình ăn ngon, sức khỏe dồi dào.",
      "VẬT PHẨM: bình hồ lô, tượng Phật Bà Quan Âm, quả cầu thạch anh vàng, đồ gốm nung màu vàng nâu.",
      "MÀU SẮC: vàng đất, nâu, cam đất (Thổ) kết hợp đỏ, hồng (Hỏa sinh Thổ).",
    ],
    remedies: [],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "tot", text: "Rất tốt, đặc biệt với gia đình có người già, trẻ nhỏ hay người hay ốm." },
      { label: "Hướng cổng / lối đi chính", level: "tot", text: "Tốt: cả nhà ít bệnh tật, ít tai ương." },
      { label: "Hướng bếp (ngửa lò)", level: "tot", text: "Rất tốt: bếp nấu hướng Thiên Y thì cơm nước bổ dưỡng, sức khỏe ổn định." },
      { label: "Hướng đầu giường", level: "tot", text: "Tốt nhất cho người lớn tuổi, người bệnh, phụ nữ mang thai." },
      { label: "Hướng bàn làm việc", level: "kha", text: "Khá tốt, phù hợp ngành y tế, giáo dục, tư vấn, chăm sóc khách hàng." },
      { label: "Hướng bàn thờ", level: "tot", text: "Rất tốt: gia đạo bình an, tổ tiên phù hộ sức khỏe." },
    ],
  },
  dien_nien: {
    key: "dien_nien",
    name: "Diên Niên",
    alias: "Phước Đức",
    starName: "Vũ Khúc Tinh",
    element: "Kim",
    quality: "cat",
    grade: "Cát",
    score: 8,
    ringColor: "#d4af37",
    ringColor2: "#8a6c14",
    textColor: "#fff8dd",
    accent: "#eab308",
    summary:
      "Cát tinh chủ nhân duyên và sự nghiệp bền lâu, còn gọi là Phước Đức hay Duyên Niên. Tăng tình cảm vợ chồng, mở rộng quan hệ, giúp hợp tác thành công và tài chính ổn định.",
    governs: [
      "NHÂN DUYÊN: vợ chồng hòa thuận, yêu thương bền chặt, hóa giải mâu thuẫn gia đình.",
      "QUAN HỆ XÃ HỘI: bạn bè, đối tác, cấp trên cấp dưới đều thuận, hợp tác thành công, ký kết dài hạn.",
      "SỰ NGHIỆP BỀN LÂU: thăng tiến vững vàng, không đột phá nhưng giữ được thành quả đã làm.",
      "TÀI CHÍNH ỔN ĐỊNH: thu nhập đều, tích lũy được, ít rủi ro khi đầu cơ.",
    ],
    risks: [],
    best: [
      "GIƯỜNG VỢ CHỒNG: đầu giường hướng Diên Niên giúp tình cảm mặn nồng, hạn chế cãi vã.",
      "PHÒNG KHÁCH: sofa quay về Diên Niên, khách đến chơi tạo quan hệ tốt cho gia chủ.",
      "BÀN LÀM VIỆC QUẢN LÝ: hợp với người quản lý, người cần xây dựng uy tín và đội nhóm.",
      "VẬT PHẨM: tranh đôi chim, tượng song hỷ, đôi thiên nga, vật phẩm màu trắng và vàng kim (Kim).",
      "KHÔNG GIAN HỢP TÁC: bàn họp, quầy giao dịch nên hướng về cung Diên Niên của người chủ trì.",
    ],
    remedies: [],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "tot", text: "Rất tốt cho gia đình trẻ, vợ chồng mới cưới, người làm nghề quản lý." },
      { label: "Hướng cổng / lối đi chính", level: "tot", text: "Tốt: quan hệ xã hội của gia chủ được mở rộng." },
      { label: "Hướng bếp (ngửa lò)", level: "kha", text: "Khá tốt: gia đình êm ấm, cơm nước đều đặn." },
      { label: "Hướng đầu giường", level: "tot", text: "Rất tốt cho vợ chồng: tăng duyên số, giảm xung đột." },
      { label: "Hướng bàn làm việc", level: "tot", text: "Rất tốt cho nghề nhân sự, đối ngoại, kinh doanh hợp tác." },
      { label: "Hướng bàn thờ", level: "kha", text: "Được: gia đạo hòa thuận, con cháu thương yêu nhau." },
    ],
  },
  phuc_vi: {
    key: "phuc_vi",
    name: "Phục Vị",
    alias: "Sao Phụ Bật",
    starName: "Phụ Bật Tinh",
    element: "Thuy",
    quality: "cat",
    grade: "Tiểu Cát",
    score: 7,
    ringColor: "#f2d489",
    ringColor2: "#a8801f",
    textColor: "#fffdf0",
    accent: "#facc15",
    summary:
      "Cát tinh êm dịu nhất, chủ bình an, an cư, học hành thi cử và nghỉ ngơi phục hồi. Không tạo sự bùng nổ tài lộc nhưng giữ vững nền tảng, giúp tâm an thân khỏe.",
    governs: [
      "BÌNH AN: cuộc sống ổn định, ít sóng gió, an cư lạc nghiệp.",
      "HỌC HÀNH VÀ THI CỬ: tăng tập trung và trí nhớ, rất hợp cho phòng sách và bàn học của con em.",
      "NGỦ NGHỈ VÀ THIỀN ĐỊNH: giấc ngủ sâu, giảm căng thẳng, hợp người hay suy nghĩ nhiều.",
      "GIỮ GÌN THÀNH QUẢ: bảo toàn của cải, ít hao hụt, hợp cho két sắt, tủ hồ sơ, kho chứa.",
    ],
    risks: [],
    best: [
      "PHÒNG NGỦ VÀ PHÒNG THIỀN: đầu giường hoặc hướng ngồi thiền về Phục Vị.",
      "BÀN HỌC, PHÒNG SÁCH: đặt bàn học của con em quay về Phục Vị để tập trung, thi cử thuận lợi.",
      "KÉT SẮT, TỦ TIỀN: đặt tại cung Phục Vị của ngôi nhà để giữ của.",
      "VẬT PHẨM: thư pháp chữ An, đá thạch anh, đồ thủy tinh, màu đen và xanh navy (Thủy).",
      "LƯU Ý: không nên dùng Phục Vị cho cửa hàng hay quầy bán hàng vì năng lượng quá tĩnh, khách ít.",
    ],
    remedies: [],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "kha", text: "Khá tốt: ổn định, bình an nhưng không phát tài đột phá." },
      { label: "Hướng cổng / lối đi chính", level: "kha", text: "Khá tốt, phù hợp người muốn cuộc sống yên tĩnh." },
      { label: "Hướng bếp (ngửa lò)", level: "kha", text: "Khá tốt: đủ ăn đủ dùng, sức khỏe ổn." },
      { label: "Hướng đầu giường", level: "tot", text: "Rất tốt cho người mất ngủ, người già, trẻ nhỏ." },
      { label: "Hướng bàn làm việc", level: "tot", text: "Rất tốt cho nghề nghiên cứu, kế toán, thiết kế, viết lách, học sinh sinh viên." },
      { label: "Hướng bàn thờ", level: "tot", text: "Rất tốt: thanh tịnh, tâm linh ổn định." },
    ],
  },
  hoa_hai: {
    key: "hoa_hai",
    name: "Họa Hại",
    alias: "Sao Lộc Tồn",
    starName: "Lộc Tồn Tinh",
    element: "Tho",
    quality: "hung",
    grade: "Hung",
    score: 4,
    ringColor: "#20304f",
    ringColor2: "#0e1830",
    textColor: "#dfe8ff",
    accent: "#7e22ce",
    summary:
      "Hung tinh nhẹ nhất trong bốn sao xấu, chủ thị phi nội bộ, mất đoàn kết, hao tài nhỏ giọt và bệnh tật dai dẳng. Mức độ hung hại thấp hơn Tuyệt Mệnh và Ngũ Quỷ nhưng kéo dài và khó nhận ra.",
    governs: [],
    risks: [
      "THỊ PHI NỘI BỘ: mất đoàn kết, con cái ngỗ ngược, vợ chồng bất hòa, nhân viên bất mãn.",
      "HAO TÀI NHỎ GIỌT: chi phí phát sinh liên tục, sửa chữa, bệnh vặt, tiền cứ rỉ ra không ngừng.",
      "BỆNH VẶT: ốm đau dai dẳng, dị ứng, viêm nhiễm; theo dân gian phụ nữ dễ mắc bệnh phụ khoa.",
      "TRÌ TRỆ: công việc chậm tiến, ý tưởng bị hiểu lầm, dễ có cảm giác thất vọng.",
      "BỊ HIỂU LẦM: bị gán oan, công sức bỏ ra không được ghi nhận.",
    ],
    best: [
      "DÙNG LÀM TỌA CHO BẾP: bếp tọa Họa Hại và ngửa lò về hướng cát.",
      "DÙNG LÀM KHO, PHÒNG GIỮ ĐỒ, NHÀ VỆ SINH: hung khí bị đè xuống bởi các khu vực phụ.",
      "DỌN DẸP THƯỜNG XUYÊN: giữ sạch, thoáng và sáng để hung khí không tụ lại.",
    ],
    remedies: [
      {
        title: "1. Hóa giải bằng Ngũ Hành: Mộc khắc Thổ",
        detail:
          "Họa Hại thuộc Thổ nên dùng Mộc khắc chế: đặt cây xanh sống (kim tiền, phát lộc, lộc trừ), đồ nội thất gỗ, sàn gỗ tại khu vực; dùng màu xanh lục, xanh nõn chuối. Tránh đồ gốm, tượng đá, đá lớn vì chúng làm hung khí mạnh hơn.",
      },
      {
        title: "2. Bếp tọa hung hướng cát",
        detail:
          "Kê bếp dựa lưng về hướng Họa Hại, miệng lò hướng về Sinh Khí hoặc Thiên Y. Đây là cách dùng hung kinh điển, vừa hóa sát vừa tăng tài lộc cho gia chủ.",
      },
      {
        title: "3. Cải thiện giao tiếp trong nhà",
        detail:
          "Họa Hại chủ khẩu thiệt trong gia đình: đặt bàn ăn, phòng khách ở nơi sáng sủa, không để khu vực này thành chỗ chất đồ; treo thư pháp chữ Hòa hoặc chữ Tín để nhắc nhở các thành viên giữ lời nói.",
      },
      {
        title: "4. Sáng, sạch, thoáng",
        detail:
          "Tăng ánh sáng tự nhiên, mở cửa sổ, dọn rác và đồ cũ. Hung khí tụ ở nơi tối, ẩm và bẩn, nên giữ vệ sinh là cách hóa giải rẻ nhất nhưng hiệu quả nhất.",
      },
      {
        title: "5. Vật phẩm hỗ trợ",
        detail:
          "Đặt cây xanh thật, tranh rừng núi thuộc Mộc, ống tre phong thủy, đồ gỗ tự nhiên; có thể đặt bộ ba cây kim quýt hoặc trầu bà thủy sinh tại khu vực này.",
      },
      {
        title: "6. Điều chỉnh vị trí giường và bàn",
        detail:
          "Nếu giường hoặc bàn làm việc nằm ở khu vực này: xoay lại theo hướng cát, thêm vách ngăn gỗ hoặc kệ sách gỗ phía sau lưng để tạo thế tựa sơn vững chắc.",
      },
    ],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "tranh", text: "Nên tránh: hung hại nhẹ nhưng kéo dài, thị phi nội bộ." },
      { label: "Hướng cổng / lối đi chính", level: "tranh", text: "Nên tránh; nếu bắt buộc thì trồng cây xanh hai bên cửa để khắc Thổ." },
      { label: "Hướng bếp (ngửa lò)", level: "tranh", text: "Nên tránh cho miệng lò; ngược lại nên cho lưng bếp tọa về hướng này." },
      { label: "Hướng đầu giường", level: "tranh", text: "Nên tránh: bệnh vặt, mất đoàn kết, dễ cãi vã." },
      { label: "Hướng bàn làm việc", level: "tranh", text: "Nên tránh: công sức không được ghi nhận, hay bị hiểu lầm." },
      { label: "Hướng bàn thờ", level: "tranh", text: "Nên tránh; ưu tiên bốn hướng cát cho gian thờ." },
    ],
  },
  luc_sat: {
    key: "luc_sat",
    name: "Lục Sát",
    alias: "Sao Văn Khúc",
    starName: "Văn Khúc Tinh",
    element: "Thuy",
    quality: "hung",
    grade: "Hung",
    score: 3,
    ringColor: "#182b4d",
    ringColor2: "#0a1428",
    textColor: "#d2e6ff",
    accent: "#1d4ed8",
    summary:
      "Hung tinh chủ tai nạn, quan sự và rối ren tình cảm. Lục Sát thuộc Thủy, sát khí trôi theo dòng nên dễ gây tai nạn khi di chuyển, kiện tụng, ly hôn ngoại tình và bệnh liên quan đến thận, hệ bài tiết.",
    governs: [],
    risks: [
      "TAI NẠN: giao thông, té ngã, va chạm kim loại, thủy nạn. Cẩn trọng khi lái xe và đi xa.",
      "QUAN SỰ VÀ KIỆN TỤNG: vướng giấy tờ pháp lý, tranh chấp đất đai, rắc rối hợp đồng.",
      "TÌNH CẢM RỐI REN: ly hôn, ngoại tình, tan vỡ hôn nhân, bị lợi dụng tình cảm.",
      "PHIỀN MUỘN: suy nghĩ tiêu cực, trầm cảm nhẹ, dễ sa vào rượu chè cờ bạc.",
      "SỨC KHỎE: thận, bàng quang, hệ tiết niệu, huyết áp, bệnh do phong hàn.",
    ],
    best: [
      "DÙNG LÀM TỌA CHO BẾP: bếp tọa Lục Sát và ngửa lò về hướng cát.",
      "DÙNG LÀM KHO, PHÒNG KỸ THUẬT, PHÒNG GIỮ ĐỒ: không ngủ và không làm việc lâu ở đây.",
      "TRÁNH BỂ CÁ VÀ ĐÀI PHUN NƯỚC: Thủy gặp Thủy thì sát khí tăng mạnh.",
    ],
    remedies: [
      {
        title: "1. Hóa giải bằng Ngũ Hành: Thổ khắc Thủy",
        detail:
          "Lục Sát thuộc Thủy nên dùng Thổ khắc chế: đặt đá, gốm sứ, thạch anh vàng, tượng đá tại khu vực; sơn màu vàng đất, nâu, be. Tuyệt đối không đặt bể cá, đài phun nước hay hồ thủy tinh ở hướng này vì Thủy trợ Thủy làm sát khí mạnh hơn.",
      },
      {
        title: "2. Bếp tọa hung hướng cát",
        detail:
          "Kê bếp dựa lưng về hướng Lục Sát, miệng lò quay về Sinh Khí, Thiên Y hoặc Diên Niên để hóa giải sát khí bằng lửa và đất (bếp thuộc Hỏa Thổ).",
      },
      {
        title: "3. Cẩn trọng di chuyển và pháp lý",
        detail:
          "Trong giai đoạn phải dùng hướng này: đi xe cẩn thận, tuân thủ luật, kiểm tra kỹ hợp đồng và giấy tờ, tránh đứng tên bảo lãnh hay cho vay lớn. Phòng ngừa thực tế luôn quan trọng hơn vật phẩm.",
      },
      {
        title: "4. Giữ gìn hôn nhân và tình cảm",
        detail:
          "Phòng ngủ hoặc sofa hướng Lục Sát dễ gây rạn nứt: kê lại giường theo hướng cát, đặt ảnh cưới hoặc ảnh gia đình ở nơi nhìn thấy đầu tiên khi vào phòng, không đặt gương đối diện giường, hạn chế cho người khác giới vào phòng ngủ riêng.",
      },
      {
        title: "5. Vật phẩm hỗ trợ",
        detail:
          "Đặt đôi chim uyên ương hoặc tượng song hỷ để giữ duyên, quả cầu thạch anh vàng, bát đá ngũ sắc tại khu vực; duy trì ánh sáng ấm áp và không gian thoáng đãng.",
      },
      {
        title: "6. Chuyển hướng ngồi làm việc",
        detail:
          "Bàn làm việc nên quay mặt về hướng cát và để lưng về hướng Lục Sát, tức dùng hung làm tựa sơn có chỗ dựa. Cách này vừa an toàn vừa tăng được quý nhân phù trợ.",
      },
    ],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "tranh", text: "Nên tránh: dễ vướng tai nạn, kiện tụng, tình cảm rối ren." },
      { label: "Hướng cổng / lối đi chính", level: "tranh", text: "Nên tránh; nếu bắt buộc thì dùng đá hoặc gốm lớn che chắn trước cửa." },
      { label: "Hướng bếp (ngửa lò)", level: "tranh", text: "Nên tránh cho miệng lò; ngược lại nên cho lưng bếp tọa về hướng này." },
      { label: "Hướng đầu giường", level: "toitruong", text: "Tuyệt đối tránh: rối ren tình cảm, bệnh thận và tiết niệu, ngủ không sâu." },
      { label: "Hướng bàn làm việc", level: "tranh", text: "Nên tránh: dễ vướng kiện tụng, bị kéo vào chuyện thị phi." },
      { label: "Hướng bàn thờ", level: "tranh", text: "Nên tránh; ưu tiên chọn hướng cát cho gian thờ." },
    ],
  },
  ngu_quy: {
    key: "ngu_quy",
    name: "Ngũ Quỷ",
    alias: "Sao Liêm Trinh",
    starName: "Liêm Trinh Tinh",
    element: "Hoa",
    quality: "hung",
    grade: "Đại Hung",
    score: 2,
    ringColor: "#141b36",
    ringColor2: "#070b1a",
    textColor: "#ffdcdc",
    accent: "#9f1239",
    summary:
      "Hung tinh chủ tiểu nhân, thị phi và hao tài. Ngũ Quỷ là năm thứ quỷ quấy phá: thị phi, khẩu thiệt, mất trộm, hỏa hoạn và bệnh tật tâm thần. Kỵ nhất cho phòng ngủ và khu vực đặt bếp gas.",
    governs: [],
    risks: [
      "TIỂU NHÂN VÀ THỊ PHI: bị nói xấu, bị hãm hại, bị lợi dụng lòng tốt, mất uy tín oan.",
      "HAO TÀI: tiền bạc hao hụt bất thường, chi phí phát sinh liên tục, đầu tư dễ bị lừa.",
      "MẤT TRỘM VÀ HỎA HOẠN: cẩn trọng cháy nổ, chập điện, khí gas, dễ bị mất trộm.",
      "KHẨU THIỆT VÀ QUAN TỤNG: cãi vã, kiện cáo, giấy tờ pháp lý rắc rối.",
      "TÂM THẦN: mất ngủ, hoang tưởng, lo âu, dễ gặp chuyện kỳ lạ khiến bất an.",
    ],
    best: [
      "DÙNG LÀM TỌA CHO BẾP: bếp tọa Ngũ Quỷ, ngửa lò về hướng cát. Dân gian gọi là lửa đốt quỷ.",
      "GIẢM NGUỒN LỬA VÀ ĐIỆN: không đặt bếp gas, bình gas, tủ điện, nến ở khu vực này nếu không bắt buộc.",
      "DÙNG LÀM NHÀ KHO, LỐI ĐI, KHU KỸ THUẬT: không ở lâu và không ngủ ở đây.",
    ],
    remedies: [
      {
        title: "1. Hóa giải bằng Ngũ Hành: Thủy khắc Hỏa",
        detail:
          "Ngũ Quỷ thuộc Hỏa nên dùng Thủy khắc chế: đặt bể cá nhỏ, đài phun nước mini, chậu thủy sinh hoặc bình nước ở khu vực; dùng màu đen, xanh navy, xanh dương đậm cho tường, rèm và thảm. Tránh đèn màu đỏ, nến và bếp gas đặt tại đây.",
      },
      {
        title: "2. An toàn chống hỏa hoạn",
        detail:
          "Kiểm tra hệ thống điện, bình gas, aptomat tại khu vực này; không chất hàng dễ cháy. Đây là phần hóa giải rất thực tế vì Ngũ Quỷ chủ hỏa hoạn.",
      },
      {
        title: "3. Cắt tiểu nhân bằng thái độ",
        detail:
          "Hướng Ngũ Quỷ chủ thị phi: hạn chế họp nhóm, cãi vã và phán xét khi ngồi ở khu vực này; giữ lời nói mềm mỏng, mọi hợp đồng nên đọc kỹ và có người thứ ba kiểm chứng trước khi ký.",
      },
      {
        title: "4. Bếp tọa hung hướng cát",
        detail:
          "Kê bếp dựa lưng về hướng Ngũ Quỷ, miệng lò hướng về Sinh Khí hoặc Thiên Y. Vị trí bếp này giúp lấy lửa đè hung khí, giảm hao tài cho cả gia đình.",
      },
      {
        title: "5. Vật phẩm hỗ trợ",
        detail:
          "Treo chuông gió thủy tinh hoặc đặt bể cá nhỏ thuộc Thủy ở khu vực; đặt tượng Tỳ Hưu, Thiềm Thừ để giảm hao tài; giữ nơi này mát, sạch, thoáng, tránh ẩm thấp và mùi hôi.",
      },
      {
        title: "6. Khi phòng ngủ bắt buộc ở hướng này",
        detail:
          "Nếu không đổi phòng được: xoay đầu giường về hướng cát của gia chủ, dùng bộ chăn ga màu xanh dương hoặc đen, treo rèm dày, không đặt gương soi đối diện giường và đặt một chậu nước sạch ở góc phòng.",
      },
    ],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "toitruong", text: "Tuyệt đối tránh: tiểu nhân, thị phi, hao tài, dễ nảy sinh kiện tụng." },
      { label: "Hướng cổng / lối đi chính", level: "tranh", text: "Nên tránh; nếu bắt buộc thì che chắn bằng bình phong và vật phẩm thuộc Thủy." },
      { label: "Hướng bếp (ngửa lò)", level: "toitruong", text: "Tránh cho miệng lò; ngược lại nên cho lưng bếp tọa về hướng này." },
      { label: "Hướng đầu giường", level: "toitruong", text: "KỴ nhất: mất ngủ, tâm thần bất an, hay mơ thấy điều kỳ lạ." },
      { label: "Hướng bàn làm việc", level: "tranh", text: "Nên tránh: dễ bị đồng nghiệp nói xấu, bị gán lỗi oan." },
      { label: "Hướng bàn thờ", level: "toitruong", text: "Tuyệt đối tránh: gia tâm bất an, con cháu hay cãi nhau." },
    ],
  },
  tuyet_menh: {
    key: "tuyet_menh",
    name: "Tuyệt Mệnh",
    alias: "Sao Phá Quân",
    starName: "Phá Quân Tinh",
    element: "Kim",
    quality: "hung",
    grade: "Đại Hung",
    score: 1,
    ringColor: "#0b1830",
    ringColor2: "#04091a",
    textColor: "#c9dcff",
    accent: "#7f1d1d",
    summary:
      "Hung tinh nguy hiểm nhất trong Bát Trạch, chủ tuyệt tự, phá sản, bệnh hiểm nghèo và tai nạn thương tích. Tuyệt đối không dùng làm hướng cửa chính, bàn thờ hay đầu giường của gia chủ.",
    governs: [],
    risks: [
      "NGUY HIỂM TÍNH MẠNG: tai nạn nghiêm trọng, phẫu thuật lớn, bệnh hiểm nghèo khó chữa.",
      "TÀI LỘC ĐỔ VỠ: phá sản, mất trắng, đầu tư đổ bể, bị chiếm đoạt tài sản.",
      "TUYỆT TỰ VÀ LY TÁN: khó có con hoặc con cái xa cách, họ hàng ly tán, duyên số đứt gãy.",
      "BỊ PHẢN BỘI: đối tác và người thân quay lưng, mất trộm, mất của lớn.",
      "TÂM LÝ: tuyệt vọng, mất ý chí, dễ rơi vào bế tắc.",
    ],
    best: [
      "DÙNG LÀM TỌA CHO BẾP: bếp tọa Tuyệt Mệnh và ngửa lò về hướng cát, lửa đè bớt sát khí.",
      "DÙNG LÀM NHÀ VỆ SINH, KHO ĐỒ CŨ, GARA: nơi không ở lâu, hung khí bị che lấp.",
      "GIỮ SẠCH VÀ SÁNG: tuyệt đối không để bẩn, ẩm mốc, đổ vỡ ở khu vực này.",
    ],
    remedies: [
      {
        title: "1. Đổi hướng sử dụng (hiệu quả nhất)",
        detail:
          "Không dùng hướng Tuyệt Mệnh làm cửa chính, cửa phòng ngủ, bàn thờ, bàn làm việc hay đầu giường. Nếu nhà đã cố định: mở cửa phụ hoặc cửa bên hông về hướng Sinh Khí, Thiên Y và dùng nó làm lối đi chính hàng ngày; lấp bớt hoặc hạn chế dùng cửa xấu.",
      },
      {
        title: "2. Dùng bếp tọa hung hướng cát",
        detail:
          "Kê bếp dựa lưng về hướng Tuyệt Mệnh, miệng lò hướng về Sinh Khí hoặc Thiên Y của gia chủ. Đây là cách hóa giải kinh điển, bếp nấu sẽ đốt bớt hung khí.",
      },
      {
        title: "3. Hóa giải bằng Ngũ Hành: Hỏa khắc Kim",
        detail:
          "Tuyệt Mệnh thuộc Kim nên dùng Hỏa khắc chế: sơn tường màu đỏ, hồng, tím ở khu vực; thắp đèn sáng màu ấm liên tục; đặt vật phẩm gốm nung màu đỏ, tranh núi lửa hoặc tranh mặt trời mọc. Tránh đồ kim loại sắc nhọn, dao kéo và vật sắc cạnh ở khu vực này.",
      },
      {
        title: "4. Che chắn bằng bình phong",
        detail:
          "Nếu cửa chính trùng hướng Tuyệt Mệnh: đặt bình phong, tủ kệ cao hoặc rèm cửa dày phía trong để khí xấu không xung thẳng vào nhà; treo chuông gió bằng gốm hoặc đất nung (không dùng kim loại) ở cửa để phân tán sát khí.",
      },
      {
        title: "5. Vật phẩm tâm linh hỗ trợ",
        detail:
          "Đặt bình hồ lô để hóa bệnh, tượng Phật Bà Quan Âm, quả cầu pha lê trong khu vực; duy trì ánh sáng và sự sạch sẽ. Minh đường sáng sủa thì hung khí tự suy yếu.",
      },
      {
        title: "6. Xoay lại 180 độ nếu có thể",
        detail:
          "Với bàn làm việc và giường ngủ, thường chỉ cần xoay lại hướng ngồi hoặc hướng đầu giường sang hướng đối diện nếu hướng đối diện là cát. Đây là biện pháp không tốn kém nhưng cho kết quả ngay lập tức.",
      },
      {
        title: "7. Kết hợp tuổi các thành viên",
        detail:
          "Nhà ở theo vợ chồng: ưu tiên hướng tốt cho người trụ cột, tức người đóng góp thu nhập chính. Nếu hai vợ chồng khác nhóm mệnh (Đông Tứ Mệnh và Tây Tứ Mệnh) thì lấy hướng tốt của người trụ cột cho cửa chính, còn giường và bếp có thể theo từng người.",
      },
    ],
    applications: [
      { label: "Hướng nhà / cửa chính", level: "toitruong", text: "Tuyệt đối tránh: hung hại nặng nhất, ảnh hưởng trực tiếp đến tính mạng và tài sản." },
      { label: "Hướng cổng / lối đi chính", level: "toitruong", text: "Tuyệt đối tránh; nếu đã có thì làm cửa phụ hướng cát làm lối đi chính." },
      { label: "Hướng bếp (ngửa lò)", level: "toitruong", text: "Tránh cho miệng lò; ngược lại nên cho lưng bếp tọa về hướng này." },
      { label: "Hướng đầu giường", level: "toitruong", text: "Tuyệt đối tránh: dễ bệnh nặng, mất ngủ triền miên, mộng mị." },
      { label: "Hướng bàn làm việc", level: "toitruong", text: "Tuyệt đối tránh: sự nghiệp đổ vỡ, bị phản bội, mất việc." },
      { label: "Hướng bàn thờ", level: "toitruong", text: "Tuyệt đối tránh: gia đạo bất an, con cháu bất hiếu." },
    ],
  },
};

/** Thứ tự từ tốt nhất đến xấu nhất */
export const STAR_ORDER: StarKey[] = [
  "sinh_khi",
  "thien_y",
  "dien_nien",
  "phuc_vi",
  "hoa_hai",
  "luc_sat",
  "ngu_quy",
  "tuyet_menh",
];

export const APP_LEVEL: Record<AppLevel, { label: string; cls: string; dot: string }> = {
  tot: { label: "Tốt", cls: "text-amber-200 bg-amber-400/10 border-amber-300/30", dot: "bg-amber-300" },
  kha: { label: "Khá tốt", cls: "text-emerald-200 bg-emerald-400/10 border-emerald-300/25", dot: "bg-emerald-300" },
  duoc: { label: "Được", cls: "text-emerald-200 bg-emerald-400/10 border-emerald-300/25", dot: "bg-emerald-300" },
  tranh: { label: "Nên tránh", cls: "text-orange-200 bg-orange-400/10 border-orange-300/30", dot: "bg-orange-300" },
  toitruong: { label: "Tuyệt đối tránh", cls: "text-rose-200 bg-rose-500/10 border-rose-400/30", dot: "bg-rose-400" },
};
