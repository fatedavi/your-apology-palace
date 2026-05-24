import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

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
        className="relative"
        aria-label="Buka kado"
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* box body */}
          <motion.rect
            x="15"
            y="50"
            width="90"
            height="60"
            rx="6"
            fill="oklch(0.82 0.14 350)"
            stroke="white"
            strokeWidth="2"
          />
          {/* vertical ribbon body */}
          <rect x="55" y="50" width="10" height="60" fill="oklch(0.95 0.05 50)" />
          {/* lid */}
          <motion.g
            initial={false}
            animate={open ? { y: -40, rotate: -12 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "60px 50px" }}
          >
            <rect
              x="10"
              y="38"
              width="100"
              height="18"
              rx="4"
              fill="oklch(0.78 0.15 340)"
              stroke="white"
              strokeWidth="2"
            />
            <rect x="55" y="38" width="10" height="18" fill="oklch(0.95 0.05 50)" />
            {/* bow */}
            <circle cx="50" cy="34" r="10" fill="oklch(0.95 0.05 50)" />
            <circle cx="70" cy="34" r="10" fill="oklch(0.95 0.05 50)" />
            <circle cx="60" cy="36" r="5" fill="oklch(0.82 0.14 350)" />
          </motion.g>
        </svg>

        {/* flying hearts */}
        <AnimatePresence>
          {open &&
            Array.from({ length: 8 }).map((_, i) => (
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
                className="pointer-events-none absolute left-1/2 top-12 text-2xl"
              >
                {["🤍", "💕", "💖", "✨"][i % 4]}
              </motion.span>
            ))}
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
              hari ini dan besoknya juga 🤍
            </p>
            <p className="mt-3 text-right text-sm text-muted-foreground">— aku 🥹</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <p className="mt-3 text-sm text-muted-foreground">klik kadonya ya 🎁</p>
      )}
    </div>
  );
}
