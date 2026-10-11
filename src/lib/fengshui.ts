/* =========================================================================
   LÕI TÍNH TOÁN PHONG THỦY BÁT TRẠCH
   - Quái số (Cung Phi) theo năm sinh + giới tính
   - Can Chi, Nạp Âm Ngũ Hành
   - 8 hướng Bát Quái, 24 sơn, 64 cung tiểu cát/hung
   - Đọc kết quả hướng đang chiếu cho gia chủ
   ========================================================================= */

import { ELEMENT_ADVICE, type ElementAdvice, type ElementKey } from "./elements";
import { STARS, STAR_ORDER, type StarInfo, type StarKey } from "./stars";

export type Gender = "nam" | "nu";
export { ELEMENT_ADVICE, STAR_ORDER };
export type { ElementAdvice, ElementKey, StarInfo, StarKey };

/* ------------------------------------------------------------------ */
/* TÁM HƯỚNG BÁT QUÁI                                                  */
/* ------------------------------------------------------------------ */

export interface DirectionInfo {
  index: number;
  key: string;
  name: string;
  short: string;
  letter: string;
  trigram: string;
  glyph: string;
  element: ElementKey;
  group: "Đông Tứ Trạch" | "Tây Tứ Trạch";
  center: number;
  from: number;
  to: number;
}

export const DIRECTIONS: DirectionInfo[] = [
  { index: 0, key: "B", name: "Bắc", short: "B", letter: "B", trigram: "Khảm", glyph: "☵", element: "Thuy", group: "Đông Tứ Trạch", center: 0, from: 337.5, to: 22.5 },
  { index: 1, key: "DB", name: "Đông Bắc", short: "ĐB", letter: "ĐB", trigram: "Cấn", glyph: "☶", element: "Tho", group: "Tây Tứ Trạch", center: 45, from: 22.5, to: 67.5 },
  { index: 2, key: "D", name: "Đông", short: "Đ", letter: "Đ", trigram: "Chấn", glyph: "☳", element: "Moc", group: "Đông Tứ Trạch", center: 90, from: 67.5, to: 112.5 },
  { index: 3, key: "DN", name: "Đông Nam", short: "ĐN", letter: "ĐN", trigram: "Tốn", glyph: "☴", element: "Moc", group: "Đông Tứ Trạch", center: 135, from: 112.5, to: 157.5 },
  { index: 4, key: "N", name: "Nam", short: "N", letter: "N", trigram: "Ly", glyph: "☲", element: "Hoa", group: "Đông Tứ Trạch", center: 180, from: 157.5, to: 202.5 },
  { index: 5, key: "TN", name: "Tây Nam", short: "TN", letter: "TN", trigram: "Khôn", glyph: "☷", element: "Tho", group: "Tây Tứ Trạch", center: 225, from: 202.5, to: 247.5 },
  { index: 6, key: "T", name: "Tây", short: "T", letter: "T", trigram: "Đoài", glyph: "☱", element: "Kim", group: "Tây Tứ Trạch", center: 270, from: 247.5, to: 292.5 },
  { index: 7, key: "TB", name: "Tây Bắc", short: "TB", letter: "TB", trigram: "Càn", glyph: "☰", element: "Kim", group: "Tây Tứ Trạch", center: 315, from: 292.5, to: 337.5 },
];

/** Hào quẻ: từ dưới lên, true = dương (vạch liền), false = âm (vạch đứt) */
export const TRIGRAM_LINES: Record<string, [boolean, boolean, boolean]> = {
  Càn: [true, true, true],
  Đoài: [false, true, true],
  Ly: [true, false, true],
  Chấn: [false, false, true],
  Tốn: [true, true, false],
  Khảm: [false, true, false],
  Cấn: [true, false, false],
  Khôn: [false, false, false],
};

/* ------------------------------------------------------------------ */
/* NHỊ THẬP TỨ SƠN (24 núi – mỗi sơn 15°)                              */
/* ------------------------------------------------------------------ */

