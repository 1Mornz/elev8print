import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { description } = await request.json();

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ description })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data[0] });
}
