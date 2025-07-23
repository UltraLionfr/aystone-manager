import { cookies } from "next/headers";

const COOKIE_NAME = "minecraft_player_id";

export function setPlayerSession(playerId: string) {
  cookies().set(COOKIE_NAME, playerId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
    sameSite: "lax",
  });
}

export function getPlayerSession(): string | null {
  return cookies().get(COOKIE_NAME)?.value ?? null;
}

export function clearPlayerSession() {
  cookies().delete(COOKIE_NAME);
}