export interface MountainInfo {
  name: string;
  center: number;
  element: ElementKey;
  cls: "Thiên Nguyên Long" | "Địa Nguyên Long" | "Nhân Nguyên Long";
  kind: string;
}

const M = (
  name: string,
  center: number,
  element: ElementKey,
  cls: MountainInfo["cls"],
  kind: string,
): MountainInfo => ({ name, center, element, cls, kind });

export const MOUNTAINS: MountainInfo[] = [
  M("Nhâm", 345, "Thuy", "Địa Nguyên Long", "Thiên can dương"),
  M("Tý", 0, "Thuy", "Thiên Nguyên Long", "Tứ Chính"),
  M("Quý", 15, "Thuy", "Nhân Nguyên Long", "Thiên can âm"),
  M("Sửu", 30, "Tho", "Địa Nguyên Long", "Tứ Mộ"),
  M("Cấn", 45, "Tho", "Thiên Nguyên Long", "Tứ Duy"),
  M("Dần", 60, "Moc", "Nhân Nguyên Long", "Tứ Sinh"),
  M("Giáp", 75, "Moc", "Địa Nguyên Long", "Thiên can dương"),
  M("Mão", 90, "Moc", "Thiên Nguyên Long", "Tứ Chính"),
  M("Ất", 105, "Moc", "Nhân Nguyên Long", "Thiên can âm"),
  M("Thìn", 120, "Tho", "Địa Nguyên Long", "Tứ Mộ"),
  M("Tốn", 135, "Moc", "Thiên Nguyên Long", "Tứ Duy"),
  M("Tỵ", 150, "Hoa", "Nhân Nguyên Long", "Tứ Sinh"),
  M("Bính", 165, "Hoa", "Địa Nguyên Long", "Thiên can dương"),
  M("Ngọ", 180, "Hoa", "Thiên Nguyên Long", "Tứ Chính"),
  M("Đinh", 195, "Hoa", "Nhân Nguyên Long", "Thiên can âm"),
  M("Mùi", 210, "Tho", "Địa Nguyên Long", "Tứ Mộ"),
  M("Khôn", 225, "Tho", "Thiên Nguyên Long", "Tứ Duy"),
  M("Thân", 240, "Kim", "Nhân Nguyên Long", "Tứ Sinh"),
  M("Canh", 255, "Kim", "Địa Nguyên Long", "Thiên can dương"),
  M("Dậu", 270, "Kim", "Thiên Nguyên Long", "Tứ Chính"),
  M("Tân", 285, "Kim", "Nhân Nguyên Long", "Thiên can âm"),
  M("Tuất", 300, "Tho", "Địa Nguyên Long", "Tứ Mộ"),
  M("Càn", 315, "Kim", "Thiên Nguyên Long", "Tứ Duy"),
  M("Hợi", 330, "Thuy", "Nhân Nguyên Long", "Tứ Sinh"),
];

/* ------------------------------------------------------------------ */
/* VÒNG 64 CUNG TIỂU CÁT / TIỂU HUNG (mỗi cung 5.625°)                 */
/* ------------------------------------------------------------------ */

export interface MiniFortune {
  name: string;
  type: "cat" | "hung";
  note: string;
}

const mf = (name: string, type: "cat" | "hung", note: string): MiniFortune => ({ name, type, note });

export const MINI_STEP = 360 / 64;

