"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Player = { id: string; pseudo: string } | null;

const PlayerContext = createContext<{
  player: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
  logout: () => void;
}>({
  player: undefined,
  setPlayer: () => {},
  logout: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player | undefined>(undefined);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setPlayer(data?.pseudo ? data : null))
      .catch(() => setPlayer(null));
  }, []);

  function logout() {
    fetch("/api/logout", { method: "POST" }).then(() => {
      setPlayer(null);
      window.location.href = "/";
    });
  }

  return (
    <PlayerContext.Provider value={{ player, setPlayer, logout }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
