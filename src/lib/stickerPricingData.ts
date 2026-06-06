export interface PricingTier {
  qty: number;
  price: number;
  discount: string;
  unitPrice: number;
}

export interface MinOrder {
  qty: number;
  price: number;
  unitPrice: number;
}

export interface StickerSizePricing {
  size: string;
  basedOn?: string;
  minOrder: MinOrder;
  tiers: PricingTier[];
}

const stickerPricingData: StickerSizePricing[] = [
  {
    size: "2x2",
    minOrder: { qty: 55, price: 26, unitPrice: 0.47 },
    tiers: [
      { qty: 100, price: 47, discount: "—", unitPrice: 0.47 },
      { qty: 200, price: 64, discount: "-32%", unitPrice: 0.32 },
      { qty: 300, price: 96, discount: "-32%", unitPrice: 0.32 },
      { qty: 500, price: 114, discount: "-52%", unitPrice: 0.23 },
      { qty: 600, price: 136, discount: "-52%", unitPrice: 0.23 },
      { qty: 900, price: 175, discount: "-59%", unitPrice: 0.19 },
      { qty: 1200, price: 201, discount: "-65%", unitPrice: 0.17 },
      { qty: 1500, price: 252, discount: "-65%", unitPrice: 0.17 },
    ],
  },
  {
    size: "3x3",
    minOrder: { qty: 25, price: 26, unitPrice: 1.04 },
    tiers: [
      { qty: 50, price: 53, discount: "—", unitPrice: 1.06 },
      { qty: 100, price: 71, discount: "-32%", unitPrice: 0.71 },
      { qty: 200, price: 101, discount: "-52%", unitPrice: 0.51 },
      { qty: 300, price: 151, discount: "-52%", unitPrice: 0.5 },
      { qty: 500, price: 216, discount: "-59%", unitPrice: 0.43 },
      { qty: 600, price: 223, discount: "-65%", unitPrice: 0.37 },
      { qty: 900, price: 270, discount: "-71%", unitPrice: 0.3 },
      { qty: 1200, price: 361, discount: "-71%", unitPrice: 0.3 },
    ],
  },
  {
    size: "4x4",
    minOrder: { qty: 14, price: 27, unitPrice: 1.93 },
    tiers: [
      { qty: 25, price: 47, discount: "—", unitPrice: 1.88 },
      { qty: 50, price: 64, discount: "-32%", unitPrice: 1.28 },
      { qty: 100, price: 91, discount: "-52%", unitPrice: 0.91 },
      { qty: 200, price: 156, discount: "-59%", unitPrice: 0.78 },
      { qty: 300, price: 201, discount: "-65%", unitPrice: 0.67 },
      { qty: 500, price: 271, discount: "-71%", unitPrice: 0.54 },
      { qty: 600, price: 325, discount: "-71%", unitPrice: 0.54 },
      { qty: 900, price: 487, discount: "-71%", unitPrice: 0.54 },
    ],
  },
  {
    size: "5x5",
    minOrder: { qty: 9, price: 26, unitPrice: 2.89 },
    tiers: [
      { qty: 25, price: 73, discount: "—", unitPrice: 2.92 },
      { qty: 50, price: 99, discount: "-32%", unitPrice: 1.98 },
      { qty: 100, price: 141, discount: "-52%", unitPrice: 1.41 },
      { qty: 200, price: 208, discount: "-65%", unitPrice: 1.04 },
      { qty: 300, price: 312, discount: "-65%", unitPrice: 1.04 },
      { qty: 500, price: 420, discount: "-71%", unitPrice: 0.84 },
      { qty: 600, price: 503, discount: "-71%", unitPrice: 0.84 },
      { qty: 900, price: 624, discount: "-76%", unitPrice: 0.69 },
    ],
  },
  {
    size: "6x6",
    minOrder: { qty: 7, price: 29, unitPrice: 4.14 },
    tiers: [
      { qty: 25, price: 71, discount: "—", unitPrice: 2.84 },
      { qty: 50, price: 101, discount: "-32%", unitPrice: 2.02 },
      { qty: 100, price: 173, discount: "-52%", unitPrice: 1.73 },
      { qty: 200, price: 298, discount: "-59%", unitPrice: 1.49 },
      { qty: 300, price: 361, discount: "-65%", unitPrice: 1.2 },
      { qty: 500, price: 497, discount: "-71%", unitPrice: 1.0 },
      { qty: 600, price: 596, discount: "-76%", unitPrice: 0.99 },
      { qty: 900, price: 770, discount: "-80%", unitPrice: 0.86 },
    ],
  },
  {
    size: "7x7",
    minOrder: { qty: 5, price: 29, unitPrice: 5.8 },
    tiers: [
      { qty: 25, price: 98, discount: "—", unitPrice: 3.92 },
      { qty: 50, price: 138, discount: "-32%", unitPrice: 2.76 },
      { qty: 100, price: 204, discount: "-52%", unitPrice: 2.04 },
      { qty: 200, price: 330, discount: "-65%", unitPrice: 1.65 },
      { qty: 300, price: 494, discount: "-71%", unitPrice: 1.65 },
      { qty: 500, price: 681, discount: "-76%", unitPrice: 1.36 },
      { qty: 600, price: 817, discount: "-76%", unitPrice: 1.36 },
      { qty: 900, price: 1057, discount: "-80%", unitPrice: 1.17 },
    ],
  },
  {
    size: "8x8",
    minOrder: { qty: 4, price: 30, unitPrice: 7.5 },
    tiers: [
      { qty: 25, price: 90, discount: "—", unitPrice: 3.6 },
      { qty: 50, price: 154, discount: "-52%", unitPrice: 3.08 },
      { qty: 100, price: 266, discount: "-59%", unitPrice: 2.66 },
      { qty: 200, price: 429, discount: "-65%", unitPrice: 2.15 },
      { qty: 300, price: 532, discount: "-71%", unitPrice: 1.77 },
      { qty: 500, price: 763, discount: "-76%", unitPrice: 1.53 },
      { qty: 600, price: 916, discount: "-80%", unitPrice: 1.53 },
      { qty: 900, price: 1233, discount: "-82%", unitPrice: 1.37 },
    ],
  },
  {
    size: "9x9",
    minOrder: { qty: 3, price: 29, unitPrice: 9.67 },
    tiers: [
      { qty: 25, price: 115, discount: "—", unitPrice: 4.6 },
      { qty: 50, price: 196, discount: "-52%", unitPrice: 3.92 },
      { qty: 100, price: 273, discount: "-59%", unitPrice: 2.73 },
      { qty: 200, price: 451, discount: "-71%", unitPrice: 2.26 },
      { qty: 300, price: 676, discount: "-76%", unitPrice: 2.25 },
      { qty: 500, price: 971, discount: "-80%", unitPrice: 1.94 },
      { qty: 600, price: 1046, discount: "-82%", unitPrice: 1.74 },
      { qty: 900, price: 1569, discount: "-82%", unitPrice: 1.74 },
    ],
  },
  {
    size: "10x10",
    minOrder: { qty: 3, price: 35, unitPrice: 11.67 },
    tiers: [
      { qty: 25, price: 141, discount: "—", unitPrice: 5.64 },
      { qty: 50, price: 208, discount: "-52%", unitPrice: 4.16 },
      { qty: 100, price: 336, discount: "-65%", unitPrice: 3.36 },
      { qty: 200, price: 555, discount: "-71%", unitPrice: 2.78 },
      { qty: 300, price: 832, discount: "-76%", unitPrice: 2.77 },
      { qty: 500, price: 1073, discount: "-82%", unitPrice: 2.15 },
      { qty: 600, price: 1287, discount: "-82%", unitPrice: 2.15 },
      { qty: 900, price: 1765, discount: "-83%", unitPrice: 1.96 },
    ],
  },
  {
    size: "custom",
    basedOn: "3x3",
    minOrder: { qty: 25, price: 26, unitPrice: 1.04 },
    tiers: [
      { qty: 50, price: 53, discount: "—", unitPrice: 1.06 },
      { qty: 100, price: 71, discount: "-32%", unitPrice: 0.71 },
      { qty: 200, price: 101, discount: "-52%", unitPrice: 0.51 },
      { qty: 300, price: 151, discount: "-52%", unitPrice: 0.5 },
      { qty: 500, price: 216, discount: "-59%", unitPrice: 0.43 },
      { qty: 600, price: 223, discount: "-65%", unitPrice: 0.37 },
      { qty: 900, price: 270, discount: "-71%", unitPrice: 0.3 },
      { qty: 1200, price: 361, discount: "-71%", unitPrice: 0.3 },
    ],
  },
];

export default stickerPricingData;
