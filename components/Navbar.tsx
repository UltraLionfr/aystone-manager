"use client";
import RedstoneParticles from "@/components/RedstoneParticles";
import { usePlayer } from "@/context/PlayerContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Folder, Info, LogOut, MapPin, PlusCircle } from "lucide-react";

export default function Navbar() {
  const { player, logout } = usePlayer();
  const [open, setOpen] = useState(false);

  const iconClass = "w-4 h-4 inline-block mr-2";

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101426] backdrop-blur-md shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 font-extrabold text-xl tracking-tight select-none">
          <Image src="/aystone.png" alt="Logo Aystone" width={38} height={38} priority />
          <span className="text-red-600 relative font-extrabold flex items-center gap-1">
            Aystone
            <RedstoneParticles density={20} maxRadius={2} />
          </span>
          <span className="text-gray-400 ml-1 text-sm font-medium">Instance Cobble</span>
        </Link>

        {/* Navigation links */}
        <ul className="hidden md:flex items-center gap-6 font-semibold text-base text-amber-50">
          <li>
            <Link href="/a-propos" className="hover:text-emerald-500 flex items-center transition-colors">
              <Info className={iconClass} />
              À Propos
            </Link>
          </li>
          {player && (
            <>
              <li>
                <Link href="/ajouter" className="hover:text-orange-500 flex items-center transition-colors">
                  <PlusCircle className={iconClass} />
                  Ajouter un projet
                </Link>
              </li>
              <li>
                <Link href="/mes-projets" className="hover:text-purple-500 flex items-center transition-colors">
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
              className="hover:text-blue-500 font-semibold flex items-center transition-colors"
            >
              <MapPin className={iconClass} />
              BlueMap
            </a>
          </li>
        </ul>

        {/* User controls */}
        <div className="hidden md:flex items-center gap-5">
          {player && (
            <>
              <span className="px-4 py-1 rounded-full bg-blue-200 text-blue-900 font-semibold shadow-sm border border-blue-300 truncate max-w-[140px]">
                {player.pseudo}
              </span>

              <Link
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 text-sm font-semibold shadow transition"
                title="Dashboard"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 text-sm font-semibold shadow transition"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4 inline-block mr-1" />
                Déconnexion
              </button>
            </>
          )}
          {!player && (
            <Link
              href="/ajouter"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-bold shadow transition"
            >
              Se connecter
            </Link>
          )}
        </div>

        {/* Mobile burger menu */}
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
        <ul className="md:hidden px-4 pb-6 space-y-3 font-medium bg-white/95 border-t shadow-lg backdrop-blur-xl animate-in fade-in duration-200">
          <li>
            <Link href="/" className="block py-3 hover:text-emerald-600 flex items-center" onClick={() => setOpen(false)}>
              <Info className="w-5 h-5 mr-2" />
              Explorer
            </Link>
          </li>
          {player && (
            <>
              <li>
                <Link href="/ajouter" className="block py-3 hover:text-orange-600 flex items-center" onClick={() => setOpen(false)}>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Ajouter un projet
                </Link>
              </li>
              <li>
                <Link href="/mes-projets" className="block py-3 hover:text-purple-600 flex items-center" onClick={() => setOpen(false)}>
                  <Folder className="w-5 h-5 mr-2" />
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
              className="block py-3 hover:text-blue-600 font-semibold flex items-center"
              onClick={() => setOpen(false)}
            >
              <MapPin className="w-5 h-5 mr-2" />
              BlueMap
            </a>
          </li>
          <li className="pt-3 border-t flex flex-col gap-3">
            {player ? (
              <>
                <span className="px-4 py-2 rounded-full bg-blue-200 text-blue-900 font-semibold border truncate">
                  {player.pseudo}
                </span>
                <Link
                  href="/dashboard"
                  className="bg-green-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-green-700 flex justify-center"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="bg-red-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-red-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700"
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
