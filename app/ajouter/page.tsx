"use client";
import LoginForm from "@/components/LoginForm";
import ProjectsBoard from "@/components/ProjectsBoard";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";

function PageContent() {
  const { player, logout } = usePlayer();

  if (player === undefined) {
    // Chargement en attente
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#101426] text-white">
        <p className="text-gray-400 animate-pulse">Chargement…</p>
      </main>
    );
  }

  if (!player) {
    // Pas connecté - écran de login simple et centré
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#101426] px-4">
        <h1
          className="text-3xl font-extrabold mb-6"
          style={{ color: "#FC3100", textShadow: "0 0 12px #FC310099" }}
        >
          Connexion requise
        </h1>
        <div className="w-full max-w-md bg-[#171c29] rounded-3xl p-6 shadow-2xl border border-[#23282e]">
          <LoginForm />
        </div>
      </main>
    );
  }

  // Connecté : affichage du tableau dans un container stylé
  return (
    <main className="min-h-screen bg-[#101426] pb-16">
      <section className="max-w-6xl mx-auto pt-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-4xl font-extrabold"
            style={{ color: "#FC3100", textShadow: "0 0 12px #FC310099" }}
          >
            Ajouter un projet Minecraft
          </h1>
          <div className="flex items-center gap-4 text-white">
            <span className="font-semibold">{player.pseudo}</span>
            <button
              onClick={logout}
              className="bg-red-700 hover:bg-red-800 rounded-xl px-4 py-1 font-medium transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="bg-[#171c29] rounded-3xl p-6 shadow-2xl border border-[#23282e]">
          <ProjectsBoard />
        </div>
      </section>
    </main>
  );
}

export default function AjouterPage() {
  return (
    <PlayerProvider>
      <PageContent />
    </PlayerProvider>
  );
}
