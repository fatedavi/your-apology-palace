import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { TypingText } from "./TypingText";
import { GiftBox } from "./GiftBox";
import { CapooHappy, CapooLove, CapooFlower, HeartIcon, SparkleIcon } from "./icons";

const FLOATERS = [CapooLove, CapooFlower, CapooHappy, HeartIcon, SparkleIcon];
const HUES = ["text-primary", "text-accent", "text-rose-soft", "text-peach"];

function useFloaterConfig(count: number) {
  const config = useRef<{ left: number; delay: number; duration: number; size: number; iconIdx: number; hueIdx: number }[] | null>(null);
  if (!config.current) {
    config.current = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 6,
      size: 30 + Math.floor(Math.random() * 20),
      iconIdx: Math.floor(Math.random() * FLOATERS.length),
      hueIdx: Math.floor(Math.random() * HUES.length),
    }));
  }
  return config.current;
}

export function SceneFinal({ name }: { name: string }) {
  const [line2, setLine2] = useState(false);
  const floaters = useFloaterConfig(18);

  useEffect(() => {
    document.body.classList.add("warm-bg");
    const fire = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 40,
        origin,
        colors: ["#ffb3d1", "#ffd6e7", "#e0b3ff", "#ffd9b3", "#ffffff"],
      });
    fire({ x: 0.2, y: 0.4 });
    fire({ x: 0.8, y: 0.4 });
    setTimeout(() => fire({ x: 0.5, y: 0.3 }), 400);

    return () => {
      document.body.classList.remove("warm-bg");
    };
  }, []);

  return (
    <motion.div
      key="final"
      initial={{ opacity: 0, scale: 0.85, y: -80, filter: "blur(30px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4"
      >
        <CapooHappy size={160} />
      </motion.div>

      <h1 className="w-full max-w-xl font-display text-2xl font-semibold sm:text-5xl">
        <TypingText
          text={`Makasih udah mau maafin aku, ${name}`}
          speed={55}
          onDone={() => setLine2(true)}
        />
      </h1>

      {line2 && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-display text-lg text-foreground/80 sm:mt-5 sm:text-2xl"
        >
          Kamu emang paling baik sedunia
        </motion.p>
      )}

      <GiftBox name={name} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floaters.map((f, i) => {
          const Icon = FLOATERS[f.iconIdx];
          return (
            <motion.span
              key={i}
              initial={{ y: "100vh", opacity: 0, rotate: 0 }}
              animate={{ y: "-20vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{
                duration: f.duration,
                delay: f.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute ${HUES[f.hueIdx]}`}
              style={{ left: `${f.left}%` }}
            >
              <Icon size={f.size} />
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}