export const MINI_FORTUNES: MiniFortune[] = [
  mf("Hoan Lạc", "cat", "Cung vui vẻ, gia đình thường xuyên có tin vui, người sống ở đây tâm trạng an lạc."),
  mf("Cô Quả", "hung", "Cung cô đơn, duyên phận muộn màng, thiếu người giúp đỡ."),
  mf("Vượng Tài", "cat", "Cung tài vượng, tiền bạc lưu thông, kinh doanh phát đạt."),
  mf("Tuyệt Tự", "hung", "Cung tuyệt tự, khó duyên con cái, dòng họ ly tán, cần hóa giải sớm."),
  mf("Phước Đức", "cat", "Cung có phước đức tổ tiên che chở, làm việc thiện được quả báo."),
  mf("Ngũ Quỷ", "hung", "Cung nhiều tiểu nhân, thị phi, hao tài. Kỵ nhất cho phòng ngủ."),
  mf("Sinh Khí", "cat", "Cung sinh vượng mạnh nhất, đón được thì tài lộc dồi dào."),
  mf("Lục Sát", "hung", "Cung sát khí, dễ va chạm, quan sự và tai nạn ngoài ý muốn."),
  mf("Thiên Y", "cat", "Cung Thiên Y, chữa bệnh, tăng sức khỏe, quý nhân phù trợ."),
  mf("Họa Hại", "hung", "Cung thị phi, mất đoàn kết nội bộ, bệnh nhỏ dai dẳng."),
  mf("Phú Quý", "cat", "Cung phú quý song toàn, danh và lợi đều đủ."),
  mf("Bại Tuyệt", "hung", "Cung bại tuyệt, sự nghiệp dễ sụp đổ, tiền của mất trắng."),
  mf("Tiến Tài", "cat", "Cung tiến tài, lộc lai tứ phương, hợp cửa hàng và két tiền."),
  mf("Khổ Não", "hung", "Cung phiền não, tâm trí bất an, hay lo âu bất ổn."),
  mf("Đăng Khoa", "cat", "Cung đỗ đạt, thi cử hanh thông, rất hợp bàn học của con em."),
  mf("Tật Bệnh", "hung", "Cung bệnh tật, sức khỏe suy giảm, cần chú ý khu vực này."),
  mf("Vinh Hoa", "cat", "Cung vinh hoa, được tôn vinh, danh tiếng vang xa."),
  mf("Thất Tài", "hung", "Cung thất tài, tiền bạc hao hụt, đầu tư dễ thua lỗ."),
  mf("Trường Thọ", "cat", "Cung trường thọ, sức sống bền lâu, hợp cho người lớn tuổi."),
  mf("Ly Tán", "hung", "Cung ly tán, vợ chồng con cái dễ xa cách, gia đạo bất hòa."),
  mf("Thái Bình", "cat", "Cung thái bình, an cư lạc nghiệp, ít biến động."),
  mf("Âm Sa", "hung", "Cung âm sa, nhiều mơ hồ bất an, người nhạy cảm dễ mệt mỏi."),
  mf("Đại Cát", "cat", "Cung đại cát, vạn sự hanh thông, hỷ lạc đầy nhà."),
  mf("Dương Sát", "hung", "Cung dương sát, nóng nảy, dễ xung đột, tai nạn do vội vàng."),
  mf("Tường Phúc", "cat", "Cung tường phúc, điềm lành thường đến, gặp dữ hóa lành."),
  mf("Thoái Tài", "hung", "Cung thoái tài, của cải tụt giảm, cần giữ kế hoạch chi tiêu."),
  mf("Hưng Vượng", "cat", "Cung hưng vượng, gia nghiệp lên như diều gặp gió."),
  mf("Bệnh Phù", "hung", "Cung bệnh phù, ốm vặt, dị ứng, cần giữ vệ sinh khu vực."),
  mf("Minh Đức", "cat", "Cung minh đức, được lòng người, uy tín tăng lên."),
  mf("Cô Thần", "hung", "Cung cô thần, cô độc, ít bạn bè tri kỷ."),
  mf("Quý Nhân", "cat", "Cung quý nhân, luôn có người nâng đỡ khi gặp khó."),
  mf("Quả Tú", "hung", "Cung quả tú, buồn tủi riêng tư, tình duyên trắc trở."),
  mf("Phúc Thọ", "cat", "Cung phúc thọ song toàn, con cháu hiếu thuận."),
  mf("Kiếp Sát", "hung", "Cung kiếp sát, cẩn thận mất trộm, mất của, bị lợi dụng."),
  mf("Khang Ninh", "cat", "Cung khang ninh, sức khỏe và tinh thần ổn định."),
  mf("Tai Ương", "hung", "Cung tai ương, dễ gặp rủi ro bất ngờ, đi xa cần cẩn trọng."),
  mf("Gia Hòa", "cat", "Cung gia hòa, gia đình thuận hòa, ít cãi vã."),
  mf("Phiền Muộn", "hung", "Cung phiền muộn, áp lực tích tụ, dễ stress kéo dài."),
  mf("Tử Tức", "cat", "Cung tử tức, con cháu đông đúc, hiếu học, ngoan ngoãn."),
  mf("Hao Tán", "hung", "Cung hao tán, của cải cứ rỉ dần theo thời gian."),
  mf("Quan Lộc", "cat", "Cung quan lộc, công danh sự nghiệp thăng tiến, hợp bàn làm việc."),
  mf("Khẩu Thiệt", "hung", "Cung khẩu thiệt, lời nói gây họa, dễ mang tiếng oan."),
  mf("Danh Vọng", "cat", "Cung danh vọng, tiếng thơm lan tỏa, được trọng vọng."),
  mf("Thị Phi", "hung", "Cung thị phi, đồn thổi, kiện tụng, giấy tờ rắc rối."),
  mf("An Tâm", "cat", "Cung an tâm, tâm an thân khỏe, giấc ngủ sâu."),
  mf("Trở Trệ", "hung", "Cung trở trệ, dự án đình trệ, kế hoạch chậm trễ."),
  mf("Sinh Vượng", "cat", "Cung sinh vượng, năng lượng tràn đầy, khởi sự thuận lợi."),
  mf("Nghịch Lý", "hung", "Cung nghịch lý, làm gì cũng gặp trở ngại ngược ý."),
  mf("Phú Vinh", "cat", "Cung phú vinh, giàu có bền vững, của cải tích lũy."),
  mf("Đoạn Tuyệt", "hung", "Cung đoạn tuyệt, quan hệ dễ đứt gãy, hứa hẹn không giữ."),
  mf("Ngũ Phúc", "cat", "Cung ngũ phúc: phúc, lộc, thọ, khang ninh, thiện chung."),
  mf("Văn Thơ", "hung", "Cung văn thư, hợp đồng, giấy tờ, kiện tụng phiền phức."),
  mf("Tam Đa", "cat", "Cung tam đa: đa phúc, đa lộc, đa thọ."),
  mf("Tiểu Hung", "hung", "Cung tiểu hung, rắc rối nhỏ nhưng liên tục, cần kiên nhẫn."),
  mf("Quan Tinh", "cat", "Cung quan tinh, được cấp trên chú ý, có cơ hội thăng tiến."),
  mf("Đại Hung", "hung", "Cung đại hung, tuyệt đối tránh dùng cho cửa chính và giường ngủ."),
  mf("Lộc Tinh", "cat", "Cung lộc tinh, lương bổng tăng, phụ cấp đều."),
  mf("Tuyệt Duyên", "hung", "Cung tuyệt duyên, nhân duyên tan vỡ, hợp tác đổ vỡ."),
  mf("Văn Xương", "cat", "Cung văn xương, học hành đỗ đạt, nghiên cứu và sáng tác hanh thông."),
  mf("Thất Lộc", "hung", "Cung thất lộc, mất nguồn thu nhập, cần đa dạng hóa tài chính."),
  mf("Trạch Lộc", "cat", "Cung trạch lộc, nhà cửa sung túc, của ăn của để."),
  mf("Tuyệt Sản", "hung", "Cung tuyệt sản, tài sản dễ mất, kinh doanh dễ phá sản."),
  mf("Khai Tâm", "cat", "Cung khai tâm, trí tuệ mở mang, hợp phòng sách và thiền đường."),
  mf("Khổ Ưu", "hung", "Cung khổ ưu, lo nghĩ triền miên, cần giảm tải áp lực."),
];

