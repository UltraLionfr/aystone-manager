"use client";
import RedstoneParticles from "@/components/RedstoneParticles";
import { usePlayer } from "@/context/PlayerContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Import des icônes Lucide React
import { Folder, Info, LogOut, MapPin, PlusCircle } from "lucide-react";

export default function Navbar() {
  const { player, logout } = usePlayer();
  const [open, setOpen] = useState(false);

  // Classe commune pour icônes
  const iconClass = "w-4 h-4 inline-block mr-1 align-text-bottom";

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101426] backdrop-blur-md shadow-md transition">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo modern */}
        <Link href="/" className="flex items-center gap-3 font-extrabold text-xl tracking-tight">
          <Image src="/aystone.png" alt="Logo Aystone" width={38} height={38} priority />
          <span className="relative text-red-600 font-extrabold" style={{ display: "inline-block" }}>
            Aystone
            <RedstoneParticles density={20} maxRadius={2} />
          </span>
          <span style={{ color: "#6B7280", marginLeft: 4 }}>Instance Cobble</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-base text-amber-50">
          <li>
            <Link href="/a-propos" className="hover:text-emerald-600 transition-colors flex items-center">
              <Info className={iconClass} />
              À Propos
            </Link>
          </li>
          {player && (
            <>
              <li>
                <Link href="/ajouter" className="hover:text-orange-600 transition-colors flex items-center">
                  <PlusCircle className={iconClass} />
                  Ajouter un projet
                </Link>
              </li>
              <li>
                <Link href="/mes-projets" className="hover:text-purple-600 transition-colors flex items-center">
                  <Folder className={iconClass} />
                  Mes projets
                </Link>
              </li>
            </>
          )}
          <li>
            <a
              href="https://maps.aystone.fr/cobble/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors font-semibold flex items-center"
            >
              <MapPin className={iconClass} />
              BlueMap
            </a>
          </li>
        </ul>

        {/* User section */}
        <div className="hidden md:flex items-center gap-3">
  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-semibold shadow-sm border border-blue-300 truncate max-w-[120px]">
    {player.pseudo}
  </span>
  <Link
    href="/dashboard"
    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-1 text-sm font-semibold shadow"
    title="Dashboard"
  >
    Dashboard
  </Link>
  <button
    onClick={logout}
    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-1 text-sm font-semibold shadow"
    title="Déconnexion"
  >
    Déconnexion
  </button>
</div>


        {/* Burger menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="w-6 h-0.5 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-0.5 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-0.5 bg-gray-700 rounded-full"></div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden px-4 pb-6 space-y-2 font-medium bg-white/95 border-t shadow-lg backdrop-blur-xl animate-in fade-in duration-200">
          <li>
            <Link href="/" className="block py-2 hover:text-emerald-600 flex items-center" onClick={() => setOpen(false)}>
              <Info className="w-4 h-4 mr-1" />
              Explorer
            </Link>
          </li>
          {player && (
            <>
              <li>
                <Link href="/ajouter" className="block py-2 hover:text-orange-600 flex items-center" onClick={() => setOpen(false)}>
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Ajouter un projet
                </Link>
              </li>
              <li>
                <Link href="/mes-projets" className="block py-2 hover:text-purple-600 flex items-center" onClick={() => setOpen(false)}>
                  <Folder className="w-4 h-4 mr-1" />
                  Mes projets
                </Link>
              </li>
            </>
          )}
          <li>
            <a
              href="https://maps.aystone.fr/cobble/"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 hover:text-blue-400 font-semibold flex items-center"
              onClick={() => setOpen(false)}
            >
              <MapPin className="w-4 h-4 mr-1" />
              BlueMap
            </a>
          </li>
          <li className="pt-2 border-t flex items-center gap-2">
            {player ? (
              <>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold border">{player.pseudo}</span>
                <Link
                  href="/dashboard"
                  className="bg-green-600 text-white rounded-xl px-5 py-1.5 font-bold shadow hover:bg-green-700 flex items-center gap-1"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="bg-red-500/10 text-red-600 rounded-xl px-4 py-1 hover:bg-red-500/20 shadow flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white rounded-xl px-5 py-1.5 font-bold shadow hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Se connecter
              </Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
