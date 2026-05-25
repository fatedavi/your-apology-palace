import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RunawayButton } from "./RunawayButton";
import { TypingText } from "./TypingText";
import { CapooFlower, CapooLove, HeartIcon, HeartOutlineIcon } from "./icons";

export function SceneQuestion({
  name,
  onYes,
}: {
  name: string;
  onYes: () => void;
}) {
  const [subtitleReady, setSubtitleReady] = useState(false);
  const [easter, setEaster] = useState<{ id: number; x: number; y: number }[]>([]);

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
      exit={{ opacity: 0, scale: 1.25, y: 120, filter: "blur(30px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <CapooFlower size={140} />
      </motion.div>

      <div className="w-full max-w-2xl px-2 sm:px-0">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-5xl">
          <span className="text-gradient">{name}</span>
          <TypingText text={`, kamu mau maafin aku ga?`} speed={55} onDone={() => setSubtitleReady(true)} />
        </h2>
        {subtitleReady && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-sm text-muted-foreground sm:mt-5 sm:text-lg"
          >
            Aku janji ga ngulangin lagi… mungkin
          </motion.p>
        )}
      </div>

      <div className="relative mt-10 h-56 w-full max-w-2xl sm:mt-12 sm:h-72">
        <motion.button
          type="button"
          onClick={onYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          className="glow-btn absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl px-8 py-3.5 font-display text-lg font-semibold sm:px-10 sm:py-4 sm:text-xl"
        >
          Iya <CapooLove size={32} />
        </motion.button>

        <RunawayButton />

        {easter.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.3, y: -120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="pointer-events-none absolute text-primary"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <CapooLove size={40} />
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/70 sm:mt-8">
        psst… coba ketik <span className="font-semibold">"love"</span>
      </p>
    </motion.div>
  );
}
