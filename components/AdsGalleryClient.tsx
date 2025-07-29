"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ADS_COPY: Record<string, { title: string; subtitle: string }> = {
  "riseofkinkdom.jpeg": {
    title: "Atteignez 50 Millions d’Impuissance !",
    subtitle: "Rejoignez « Rise of Kink Doms » et dominez vos adversaires.",
  },
  "voat.png": {
    title: "Aymeric Pierre vend votre voiture !",
    subtitle: "Offre exclusive : 69,42 BTC, garantie World PvP Champion.",
  },
};

export default function AdsGalleryClient({ files }: { files: string[] }) {
  return (
    <main className="flex min-h-screen flex-col bg-[#0e0e10]">
      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10 text-3xl font-extrabold text-red-600"
        >
          Galerie des publicités
        </motion.h1>

        {files.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Aucune bannière trouvée dans{" "}
            <code className="text-sm">/public/ads</code>.
          </motion.p>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {files.map((file) => {
              const copy = ADS_COPY[file];
              return (
                <motion.li
                  key={file}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="overflow-hidden rounded-xl border border-[#1c2536] bg-[#0b1320] shadow"
                >
                  <div className="relative h-42 w-full">
                    <Image
                      src={`/ads/${file}`}
                      alt={file}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      priority
                    />
                  </div>

                  {copy && (
                    <div className="px-4 py-3 text-center">
                      <h2 className="text-[15px] font-bold leading-snug text-amber-100">
                        {copy.title.split(/(50 Millions)/).map((part, i) =>
                          part === "50 Millions" ? (
                            <span key={i} className="text-red-500">
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </h2>
                      <p className="mt-1 text-sm text-gray-300">
                        {copy.subtitle}
                      </p>
                    </div>
                  )}
                  <p className="truncate bg-[#0b1320] px-3 py-2 text-center text-xs text-gray-500">
                    {file}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </section>
    </main>
  );
}
