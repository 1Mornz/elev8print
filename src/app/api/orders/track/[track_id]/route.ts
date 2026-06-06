import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ track_id: string }> }
) {
  try {
    const { track_id } = await params;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("track_id", track_id)
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
