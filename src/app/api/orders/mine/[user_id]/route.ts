import { NextResponse } from "next/server";
import { toErrorMessage } from "@/lib/api-error";
import { supabase } from "@/lib/supabase-admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ orders: data });
  } catch (err) {
    const message = toErrorMessage(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
