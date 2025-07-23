import { getPlayerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const playerId = await getPlayerSession();
  if (!playerId) return NextResponse.json(null);
  const player = await prisma.player.findUnique({ where: { id: playerId } });
  if (!player) return NextResponse.json(null);
  return NextResponse.json({ id: player.id, pseudo: player.pseudo });
}