/* ------------------------------------------------------------------ */
/* BẢNG QUÁI SỐ                                                        */
/* ------------------------------------------------------------------ */

export interface KuaInfo {
  num: number;
  name: string;
  glyph: string;
  element: ElementKey;
  group: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
  desc: string;
}

export const KUA_INFO: Record<number, KuaInfo> = {
  1: { num: 1, name: "Khảm", glyph: "☵", element: "Thuy", group: "Đông Tứ Mệnh", desc: "Quẻ Khảm (Nước): bản mệnh linh hoạt, giao tiếp tốt, khả năng thích nghi cao." },
  2: { num: 2, name: "Khôn", glyph: "☷", element: "Tho", group: "Tây Tứ Mệnh", desc: "Quẻ Khôn (Đất): bản mệnh bao dung, bền bỉ, giỏi chăm lo gia đình." },
  3: { num: 3, name: "Chấn", glyph: "☳", element: "Moc", group: "Đông Tứ Mệnh", desc: "Quẻ Chấn (Sấm): bản mệnh mạnh mẽ, quyết đoán, dễ thăng tiến nhanh." },
  4: { num: 4, name: "Tốn", glyph: "☴", element: "Moc", group: "Đông Tứ Mệnh", desc: "Quẻ Tốn (Gió): bản mệnh mềm mại, uyển chuyển, hợp văn chương nghệ thuật." },
  5: { num: 5, name: "Trung Cung", glyph: "☷", element: "Tho", group: "Tây Tứ Mệnh", desc: "Số trung cung 5: nam quy về Khôn (2), nữ quy về Cấn (8)." },
  6: { num: 6, name: "Càn", glyph: "☰", element: "Kim", group: "Tây Tứ Mệnh", desc: "Quẻ Càn (Trời): bản mệnh quyền lực, lãnh đạo, ý chí mạnh mẽ." },
  7: { num: 7, name: "Đoài", glyph: "☱", element: "Kim", group: "Tây Tứ Mệnh", desc: "Quẻ Đoài (Hồ): bản mệnh vui vẻ, dễ gần, hợp nghệ thuật và giao tiếp." },
  8: { num: 8, name: "Cấn", glyph: "☶", element: "Tho", group: "Tây Tứ Mệnh", desc: "Quẻ Cấn (Núi): bản mệnh điềm tĩnh, kiên định, tích lũy bền chắc." },
  9: { num: 9, name: "Ly", glyph: "☲", element: "Hoa", group: "Đông Tứ Mệnh", desc: "Quẻ Ly (Lửa): bản mệnh rực rỡ, sáng tạo, nổi bật giữa đám đông." },
};

