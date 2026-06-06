"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getStickerPricing } from "./pricing";
import { getMylarPricing } from "./mylarPricing";

const STORAGE_KEY = "elevate_cart_v1";

export interface CartSize {
  id?: string;
  wIn?: number;
  hIn?: number;
  label?: string;
  name?: string;
  dimensions?: string;
  basePrice?: number;
  width?: number;
  height?: number;
}

export interface CartItem {
  id: string;
  productType: "sticker" | "mylar";
  size: CartSize | string;
  quantity: number;
  designFileId?: string | null | File;
  previewUrl?: string | null;
  unitPrice: number;
  subtotal: number;
  shape?: string | null;
  material?: string;
  frontDesign?: unknown;
  backDesign?: unknown;
}

export interface AddItemParams {
  productType?: "sticker" | "mylar";
  size: CartSize | string;
  material?: string;
  quantity: number;
  shape?: string | null;
  designFileId?: string | null | File;
  previewUrl?: string | null;
  frontDesign?: unknown;
  backDesign?: unknown;
}

interface CartStore {
  items: CartItem[];
  currency: string;
  addItem: (params: AddItemParams) => Promise<string>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => void;
  clear: () => void;
}

function computeMylarUnitPrice(size: CartSize, quantity: number): number {
  if (!size?.id) return 0;
  return getMylarPricing(size.id, quantity).unitPrice;
}

function roundCurrency(n: number): number {
  return Math.round(n * 100) / 100;
}

function cryptoRandom(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "id-" + Math.random().toString(36).slice(2);
}

function isCustomSize(size: CartSize | string): size is CartSize {
  return typeof size === "object" && size !== null && !!size.wIn && !!size.hIn;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: "USD",

      addItem: async ({
        productType = "sticker",
        size,
        material,
        quantity,
        shape = null,
        designFileId = null,
        previewUrl = null,
        frontDesign = null,
        backDesign = null,
      }) => {
        let unitPrice: number;
        let subtotal: number;
        let finalQty = quantity;

        if (productType === "mylar") {
          unitPrice = computeMylarUnitPrice(size as CartSize, quantity);
          subtotal = roundCurrency(unitPrice * quantity);
        } else if (isCustomSize(size)) {
          const res = await fetch(
            `/api/pricing?width=${size.wIn}&height=${size.hIn}&qty=${quantity}`,
          );
          const pricingResult = await res.json();
          unitPrice = pricingResult.unitPrice;
          subtotal = pricingResult.subtotal;
          finalQty = pricingResult.qty;
        } else {
          const pricingResult = await getStickerPricing(size, quantity);
          unitPrice = pricingResult.unitPrice;
          subtotal = pricingResult.subtotal;
          finalQty = pricingResult.qty;
        }

        const id = cryptoRandom();
        const item: CartItem = {
          id,
          productType,
          size,
          quantity: finalQty,
          designFileId,
          previewUrl,
          unitPrice,
          subtotal,
          shape,
        };

        if (productType === "mylar") {
          item.frontDesign = frontDesign;
          item.backDesign = backDesign;
        } else {
          item.material = material;
        }

        set({ items: [...get().items, item] });
        return id;
      },

      updateQuantity: async (id, quantity) => {
        const items = get().items.map((item) => {
          if (item.id !== id) return item;

          if (item.productType === "mylar") {
            const newQty = Math.max(1, Number(quantity || 1));
            const unitPrice = computeMylarUnitPrice(
              item.size as CartSize,
              newQty,
            );
            return {
              ...item,
              quantity: newQty,
              unitPrice,
              subtotal: roundCurrency(unitPrice * newQty),
            };
          }

          return item;
        });

        const item = items.find((i) => i.id === id);
        if (item && item.productType !== "mylar") {
          const pricingResult = await getStickerPricing(item.size, quantity);
          set({
            items: items.map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: pricingResult.qty,
                    unitPrice: pricingResult.unitPrice,
                    subtotal: pricingResult.subtotal,
                  }
                : i,
            ),
          });
          return;
        }

        set({ items });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clear: () => {
        set({ items: [] });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
      }),
    },
  ),
);

export function useCart() {
  const items = useCartStore((s) => s.items);
  const currency = useCartStore((s) => s.currency);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const totalQty = useMemo(
    () => items.reduce((a, i) => a + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => roundCurrency(items.reduce((a, i) => a + i.subtotal, 0)),
    [items],
  );

  const shipping = useMemo(() => {
    if (subtotal >= 150) return 0;
    return items.length > 0 ? 8.5 : 0;
  }, [subtotal, items.length]);

  const tax = useMemo(() => roundCurrency(subtotal * 0.06), [subtotal]);

  const total = useMemo(
    () => roundCurrency(subtotal + shipping + tax),
    [subtotal, shipping, tax],
  );

  return {
    state: { items, currency },
    addItem,
    updateQuantity,
    removeItem,
    clear,
    totalQty,
    subtotal,
    tax,
    shipping,
    total,
  };
}
