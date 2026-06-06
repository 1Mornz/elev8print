import jwt, { type SignOptions } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password) {
    return NextResponse.json(
      { success: false, error: "Password required" },
      { status: 400 }
    );
  }

  if (password === process.env.ADMIN_PASSWORD) {
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"],
    };
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, options);

    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { success: false, error: "Invalid password" },
    { status: 401 }
  );
}
