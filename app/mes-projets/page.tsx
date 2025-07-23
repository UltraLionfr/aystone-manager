"use client";
import CopyCoords from "@/components/CopyCoords";
import FakeAd from "@/components/FakeAd";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import { useEffect, useState } from "react";

// Typage projet minimal
type Project = {
  id: string;
  coordsX: number;
  coordsY: number;
  coordsZ: number;
  tags: string;
  description: string;
  etat: string;
  createdAt: string;
  projet: string;
  monde?: string;
};

export default function MesProjetsPage() {
  const { player, logout } = usePlayer();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const TAG_COLORS: Record<string, string> = {
    usine: "bg-orange-600 text-orange-200",
    build: "bg-green-600 text-green-200",
    spawn: "bg-purple-700 text-purple-300",
  };

  useEffect(() => {
    if (!player) return;
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [player]);

  if (player === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-pulse text-center text-lg text-gray-400">Chargement…</div>
      </main>
    );
  }

  if (player === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">Veuillez vous connecter pour voir vos projets</p>
          <Link href="/ajouter" className="bg-blue-600 px-4 py-2 rounded-xl text-white font-bold hover:bg-blue-700">
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#101426] pb-16">
      <div className="flex flex-row justify-center relative max-w-[1600px] mx-auto">
        {/* PUB GAUCHE */}
        <aside className="hidden lg:block fixed left-6 top-32 z-10">
          <div className="sticky top-24">
            <FakeAd title="vendezvotreaypierre.fr" img="https://vendezvotreaypierre.fr/raceforgaza.png" />
          </div>
        </aside>

        {/* CONTENU CENTRAL */}
        <section className="flex-1 min-w-0 max-w-6xl mx-auto pt-8 px-2">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#FC3100" }}>
              Mes projets
            </h1>
            <div className="flex gap-4 items-center">
              <span className="text-emerald-300 font-semibold">{player.pseudo}</span>
              <button
                onClick={logout}
                className="bg-red-100 text-red-700 rounded-xl px-4 py-1 font-medium hover:bg-red-200 transition"
              >
                Déconnexion
              </button>
              <Link
                href="/ajouter"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition shadow"
              >
                Ajouter un projet
              </Link>
            </div>
          </div>

          <div className="rounded-3xl shadow-2xl bg-[#171c29] overflow-x-auto ring-1 ring-[#FC310022] backdrop-blur-md border border-[#23282e]">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-[#241f19] border-b border-[#23282e]">
                  <th className="p-4 font-bold text-[#FC3100]">État</th>
                  <th className="p-4 font-bold text-[#FC3100]">Monde</th>
                  <th className="p-4 font-bold text-[#FC3100]">Projet</th>
                  <th className="p-4 font-bold text-[#FC3100]">Description</th>
                  <th className="p-4 font-bold text-[#FC3100]">Coordonnées (X Y Z)</th>
                  <th className="p-4 font-bold text-[#FC3100]">Tags</th>
                  <th className="p-4 font-bold text-[#FC3100]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center p-10 text-gray-400 italic">
                      Chargement…
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-10 text-gray-400 italic">
                      Aucun projet encore ajouté.
                    </td>
                  </tr>
                ) : (
                  projects.map(p => (
                    <tr
                      key={p.id}
                      className="border-t border-[#23282e] hover:bg-[#23293b]/70 transition-colors group"
                    >
                      <td className="p-4">
                        <span
                          className={
                            "px-4 py-1 rounded-full text-xs font-bold transition bg-opacity-80 " +
                            (p.etat === "Terminé"
                              ? "bg-emerald-300 text-emerald-900"
                              : "bg-yellow-200 text-yellow-900")
                          }
                        >
                          {p.etat}
                        </span>
                      </td>
                      <td className="p-4">
                        {p.monde === "overworld" && (
                          <span className="bg-green-700/20 text-green-400 rounded-xl px-3 py-1 text-xs font-semibold">
                            Overworld
                          </span>
                        )}
                        {p.monde === "nether" && (
                          <span className="bg-orange-800/20 text-orange-400 rounded-xl px-3 py-1 text-xs font-semibold">
                            Nether
                          </span>
                        )}
                        {p.monde === "end" && (
                          <span className="bg-purple-900/20 text-purple-400 rounded-xl px-3 py-1 text-xs font-semibold">
                            End
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-medium text-gray-100">{p.projet}</td>
                      <td className="p-4 text-gray-300 whitespace-normal break-words max-w-[300px]">
                        {p.description}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <span className="tabular-nums text-gray-200 min-w-[120px]">
                            {p.coordsX} {p.coordsY} {p.coordsZ}
                          </span>
                          <CopyCoords coords={`${p.coordsX} ${p.coordsY} ${p.coordsZ}`} />
                        </div>
                      </td>
                      <td className="p-4 whitespace-normal">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.split(";").map(tag => {
                            const colorClass = TAG_COLORS[tag] || "bg-blue-900/60 text-blue-200";
                            return (
                              <span
                                key={tag}
                                className={`${colorClass} inline-block px-2 py-1 rounded-full text-xs hover:bg-opacity-80 transition`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/ajouter?id=${p.id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1 rounded-full text-xs transition"
                          title="Éditer le projet"
                        >
                          Éditer
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* PUB DROITE */}
        <aside className="hidden lg:block fixed right-6 top-32 z-1">
          <div className="sticky top-24">
            <FakeAd title="vendezvotreaypierre.fr" img="https://vendezvotreaypierre.fr/raceforgaza.png" />
          </div>
        </aside>
      </div>
    </main>
  );
}