"use client";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0f1f] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl mx-auto space-y-6">
        {/* Ghost icon animation */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10"
        >
          <Ghost className="w-10 h-10 text-blue-500" />
        </motion.div>

        {/* 404 Code */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white"
        >
          404
        </motion.h1>

        {/* Title & description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Page introuvable</h2>
          <p className="text-gray-400">
            Oups, cette page n'existe pas ou a été déplacée. Revenez à l’accueil pour continuer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}