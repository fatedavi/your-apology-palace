import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RunawayButton } from "./RunawayButton";
import { TypingText } from "./TypingText";

export function SceneQuestion({
  name,
  onYes,
}: {
  name: string;
  onYes: () => void;
}) {
  const [subtitleReady, setSubtitleReady] = useState(false);
  const [easter, setEaster] = useState<{ id: number; x: number; y: number }[]>([]);

  // easter egg: type "love"
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      buf = (buf + e.key.toLowerCase()).slice(-8);
      if (buf.includes("love")) {
        const burst = Array.from({ length: 14 }).map((_, i) => ({
          id: Date.now() + i,
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        }));
        setEaster(burst);
        setTimeout(() => setEaster([]), 2000);
        buf = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.div
      key="question"
      initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{
        opacity: 0,
        scale: 1.25,
        y: 120,
        filter: "blur(30px)",
      }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-foreground sm:text-5xl">
          <span className="text-gradient">{name}</span>
          <TypingText text={`, kamu mau maafin aku ga? 🥺`} speed={55} onDone={() => setSubtitleReady(true)} />
        </h2>
        {subtitleReady && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-base text-muted-foreground sm:text-lg"
          >
            Aku janji ga ngulangin lagi… mungkin 😔
          </motion.p>
        )}
      </div>

      {/* Buttons area */}
      <div className="relative mt-12 h-64 w-full max-w-2xl sm:h-72">
        <motion.button
          type="button"
          onClick={onYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          className="glow-btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-10 py-4 font-display text-xl font-semibold"
        >
          Iya 🤍
        </motion.button>

        <RunawayButton />

        {easter.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.3, y: -120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="pointer-events-none absolute text-3xl"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            🤍
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground/70">
        psst… coba ketik <span className="font-semibold">"love"</span> ✨
      </p>
    </motion.div>
  );
}
