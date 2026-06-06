export interface MylarTier {
  qty: number;
  unitPrice: number;
}

export interface MylarBagSize {
  id: string;
  name: string;
  dimensions: string;
  basePrice: number;
  width: number;
  height: number;
  tiers: MylarTier[];
}

export interface MylarPricingResult {
  unitPrice: number;
  subtotal: number;
  qty: number;
}

export const mylarBagSizes: MylarBagSize[] = [
  {
    id: "pound",
    name: "Pound Bags",
    dimensions: "Standard pound size",
    basePrice: 10.0,
    width: 80,
    height: 120,
    tiers: [
      { qty: 1, unitPrice: 10.0 },
      { qty: 25, unitPrice: 9.5 },
      { qty: 50, unitPrice: 9.0 },
      { qty: 100, unitPrice: 8.5 },
    ],
  },
  {
    id: "eighth",
    name: "1/8 Bags",
    dimensions: "1/8 oz size",
    basePrice: 2.0,
    width: 40,
    height: 60,
    tiers: [
      { qty: 16, unitPrice: 2.0 },
      { qty: 64, unitPrice: 1.6 },
      { qty: 128, unitPrice: 1.2 },
      { qty: 512, unitPrice: 1.0 },
    ],
  },
  {
    id: "quarter",
    name: "1/4 Oz Bags",
    dimensions: "1/4 oz size",
    basePrice: 2.3,
    width: 50,
    height: 70,
    tiers: [
      { qty: 16, unitPrice: 2.3 },
      { qty: 64, unitPrice: 1.9 },
      { qty: 128, unitPrice: 1.5 },
      { qty: 512, unitPrice: 1.3 },
    ],
  },
  {
    id: "half",
    name: "1/2 Oz Bags",
    dimensions: "1/2 oz size",
    basePrice: 2.6,
    width: 60,
    height: 80,
    tiers: [
      { qty: 16, unitPrice: 2.6 },
      { qty: 64, unitPrice: 2.2 },
      { qty: 128, unitPrice: 1.8 },
      { qty: 512, unitPrice: 1.6 },
    ],
  },
  {
    id: "oz",
    name: "Oz Bags",
    dimensions: "1 oz size",
    basePrice: 2.85,
    width: 70,
    height: 90,
    tiers: [
      { qty: 16, unitPrice: 2.85 },
      { qty: 160, unitPrice: 2.5 },
      { qty: 320, unitPrice: 2.4 },
      { qty: 480, unitPrice: 2.3 },
      { qty: 640, unitPrice: 2.2 },
      { qty: 800, unitPrice: 2.1 },
    ],
  },
];

export function getMylarPricing(
  sizeId: string,
  quantity: number,
): MylarPricingResult {
  const sizeData = mylarBagSizes.find((size) => size.id === sizeId);
  if (!sizeData) return { unitPrice: 0, subtotal: 0, qty: 0 };

  let unitPrice = sizeData.basePrice;

  const sortedTiers = [...sizeData.tiers].sort((a, b) => b.qty - a.qty);

  for (const tier of sortedTiers) {
    if (quantity >= tier.qty) {
      unitPrice = tier.unitPrice;
      break;
    }
  }

  const subtotal = Math.round(unitPrice * quantity * 100) / 100;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    subtotal,
    qty: quantity,
  };
}
