import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/all-projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        player: true,
      },
    });

    const response = projects.map((p) => ({
      id: p.id,
      coordsX: p.coordsX,
      coordsY: p.coordsY,
      coordsZ: p.coordsZ,
      tags: p.tags,
      description: p.description,
      etat: p.etat,
      createdAt: p.createdAt,
      monde: p.monde,
      player: {
        id: p.player.id,
        pseudo: p.player.pseudo,
      },
      projet: p.projet ?? p.description?.slice(0, 32) ?? "",
    }));

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
