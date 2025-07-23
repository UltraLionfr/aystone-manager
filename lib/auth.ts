import { cookies } from "next/headers";

const COOKIE_NAME = "minecraft_player_id";

export async function setPlayerSession(playerId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, playerId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
    sameSite: "lax",
  });
}

export async function getPlayerSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function clearPlayerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
