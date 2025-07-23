"use client";
import { usePlayer } from "@/context/PlayerContext";
import React, { useEffect, useState } from "react";

type Project = {
  id: string;
  coordsX: number;
  coordsY: number;
  coordsZ: number;
  tags: string;
  description: string;
  etat?: string;
  projet?: string;
  monde?: string;
  createdAt: string;
  playerId?: string;
};

const MONDES = [
  { value: "overworld", label: "Overworld" },
  { value: "nether", label: "Nether" },
  { value: "end", label: "End" },
];

const DEFAULT_TAGS = ["usine", "build", "spawn"];

const TAG_COLORS: Record<string, string> = {
  usine: "bg-orange-200 text-orange-900",
  build: "bg-green-200 text-green-900",
  spawn: "bg-purple-200 text-purple-900",
};

export default function ProjectsBoard() {
  const { player, logout } = usePlayer();
  const [projects, setProjects] = useState<Project[]>([]);
  const [coords, setCoords] = useState({ x: "", y: "", z: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [etat, setEtat] = useState("En cours");
  const [projet, setProjet] = useState("");
  const [monde, setMonde] = useState("overworld");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);

  // Charge les projets du joueur connecté
  useEffect(() => {
    if (player) {
      fetch("/api/projects")
        .then((r) => r.json())
        .then((data) => {
          setProjects(Array.isArray(data) ? data : []);
          setLoading(false);
        });
    }
  }, [player]);

  // Préremplissage du formulaire pour édition
  useEffect(() => {
    if (editing) {
      setCoords({
        x: editing.coordsX.toString(),
        y: editing.coordsY.toString(),
        z: editing.coordsZ.toString(),
      });
      setTags(editing.tags.split(";").filter(Boolean));
      setDescription(editing.description);
      setEtat(editing.etat || "En cours");
      setProjet(editing.projet || "");
      setMonde(editing.monde || "overworld");
    } else {
      // Reset form
      setCoords({ x: "", y: "", z: "" });
      setTags([]);
      setDescription("");
      setEtat("En cours");
      setProjet("");
      setMonde("overworld");
    }
  }, [editing]);

  // Ajoute un tag
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  // Retire un tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Ajout ou édition de projet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!coords.x || !coords.y || !coords.z) return setError("Toutes les coordonnées sont requises.");
    if (tags.length < 1) return setError("Ajoutez au moins un tag (max 5).");
    if (!description.trim()) return setError("La description est requise.");
    if (!projet.trim()) return setError("Le nom du projet est requis.");
    if (!monde || !["overworld", "nether", "end"].includes(monde))
      return setError("Choisissez un monde valide.");

    const payload = {
      coordsX: Number(coords.x),
      coordsY: Number(coords.y),
      coordsZ: Number(coords.z),
      tags,
      description: description.trim(),
      etat,
      projet: projet.trim(),
      monde,
    };

    if (editing) {
      const res = await fetch(`/api/projects/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const proj = await res.json();
        setProjects(projects.map((p) => (p.id === editing.id ? proj : p)));
        setEditing(null);
      } else {
        let err = {};
        try {
          err = await res.json();
        } catch {}
        setError((err as any).error || "Erreur lors de la modification.");
      }
    } else {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const proj = await res.json();
        setProjects([proj, ...projects]);
        setCoords({ x: "", y: "", z: "" });
        setTags([]);
        setDescription("");
        setEtat("En cours");
        setProjet("");
        setMonde("overworld");
      } else {
        let err = {};
        try {
          err = await res.json();
        } catch {}
        setError((err as any).error || "Erreur lors de l'ajout.");
      }
    }
  };

  // Supprime un projet
  async function confirmDelete(id: string) {
    if (!window.confirm("Confirmer la suppression du projet ?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p.id !== id));
      if (editing?.id === id) setEditing(null);
    } else {
      alert("Erreur lors de la suppression.");
    }
  }

  // Lance édition
  function startEdit(project: Project) {
    setEditing(project);
  }

  // Annuler édition
  function cancelEdit() {
    setEditing(null);
  }

  if (!player) return null;

  return (
    <main className="w-full min-h-screen bg-[#101426] flex flex-col items-center py-8 text-gray-200">

      <div className="w-full max-w-xl bg-[#171c29] rounded-2xl shadow-2xl border border-[#23282e] p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-orange-400">
          {editing ? "Modifier mon projet" : "Ajouter un projet Minecraft"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
            type="text"
            placeholder="Nom du projet"
            value={projet}
            onChange={(e) => setProjet(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <input
              type="number"
              name="x"
              value={coords.x}
              onChange={(e) => setCoords({ ...coords, x: e.target.value })}
              className="w-1/3 p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
              placeholder="X"
              required
            />
            <input
              type="number"
              name="y"
              value={coords.y}
              onChange={(e) => setCoords({ ...coords, y: e.target.value })}
              className="w-1/3 p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
              placeholder="Y"
              required
            />
            <input
              type="number"
              name="z"
              value={coords.z}
              onChange={(e) => setCoords({ ...coords, z: e.target.value })}
              className="w-1/3 p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
              placeholder="Z"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Tags (max 5)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => {
                const colorClass = TAG_COLORS[tag] || "bg-blue-700 text-blue-300";
                return (
                  <span
                    key={tag}
                    className={`flex items-center px-3 py-1 rounded-full text-sm ${colorClass}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-400 hover:text-red-500 font-bold"
                      aria-label={`Supprimer ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <select
              defaultValue=""
              className="w-full p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100 mb-2"
              onChange={(e) => {
                const val = e.target.value;
                if (val && !tags.includes(val) && tags.length < 5) {
                  setTags([...tags, val]);
                }
                e.target.selectedIndex = 0;
              }}
            >
              <option value="" className="text-gray-600">
                Choisir un tag pré-défini
              </option>
              {DEFAULT_TAGS.filter((t) => !tags.includes(t)).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
                placeholder="Ajouter un tag personnalisé"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const newTag = tagInput.trim();
                    if (newTag && !tags.includes(newTag) && tags.length < 5) {
                      setTags([...tags, newTag]);
                      setTagInput("");
                    }
                  }
                }}
                maxLength={20}
                disabled={tags.length >= 5}
              />
              <button
                type="button"
                onClick={() => {
                  const newTag = tagInput.trim();
                  if (newTag && !tags.includes(newTag) && tags.length < 5) {
                    setTags([...tags, newTag]);
                    setTagInput("");
                  }
                }}
                className="rounded-xl px-3 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
                disabled={!tagInput.trim() || tags.length >= 5}
              >
                Ajouter
              </button>
            </div>
          </div>

          <textarea
            className="w-full p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100 resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du projet"
            required
            maxLength={500}
          />
          <div>
            <label className="block mb-1 text-gray-300">État du projet</label>
            <select
              className="w-full p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
              required
            >
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Monde</label>
            <select
              className="w-full p-2 rounded-xl border border-[#23282e] bg-[#101426] text-gray-100"
              value={monde}
              onChange={(e) => setMonde(e.target.value)}
              required
            >
              {MONDES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-green-600 text-white font-bold py-3 mt-2 hover:bg-green-700"
            >
              {editing ? "Enregistrer les modifications" : "Ajouter le projet"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 rounded-2xl bg-gray-700 text-gray-200 font-bold py-3 mt-2 hover:bg-gray-600"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des projets */}
      <section className="w-full max-w-3xl px-4">
        {loading ? (
          <div className="text-center text-gray-400">Chargement...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500">Aucun projet ajouté pour le moment.</div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-[#171c29] shadow-lg rounded-2xl p-5 flex flex-col gap-2 border border-[#23282e]"
              >
                <div className="flex flex-wrap gap-2">
                  {p.tags.split(";").map((t) => (
                    <span
                      key={t}
                      className="bg-blue-700 text-blue-300 px-2 py-1 rounded-full text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="font-semibold text-gray-100">{p.projet}</div>
                <div className="text-gray-400 text-sm">
                  <span className="font-medium">Coordonnées :</span> X={p.coordsX} Y={p.coordsY} Z={p.coordsZ}
                </div>
                <div className="text-gray-500 text-xs">
                  Monde : {MONDES.find((m) => m.value === p.monde)?.label ?? p.monde}
                </div>
                <div className="text-gray-300 whitespace-normal break-words max-w-[300px]">{p.description}</div>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={
                      p.etat === "Terminé"
                        ? "bg-green-600 text-green-200 rounded-full px-3 py-1 text-xs"
                        : "bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-xs"
                    }
                  >
                    {p.etat || "En cours"}
                  </span>
                  {p.playerId === player.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 text-black text-xs"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => confirmDelete(p.id)}
                        className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-black text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
