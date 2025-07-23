"use client";
import CopyCoords from "@/components/CopyCoords";
import FakeAd from "@/components/FakeAd";
import { usePlayer } from "@/context/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  coordsX: number;
  coordsY: number;
  coordsZ: number;
  tags: string;
  description: string;
  etat: string;
  createdAt: string;
  player: { id: string; pseudo: string };
  projet: string;
  monde?: string;
};

export default function TablePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [etatFilter, setEtatFilter] = useState("");
  const [pseudoFilter, setPseudoFilter] = useState("");
  const [mondeFilter, setMondeFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { player } = usePlayer();

  const TAG_COLORS: Record<string, string> = {
    usine: "bg-orange-600 text-orange-200",
    build: "bg-green-600 text-green-200",
    spawn: "bg-purple-700 text-purple-300",
  };

  // Tags principaux pour filtre
  const MAIN_TAGS = ["usine", "spawn", "build"];

  useEffect(() => {
    setLoading(true);
    fetch("/api/all-projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter((p) => {
    const tagsArray = p.tags.split(";").map((t) => t.trim().toLowerCase());

    return (
      (pseudoFilter ? p.player.pseudo === pseudoFilter : true) &&
      (etatFilter ? p.etat === etatFilter : true) &&
      (mondeFilter ? p.monde === mondeFilter : true) &&
      (tagsFilter ? tagsArray.includes(tagsFilter) : true) &&
      (!search ||
        p.projet?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const pseudos = Array.from(new Set(projects.map((p) => p.player.pseudo)));
  const etats = Array.from(new Set(projects.map((p) => p.etat)));
  const mondes = Array.from(new Set(projects.map((p) => p.monde))).filter(Boolean) as string[];
  const tagsPresent = Array.from(
    new Set(
      projects
        .flatMap((p) => p.tags.split(";").map((t) => t.trim()))
        .filter((t) => MAIN_TAGS.includes(t))
    )
  );

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
        <motion.section
          className="flex-1 min-w-0 max-w-6xl mx-auto pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, type: "spring" }}
        >
          <div className="flex justify-center mb-8">
            <Image
              src="/aystone-saison2.png"
              alt="Aystone Saison 2"
              width={720}
              height={150}
              priority
              className="object-contain"
              
            />
          </div>

          <motion.h1
            className="text-4xl font-extrabold mb-7 tracking-tight"
            style={{
              color: "#FC3100",
              textShadow: "0 0 12px #FC310099,0 2px 0 #000",
              letterSpacing: "-1px",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Tableau des projets
          </motion.h1>

          {/* Filtres */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <input
              type="text"
              className="border border-[#23282e] bg-[#181e2c] text-gray-100 rounded-2xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-orange-500/40 transition"
              placeholder="Recherche projet ou description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border border-[#23282e] bg-[#181e2c] text-gray-100 rounded-2xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-orange-500/40 transition"
              value={pseudoFilter}
              onChange={(e) => setPseudoFilter(e.target.value)}
            >
              <option value="">Tous les joueurs</option>
              {pseudos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              className="border border-[#23282e] bg-[#181e2c] text-gray-100 rounded-2xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-orange-500/40 transition"
              value={etatFilter}
              onChange={(e) => setEtatFilter(e.target.value)}
            >
              <option value="">Tous les états</option>
              {etats.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>

            <select
              className="border border-[#23282e] bg-[#181e2c] text-gray-100 rounded-2xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-orange-500/40 transition"
              value={mondeFilter}
              onChange={(e) => setMondeFilter(e.target.value)}
            >
              <option value="">Tous les mondes</option>
              {mondes.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="border border-[#23282e] bg-[#181e2c] text-gray-100 rounded-2xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-orange-500/40 transition"
              value={tagsFilter}
              onChange={(e) => setTagsFilter(e.target.value)}
            >
              <option value="">Tous les tags</option>
              {tagsPresent.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setPseudoFilter("");
                setEtatFilter("");
                setSearch("");
                setMondeFilter("");
                setTagsFilter("");
              }}
              className="underline text-orange-500 hover:text-orange-400"
            >
              Réinitialiser
            </button>

            {player && (
              <Link
                href="/ajouter"
                className="ml-auto bg-[#FC3100] hover:bg-[#c22700] text-white px-6 py-2 rounded-full shadow font-bold transition"
                style={{ boxShadow: "0 2px 12px #fc310045" }}
              >
                + Ajouter un projet
              </Link>
            )}
          </motion.div>

          {/* Table moderne & animée */}
          <motion.div
            className="rounded-3xl shadow-2xl bg-[#171c29] overflow-x-auto ring-1 ring-[#FC310022] backdrop-blur-md border border-[#23282e]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-[#241f19] border-b border-[#23282e]">
                  <th className="p-4 font-bold text-[#FC3100]">Joueur</th>
                  <th className="p-4 font-bold text-[#FC3100]">État</th>
                  <th className="p-4 font-bold text-[#FC3100]">Monde</th>
                  <th className="p-4 font-bold text-[#FC3100]">Projet</th>
                  <th className="p-4 font-bold text-[#FC3100]">Description</th>
                  <th className="p-4 font-bold text-[#FC3100]">Coordonnées (X Y Z)</th>
                  <th className="p-4 font-bold text-[#FC3100]">Tags</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {loading ? (
                    [...Array(4)].map((_, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td colSpan={7} className="p-7">
                          <div className="h-7 bg-[#22262e] rounded-xl w-3/4 mx-auto animate-pulse" />
                        </td>
                      </motion.tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={7} className="text-center p-10 text-gray-500 italic">
                        Aucun projet
                      </td>
                    </motion.tr>
                  ) : (
                    filtered.map((p, i) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.32, delay: i * 0.04 }}
                        className="border-t border-[#23282e] hover:bg-[#23293b]/70 transition-colors group"
                      >
                        <td className="p-4 font-semibold text-gray-200">{p.player.pseudo}</td>
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
                        {/* Monde stylé */}
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
                        <td className="p-4 text-gray-300 whitespace-normal break-words max-w-[300px]">{p.description}</td>
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
                            {p.tags.split(";").map((tag) => {
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
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </motion.section>

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