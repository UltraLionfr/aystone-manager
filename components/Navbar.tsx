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

  const iconCls = "w-4 h-4 inline-block mr-1.5"; // +0.5 rem par rapport à v1

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101426]/95 backdrop-blur-md shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3.5">
        {/* Logo & Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 font-extrabold text-lg tracking-tight select-none"
        >
          <Image
            src="/aystone.png"
            alt="Logo Aystone"
            width={34}
            height={34}
            priority
          />
          <span className="text-red-600 relative font-extrabold flex items-center gap-0.5">
            Aystone
            <RedstoneParticles density={15} maxRadius={2} />
          </span>
          <span className="hidden sm:inline text-gray-400 ml-1 text-xl font-medium">
            Instance Cobble
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-4 font-medium text-[15px] text-amber-50">
          <li>
            <Link
              href="/a-propos"
              className="hover:text-emerald-400 flex items-center transition-colors"
            >
              <Info className={iconCls} /> À Propos
            </Link>
          </li>

          {player && (
            <>
              <li>
                <Link
                  href="/ajouter"
                  className="hover:text-orange-400 flex items-center transition-colors"
                >
                  <PlusCircle className={iconCls} /> Ajouter
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets"
                  className="hover:text-purple-400 flex items-center transition-colors"
                >
                  <Folder className={iconCls} /> Mes projets
                </Link>
              </li>
            </>
          )}

          <li>
            <a
              href="https://maps.aystone.fr/cobble/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center transition-colors"
            >
              <MapPin className={iconCls} /> BlueMap
            </a>
          </li>
        </ul>

        {/* Desktop user controls */}
        <div className="hidden md:flex items-center gap-3">
          {player ? (
            <>
              <span className="px-3 py-1 rounded-full bg-blue-200/80 text-blue-900 font-semibold shadow-sm border border-blue-300 truncate max-w-[120px] text-xs">
                {player.pseudo}
              </span>

              <Link
                href="/ajouter"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-xs font-semibold shadow transition"
                title="Dashboard"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 text-xs font-semibold shadow transition flex items-center gap-1"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/ajouter"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-xs font-bold shadow transition"
            >
              Se connecter
            </Link>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-gray-300 rounded-full" />
          <span className="block w-6 h-0.5 bg-gray-300 rounded-full" />
          <span className="block w-6 h-0.5 bg-gray-300 rounded-full" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden px-4 pb-6 space-y-3 font-medium text-[15px] bg-[#101426]/95 border-t shadow-lg backdrop-blur animate-in fade-in duration-200">
          <li>
            <Link
              href="/a-propos"
              className="block py-3 hover:text-emerald-400 flex items-center"
              onClick={() => setOpen(false)}
            >
              <Info className="w-4 h-4 mr-2" /> À Propos
            </Link>
          </li>
          {player && (
            <>
              <li>
                <Link
                  href="/ajouter"
                  className="block py-3 hover:text-orange-400 flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un projet
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-projets"
                  className="block py-3 hover:text-purple-400 flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <Folder className="w-4 h-4 mr-2" /> Mes projets
                </Link>
              </li>
            </>
          )}
          <li>
            <a
              href="https://maps.aystone.fr/cobble/"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 hover:text-blue-400 flex items-center"
              onClick={() => setOpen(false)}
            >
              <MapPin className="w-4 h-4 mr-2" /> BlueMap
            </a>
          </li>
          <li className="pt-3 border-t flex flex-col gap-2">
            {player ? (
              <>
                <span className="px-4 py-2 rounded-full bg-blue-200/80 text-blue-900 font-semibold border truncate text-xs">
                  {player.pseudo}
                </span>
                <Link
                  href="/ajouter"
                  className="bg-green-600 text-white rounded-full px-5 py-2 font-semibold shadow hover:bg-green-700 flex justify-center text-sm"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="bg-red-600 text-white rounded-full px-5 py-2 font-semibold shadow hover:bg-red-700 text-sm"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white rounded-full px-5 py-2 font-semibold shadow hover:bg-blue-700 text-sm"
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