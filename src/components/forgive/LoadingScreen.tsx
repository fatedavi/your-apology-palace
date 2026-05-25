import { motion } from "framer-motion";
import { CapooLove } from "./icons";

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
        <CapooLove size={160} />
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
