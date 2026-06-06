import stickerPricing from "./stickerPricingData";

export interface PricingResult {
  unitPrice: number;
  subtotal: number;
  qty: number;
  applied?: Record<string, unknown>;
}

type SizeInput =
  | string
  | { label?: string; wIn?: number; hIn?: number }
  | null
  | undefined;

export async function getStickerPricing(
  sizeInput: SizeInput,
  qtyInput: number | string,
): Promise<PricingResult> {
  const qty = Number(qtyInput) || 0;
  const sizeKey = normalizeSize(sizeInput);

  const standardSquares = new Set(
    Array.from({ length: 10 }, (_, i) => `${i + 1}x${i + 1}`),
  );

  if (!standardSquares.has(sizeKey)) {
    let width: string;
    let height: string;

    if (
      typeof sizeInput === "object" &&
      sizeInput !== null &&
      sizeInput.wIn &&
      sizeInput.hIn
    ) {
      width = String(sizeInput.wIn);
      height = String(sizeInput.hIn);
    } else {
      [width, height] = String(sizeInput).split("x");
    }

    const res = await fetch(
      `/api/pricing?width=${width}&height=${height}&qty=${qty}`,
    );
    if (!res.ok) throw new Error("Pricing API failed");
    return res.json();
  }

  const sizeData =
    stickerPricing.find((s) => s.size === sizeKey) ||
    stickerPricing.find((s) => s.size === "custom");

  if (!sizeData) return { unitPrice: 0, subtotal: 0, qty: 0 };

  const safeQty = Math.max(qty, sizeData.minOrder.qty);
  let chosen: Record<string, unknown> = { ...sizeData.minOrder, type: "min" };

  for (const tier of sizeData.tiers) {
    if (safeQty >= tier.qty) {
      chosen = { ...tier, type: "tier" };
    } else {
      break;
    }
  }

  const unitPrice = round2(chosen.unitPrice as number);
  const subtotal = round2(unitPrice * safeQty);
  return { unitPrice, subtotal, qty: safeQty, applied: chosen };
}

function normalizeSize(sizeInput: SizeInput): string {
  if (!sizeInput) return "custom";
  let raw = "";

  if (typeof sizeInput === "string") {
    raw = sizeInput;
  } else if (typeof sizeInput === "object") {
    raw = sizeInput.label || `${sizeInput.wIn}x${sizeInput.hIn}`;
  }

  return String(raw)
    .toLowerCase()
    .replace(/[×✕]/g, "x")
    .replace(/["""'']/g, "")
    .replace(/\s+/g, "");
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