/** STARS_BY_KUA[quái số][chỉ số hướng 0..7] = sao chiếu hướng đó */
export const STARS_BY_KUA: Record<number, StarKey[]> = {
  1: ["phuc_vi", "ngu_quy", "thien_y", "sinh_khi", "dien_nien", "tuyet_menh", "hoa_hai", "luc_sat"],
  2: ["tuyet_menh", "sinh_khi", "hoa_hai", "ngu_quy", "luc_sat", "phuc_vi", "thien_y", "dien_nien"],
  3: ["thien_y", "luc_sat", "phuc_vi", "dien_nien", "sinh_khi", "hoa_hai", "tuyet_menh", "ngu_quy"],
  4: ["sinh_khi", "tuyet_menh", "dien_nien", "phuc_vi", "thien_y", "ngu_quy", "luc_sat", "hoa_hai"],
  5: ["tuyet_menh", "sinh_khi", "hoa_hai", "ngu_quy", "luc_sat", "phuc_vi", "thien_y", "dien_nien"],
  6: ["luc_sat", "thien_y", "ngu_quy", "hoa_hai", "tuyet_menh", "dien_nien", "sinh_khi", "phuc_vi"],
  7: ["hoa_hai", "dien_nien", "luc_sat", "tuyet_menh", "ngu_quy", "sinh_khi", "phuc_vi", "thien_y"],
  8: ["ngu_quy", "phuc_vi", "tuyet_menh", "luc_sat", "hoa_hai", "sinh_khi", "dien_nien", "thien_y"],
  9: ["dien_nien", "luc_sat", "sinh_khi", "thien_y", "phuc_vi", "hoa_hai", "ngu_quy", "tuyet_menh"],
};

