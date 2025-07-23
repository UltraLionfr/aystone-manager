"use client";
import { useState } from "react";

type TagSelectorProps = {
  value: string[]; // tags sélectionnés
  onChange: (tags: string[]) => void;
  allowCustom?: boolean; // option pour créer un tag perso
};

const defaultTags = ["usine", "build", "spawn"];

export default function TagSelector({ value, onChange, allowCustom = false }: TagSelectorProps) {
  const [customTag, setCustomTag] = useState("");

  // Ajoute un tag personnalisé si pas vide et pas déjà présent
  const addCustomTag = () => {
    const tag = customTag.trim().toLowerCase();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
      setCustomTag("");
    }
  };

  // Gestion sélection/désélection tags
  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter(t => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {defaultTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${value.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}
              hover:bg-blue-500 hover:text-white transition`}
          >
            {tag}
          </button>
        ))}
        {/* Affiche aussi les tags perso sélectionnés (non par défaut) */}
        {value.filter(t => !defaultTags.includes(t)).map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition"
          >
            {tag} &times;
          </button>
        ))}
      </div>

      {allowCustom && (
        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={e => setCustomTag(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomTag();
              }
            }}
            placeholder="Ajouter un tag personnalisé"
            className="flex-1 px-3 py-1 rounded border border-gray-300"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
}