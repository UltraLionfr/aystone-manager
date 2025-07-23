import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookiesList = cookies();
  const playerId = cookiesList.get("minecraft_player_id")?.value;
  if (!playerId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const data = await req.json();
  const proj = await prisma.project.findUnique({ where: { id: params.id } });
  if (!proj || proj.playerId !== playerId)
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  const { coordsX, coordsY, coordsZ, tags, description, etat, projet, monde } = data;
  const updateData: any = {};
  if (coordsX !== undefined) updateData.coordsX = coordsX;
  if (coordsY !== undefined) updateData.coordsY = coordsY;
  if (coordsZ !== undefined) updateData.coordsZ = coordsZ;
  if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags.join(";") : tags;
  if (description !== undefined) updateData.description = description;
  if (etat !== undefined) updateData.etat = etat;
  if (projet !== undefined) updateData.projet = projet;
  if (monde !== undefined && ["overworld", "nether", "end"].includes(monde)) updateData.monde = monde;

  try {
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur lors de la modification." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookiesList = cookies();
  const playerId = cookiesList.get("minecraft_player_id")?.value;
  if (!playerId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const proj = await prisma.project.findUnique({ where: { id: params.id } });
  if (!proj || proj.playerId !== playerId)
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }
}
