import { motion } from "framer-motion";
import { useState } from "react";

export function SceneName({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <motion.div
      key="name"
      initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.08, y: -40, filter: "blur(20px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen items-center justify-center px-4"
    >
      <form
        onSubmit={submit}
        className="glass w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-5xl"
        >
          🤍
        </motion.div>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Masukin nama kamu dulu ya
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Biar aku bisa minta maaf langsung ke kamu 🥺
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kamu…"
          autoFocus
          maxLength={30}
          className="mt-6 w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 text-center font-display text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        <button
          type="submit"
          disabled={!name.trim()}
          className="glow-btn mt-5 w-full rounded-2xl px-6 py-3 font-display text-lg font-semibold disabled:opacity-50"
        >
          Lanjut ✨
        </button>
      </form>
    </motion.div>
  );
}