/* ------------------------------------------------------------------ */
/* CAN CHI & NẠP ÂM                                                    */
/* ------------------------------------------------------------------ */

const THIEN_CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const DIA_CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const CON_GIAP = ["Tý (Chuột)", "Sửu (Trâu)", "Dần (Hổ)", "Mão (Mèo)", "Thìn (Rồng)", "Tỵ (Rắn)", "Ngọ (Ngựa)", "Mùi (Dê)", "Thân (Khỉ)", "Dậu (Gà)", "Tuất (Chó)", "Hợi (Lợn)"];

const NAP_AM = [
  "Hải Trung Kim", "Lô Trung Hỏa", "Đại Lâm Mộc", "Lộ Bàng Thổ", "Kiếm Phong Kim",
  "Sơn Đầu Hỏa", "Giản Hạ Thủy", "Thành Đầu Thổ", "Bạch Lạp Kim", "Dương Liễu Mộc",
  "Tuyền Trung Thủy", "Ốc Thượng Thổ", "Tích Lịch Hỏa", "Tùng Bách Mộc", "Trường Lưu Thủy",
  "Sa Trung Kim", "Sơn Hạ Hỏa", "Bình Địa Mộc", "Bích Thượng Thổ", "Kim Bạch Kim",
  "Phúc Đăng Hỏa", "Thiên Hà Thủy", "Đại Dịch Thổ", "Thoa Xuyến Kim", "Tang Đố Mộc",
  "Đại Khê Thủy", "Sa Trung Thổ", "Thiên Thượng Hỏa", "Thạch Lựu Mộc", "Đại Hải Thủy",
];

export function canChiOf(year: number) {
  const i = (((year - 1984) % 60) + 60) % 60;
  return {
    can: THIEN_CAN[i % 10],
    chi: DIA_CHI[i % 12],
    conGiap: CON_GIAP[i % 12],
    napAm: NAP_AM[Math.floor(i / 2)],
    label: `${THIEN_CAN[i % 10]} ${DIA_CHI[i % 12]}`,
  };
}

/* ------------------------------------------------------------------ */
/* HÀM TÍNH TOÁN                                                       */
/* ------------------------------------------------------------------ */

export function digitalRoot(n: number): number {
  let x = Math.abs(Math.trunc(n));
  while (x > 9) {
    let s = 0;
    while (x > 0) {
      s += x % 10;
      x = Math.floor(x / 10);
    }
    x = s;
  }
  return x;
}

/**
 * Quái số (Cung Phi Bát Trạch).
 * Công thức chuẩn: cộng các chữ số năm sinh tới khi còn một chữ số (s).
 *  - Nam: 11 - s   (kết quả 10 thì lấy 1, kết quả 5 thì lấy 2 - Khôn)
 *  - Nữ  : s + 4    (lớn hơn 9 thì trừ 9, kết quả 5 thì lấy 8 - Cấn)
 * Năm sinh tính theo âm lịch; sinh trước Tiết Lập Xuân (khoảng 4/2) thì tính năm trước.
 */
export function computeKua(year: number, gender: Gender, beforeLapXuan = false): number {
  const y = beforeLapXuan ? year - 1 : year;
  const s = digitalRoot(y);
  if (gender === "nam") {
    let k = 11 - s;
    if (k === 10) k = 1;
    if (k === 5) k = 2;
    return k;
  }
  let k = s + 4;
  if (k > 9) k -= 9;
  if (k === 5) k = 8;
  return k;
}

export function normalizeDeg(d: number): number {
  return ((d % 360) + 360) % 360;
}

