import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const width = searchParams.get("width");
    const height = searchParams.get("height");
    const qty = searchParams.get("qty");
    const quantity = parseInt(qty || "", 10);

    if (!width || !height || !quantity) {
      return NextResponse.json(
        { error: "width, height, and qty are required" },
        { status: 400 }
      );
    }

    const width_mm = Math.round(parseFloat(width) * 25.4);
    const height_mm = Math.round(parseFloat(height) * 25.4);

    const attributes = {
      delivery: "single",
      sheet_type: "single",
      laminate: "glossy_uv",
      material: "white",
      sheet_name: "path",
      quantity,
      market: "us",
      imperial_units: true,
      width_mm,
      height_mm,
      size: `${width}" x ${height}"`,
    };

    const params = new URLSearchParams({
      attributes: JSON.stringify(attributes),
      prices: "true",
      lang: "us",
      show_vat: "false",
    });

    const url = `https://api.stickerapp.com/product/create_item/custom_sticker/die_cut?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`StickerApp API error: ${response.status}`);
    }
    const data = await response.json();

    const result = {
      subtotal: data.price.total,
      unitPrice: Math.round((data.price.total / quantity) * 100) / 100,
      qty: quantity,
      applied: { type: "stickerapp-api" },
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Pricing API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}
