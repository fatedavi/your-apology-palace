import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { TypingText } from "./TypingText";
import { GiftBox } from "./GiftBox";
import { BowIcon, FaceHappyTearIcon, FlowerIcon, HeartIcon, HeartOutlineIcon, SparkleIcon, TeddyIcon } from "./icons";

const FLOATERS = [HeartIcon, HeartOutlineIcon, SparkleIcon, FlowerIcon, TeddyIcon, BowIcon];

export function SceneFinal({ name }: { name: string }) {
  const [line2, setLine2] = useState(false);

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
        <FaceHappyTearIcon size={72} />
      </motion.div>

      <h1 className="font-display text-3xl font-semibold sm:text-5xl">
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
          className="mt-5 font-display text-xl text-foreground/80 sm:text-2xl"
        >
          Kamu emang paling baik sedunia
        </motion.p>
      )}

      <GiftBox name={name} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => {
          const Icon = FLOATERS[i % FLOATERS.length];
          const hues = ["text-primary", "text-accent", "text-rose-soft", "text-peach"];
          return (
            <motion.span
              key={i}
              initial={{ y: "100vh", opacity: 0, rotate: 0 }}
              animate={{ y: "-20vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{
                duration: 8 + Math.random() * 6,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute ${hues[i % hues.length]}`}
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Icon size={22 + Math.floor(Math.random() * 10)} />
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}
