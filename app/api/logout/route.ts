import { clearPlayerSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  clearPlayerSession();
  return NextResponse.json({ ok: true });
}
