import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { HeartIcon, HeartOutlineIcon, SparkleIcon, GiftIcon } from "./icons";

const BURST = [HeartIcon, HeartOutlineIcon, SparkleIcon, HeartIcon];

export function GiftBox({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#ffb3d1", "#ffd6e7", "#e0b3ff", "#ffd9b3", "#ffffff"],
      shapes: ["circle"],
    });
  };

  return (
    <div className="relative mx-auto mt-10 flex flex-col items-center">
      <motion.button
        type="button"
        onClick={handleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -8, 0] }}
        transition={{ y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
        className="relative text-primary"
        aria-label="Buka kado"
      >
        <GiftIcon size={120} className="drop-shadow-[0_10px_30px_rgba(255,120,170,0.45)]" />

        <AnimatePresence>
          {open &&
            Array.from({ length: 8 }).map((_, i) => {
              const Icon = BURST[i % BURST.length];
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -120 - Math.random() * 60,
                    x: (i - 4) * 18 + (Math.random() - 0.5) * 20,
                    scale: 1.2,
                  }}
                  transition={{ duration: 1.8 + Math.random() * 0.6, ease: "easeOut" }}
                  className="pointer-events-none absolute left-1/2 top-6 text-primary"
                >
                  <Icon size={24} />
                </motion.span>
              );
            })}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass mt-8 max-w-sm rounded-2xl p-6 text-left"
          >
            <p className="font-display text-sm uppercase tracking-wider text-primary">
              Surat kecil untuk {name}
            </p>
            <p className="mt-2 font-display text-lg leading-relaxed text-foreground">
              Makasih udah jadi orang paling sabar di hidupku. Aku sayang kamu,
              hari ini dan besoknya juga.
            </p>
            <p className="mt-3 flex items-center justify-end gap-1 text-sm text-muted-foreground">
              — aku <HeartIcon size={14} className="text-primary" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <p className="mt-3 text-sm text-muted-foreground">klik kadonya ya</p>
      )}
    </div>
  );
}
