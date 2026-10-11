/* Ngũ Hành – màu sắc & con số bổ trợ */

export type ElementKey = "Kim" | "Moc" | "Thuy" | "Hoa" | "Tho";

export const ELEMENT_NAME: Record<ElementKey, string> = {
  Kim: "Kim",
  Moc: "Mộc",
  Thuy: "Thủy",
  Hoa: "Hỏa",
  Tho: "Thổ",
};

export const ELEMENT_COLOR: Record<ElementKey, string> = {
  Kim: "#e8d9a8",
  Moc: "#8fdcae",
  Thuy: "#8ec5f0",
  Hoa: "#f59a80",
  Tho: "#d9bb8d",
};

export interface ElementAdvice {
  favorable: string;
  supportive: string;
  avoid: string;
  lessen: string;
  numbers: string;
}

export const ELEMENT_ADVICE: Record<ElementKey, ElementAdvice> = {
  Thuy: {
    favorable: "Đen, xanh navy, xanh biển đậm",
    supportive: "Trắng, bạc, vàng kim (Kim sinh Thủy)",
    avoid: "Vàng đất, nâu đất (Thổ khắc Thủy)",
    lessen: "Xanh lục (Thủy sinh Mộc nên hao tài)",
    numbers: "1 – 6",
  },
  Hoa: {
    favorable: "Đỏ, hồng, tím, cam",
    supportive: "Xanh lục (Mộc sinh Hỏa)",
    avoid: "Đen, xanh navy (Thủy khắc Hỏa)",
    lessen: "Trắng, bạc (Hỏa khắc Kim)",
    numbers: "2 – 7",
  },
  Moc: {
    favorable: "Xanh lục, xanh nõn chuối",
    supportive: "Đen, navy (Thủy sinh Mộc)",
    avoid: "Trắng, bạc, vàng kim (Kim khắc Mộc)",
    lessen: "Vàng đất, nâu (Mộc khắc Thổ)",
    numbers: "3 – 8",
  },
  Kim: {
    favorable: "Trắng, bạc, vàng kim",
    supportive: "Vàng đất, nâu (Thổ sinh Kim)",
    avoid: "Đỏ, hồng, tím (Hỏa khắc Kim)",
    lessen: "Xanh lục (Kim khắc Mộc)",
    numbers: "4 – 9",
  },
  Tho: {
    favorable: "Vàng đất, nâu, cam đất",
    supportive: "Đỏ, tím (Hỏa sinh Thổ)",
    avoid: "Xanh lục (Mộc khắc Thổ)",
    lessen: "Đen, navy (Thổ khắc Thủy)",
    numbers: "5 – 10",
  },
};
