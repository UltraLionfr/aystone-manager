"use client";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#10121c] border-t border-[#23282e] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2 text-gray-400 text-sm">
        <div>
          &copy; {new Date().getFullYear()} Aystone Instance Cobble — Projet non affilié à Mojang/Microsoft
        </div>
        <div className="flex items-center gap-1">
          Réalisé avec <Heart className="w-4 h-4 text-red-400" />
          par{" "}
          <Link
            href="https://ultralion.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition underline"
          >
            UltraLion
          </Link>
        </div>
      </div>
    </footer>
  );
}