export function headingToDirectionIndex(heading: number): number {
  return Math.floor(normalizeDeg(heading + 22.5) / 45) % 8;
}

export function headingToMountainIndex(heading: number): number {
  return Math.floor(normalizeDeg(heading + 7.5) / 15) % 24;
}

export function headingToMiniIndex(heading: number): number {
  return Math.floor(normalizeDeg(heading + MINI_STEP / 2) / MINI_STEP) % 64;
}

export function angleDiff(a: number, b: number): number {
  let d = normalizeDeg(a - b);
  if (d > 180) d -= 360;
  return d;
}

/* ------------------------------------------------------------------ */
/* HỒ SƠ GIA CHỦ & KẾT QUẢ ĐỌC HƯỚNG                                   */
/* ------------------------------------------------------------------ */

export interface Person {
  name: string;
  day: number;
  month: number;
  year: number;
  gender: Gender;
  beforeLapXuan: boolean;
}

export interface RankedDir {
  dirIndex: number;
  direction: DirectionInfo;
  star: StarInfo;
}

export interface Profile {
  person: Person;
  kua: number;
  kuaInfo: KuaInfo;
  canChi: ReturnType<typeof canChiOf>;
  effectiveYear: number;
  elementAdvice: ElementAdvice;
  ranked: RankedDir[];
  good: RankedDir[];
  bad: RankedDir[];
  best: RankedDir;
  worst: RankedDir;
}

export function buildProfile(person: Person): Profile {
  const kua = computeKua(person.year, person.gender, person.beforeLapXuan);
  const kuaInfo = KUA_INFO[kua];
  const effectiveYear = person.beforeLapXuan ? person.year - 1 : person.year;
  const canChi = canChiOf(effectiveYear);
  const elementAdvice = ELEMENT_ADVICE[kuaInfo.element];

  const list: RankedDir[] = DIRECTIONS.map((d) => ({
    dirIndex: d.index,
    direction: d,
    star: STARS[STARS_BY_KUA[kua][d.index]],
  }));
  const ranked = [...list].sort((a, b) => b.star.score - a.star.score);

  return {
    person,
    kua,
    kuaInfo,
    canChi,
    effectiveYear,
    elementAdvice,
    ranked,
    good: ranked.filter((r) => r.star.quality === "cat"),
    bad: ranked.filter((r) => r.star.quality === "hung"),
    best: ranked[0],
    worst: ranked[ranked.length - 1],
  };
}

export interface Reading {
  dirIndex: number;
  heading: number;
  direction: DirectionInfo;
  mountain: MountainInfo;
  mini: MiniFortune;
  star: StarInfo;
}

export function readHeading(profile: Profile, heading: number): Reading {
  const dirIndex = headingToDirectionIndex(heading);
  return {
    dirIndex,
    heading: normalizeDeg(heading),
    direction: DIRECTIONS[dirIndex],
    mountain: MOUNTAINS[headingToMountainIndex(heading)],
    mini: MINI_FORTUNES[headingToMiniIndex(heading)],
    star: STARS[STARS_BY_KUA[profile.kua][dirIndex]],
  };
}

/* ------------------------------------------------------------------ */
/* HỖ TRỢ HIỂN THỊ                                                     */
/* ------------------------------------------------------------------ */

export function formatHeading(h: number): string {
  const v = normalizeDeg(h);
  const deg = Math.floor(v);
  const min = Math.round((v - deg) * 60);
  return min > 0 ? `${deg}°${String(Math.min(min, 59)).padStart(2, "0")}′` : `${deg}°`;
}

export function mountainRange(heading: number): string {
  const i = headingToMountainIndex(heading);
  const a = normalizeDeg(MOUNTAINS[i].center - 7.5);
  const b = normalizeDeg(MOUNTAINS[i].center + 7.5);
  return `${a.toFixed(1)}° – ${b.toFixed(1)}°`;
}

export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function isBeforeLapXuan(day: number, month: number): boolean {
  return month < 2 || (month === 2 && day < 4);
}
