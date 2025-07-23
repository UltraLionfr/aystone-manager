"use client";
import { usePlayer } from "@/context/PlayerContext";
import { useState } from "react";

export default function LoginForm() {
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const { setPlayer } = usePlayer();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo }),
    });

    if (res.ok) {
      const data = await res.json();
      setPlayer(data);
      setPseudo("");
    } else {
      const err = await res.json();
      setError(err.error || "Erreur");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Connexion Minecraft</h2>
      <input
        className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none"
        type="text"
        placeholder="Pseudo Minecraft"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        required
        minLength={3}
      />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 text-white font-bold py-2 hover:bg-blue-700"
      >
        Se connecter
      </button>
    </form>
  );
}
