import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "var(--gradient-romantic)" }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 32 32">
          <path
            d="M16 28s-11-7.5-11-15a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7.5-11 15-11 15z"
            fill="oklch(0.78 0.18 350)"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
      <motion.p
        className="mt-6 font-display text-lg text-foreground/70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        Loading love…
      </motion.p>
    </motion.div>
  );
}
