import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET: Tous les projets du joueur connecté
export async function GET() {
  const cookiesList = await cookies();
  const playerId = cookiesList.get("minecraft_player_id")?.value;
  if (!playerId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { playerId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

// POST: Ajouter un projet
export async function POST(req: NextRequest) {
  const cookiesList = await cookies();
  const playerId = cookiesList.get("minecraft_player_id")?.value;
  if (!playerId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { coordsX, coordsY, coordsZ, tags, description, etat, projet, monde } = await req.json();

  // Validation rapide
  if (
    [coordsX, coordsY, coordsZ].some((n) => typeof n !== "number") ||
    !Array.isArray(tags) ||
    tags.length < 1 ||
    tags.length > 5 ||
    !description ||
    typeof description !== "string" ||
    !projet ||
    typeof projet !== "string" ||
    !["overworld", "nether", "end"].includes(monde)
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const tagsString = tags.join(";");

  try {
    const project = await prisma.project.create({
      data: {
        playerId,
        coordsX,
        coordsY,
        coordsZ,
        tags: tagsString,
        description,
        etat: etat || "En cours",
        projet: projet.trim(),
        monde: monde || "overworld",
      },
    });
    return NextResponse.json(project);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur lors de la création." }, { status: 500 });
  }
}
