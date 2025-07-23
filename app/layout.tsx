import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ToastProvider";
import { PlayerProvider } from "@/context/PlayerContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AyStone Instance Cobble",
  description: "Ce petit site est une application de gestion de projets Minecraft, pensée spécialement pour la communauté du serveur Aystone.",
  icons: {
    icon: "/aystone.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#101426] min-h-screen flex flex-col">
        <PlayerProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </ToastProvider>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
