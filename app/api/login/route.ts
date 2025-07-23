import { setPlayerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { pseudo } = await req.json();

  if (!pseudo || typeof pseudo !== "string" || pseudo.length < 3) {
    return NextResponse.json({ error: "Pseudo requis (3+ caractères)" }, { status: 400 });
  }

  let player = await prisma.player.findUnique({ where: { pseudo } });
  if (!player) {
    player = await prisma.player.create({ data: { pseudo } });
  }

  setPlayerSession(player.id);

  return NextResponse.json({ id: player.id, pseudo: player.pseudo });
}
