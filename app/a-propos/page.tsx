"use client";
import FakeAd from "@/components/FakeAd";
import { motion } from "framer-motion";

const TAG_LEGEND = [
  { tag: "usine", label: "Usine", color: "bg-orange-600 text-orange-200" },
  { tag: "build", label: "Build", color: "bg-green-600 text-green-200" },
  { tag: "spawn", label: "Spawn", color: "bg-purple-700 text-purple-300" },
];

export default function AProposPage() {
  return (
    <main className="relative min-h-screen bg-[#101426] text-gray-200 py-12 px-4 max-w-6xl mx-auto">
      {/* PUB GAUCHE */}
      <aside className="hidden lg:block fixed left-6 top-32 z-10">
        <div className="sticky top-24">
          <FakeAd title="vendezvotreaypierre.fr" img="https://vendezvotreaypierre.fr/raceforgaza.png" />
        </div>
      </aside>

      {/* PUB DROITE */}
      <aside className="hidden lg:block fixed right-6 top-32 z-10">
        <div className="sticky top-24">
          <FakeAd title="vendezvotreaypierre.fr" img="https://vendezvotreaypierre.fr/raceforgaza.png" />
        </div>
      </aside>

      <motion.h1
        className="text-4xl font-extrabold mb-8 tracking-tight"
        style={{
          color: "#FC3100",
          textShadow: "0 0 12px #FC310099,0 2px 0 #000",
          letterSpacing: "-1px",
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        À propos
      </motion.h1>

      <motion.div
        className="prose prose-invert max-w-none text-lg leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <p>
          Ce petit site est une application de gestion de projets Minecraft, pensée spécialement pour la communauté du serveur <strong>Aystone</strong>. <br />
          Il permet aux joueurs d’ajouter, modifier et suivre leurs projets dans différents mondes :{" "}
          <span className="bg-green-700/20 text-green-400 rounded-xl px-2 py-1 text-xs font-semibold">Overworld</span>,{" "}
          <span className="bg-orange-800/20 text-orange-400 rounded-xl px-2 py-1 text-xs font-semibold">Nether</span> et{" "}
          <span className="bg-purple-900/20 text-purple-400 rounded-xl px-2 py-1 text-xs font-semibold">End</span>.
        </p><br />
        <p>
          Le tableau est organisé de manière simple : il affiche le nom du joueur, l’état du projet, le monde où le projet se situe, le nom du projet, une description succincte, les coordonnées ainsi que les tags personnalisés.  
          L’interface est conçue pour être intuitive et réactive, facilitant la gestion et le suivi des projets de tous le monde.
        </p><br />
        <p>
          Ce projet utilise <strong>Next.js</strong> avec <strong>React 18</strong>, <strong>Tailwind CSS</strong> pour le design, et un contexte React pour gérer la connexion des joueurs.
          Les animations sont réalisées avec <strong>Framer Motion</strong>.
        </p>
        <p><br />
          Pour accéder au dashboard et ajouter un projet, il suffit de renseigner son pseudo Minecraft. Aucun mot de passe ni token n’est stocké ou demandé, garantissant ainsi la simplicité et la confidentialité de l’accès.
        </p>
        <p>
          Si vous avez des suggestions ou souhaitez contribuer, n’hésitez pas à me contacter.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Légende des tags</h2>
          <div className="flex flex-wrap gap-4">
            {TAG_LEGEND.map(({ tag, label, color }) => (
              <span
                key={tag}
                className={`${color} px-3 py-1 rounded-full text-sm font-semibold`}
              >
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Code source</h2>
          <p>
            Le code source de ce projet est disponible sur{" "}
            <a
              href="https://github.com/UltraLionfr/aystone-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-400 hover:text-orange-600 transition"
            >
              GitHub
            </a>.
          </p>
          <p>
            Le projet est démarré sur une instance <strong>Coolify</strong>.
          </p>
        </section>
      </motion.div>
    </main>
  );
}