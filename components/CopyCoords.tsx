"use client";
import { useToast } from "@/components/ToastProvider";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function CopyCoords({ coords }: { coords: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coords);
    setCopied(true);
    toast("Coordonnées copiées !");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      type="button"
      className="ml-2 inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-950 p-2 shadow hover:bg-zinc-800 active:scale-95 transition"
      onClick={handleCopy}
      title="Copier les coordonnées"
      aria-label="Copier"
    >
      <Copy size={18} className={copied ? "text-emerald-400" : "text-zinc-300"} />
    </button>
  );
}
