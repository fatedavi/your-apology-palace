import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FaceAngryIcon,
  FaceCryingIcon,
  FaceMonkeyIcon,
  FacePleadingIcon,
  FaceSadIcon,
  FaceDevilIcon,
} from "./icons";

const TAUNTS: { text: string; icon: ReactNode }[] = [
  { text: "Tidak", icon: <FaceDevilIcon size={20} /> },
  { text: "Yakin nih?", icon: <FaceCryingIcon size={20} /> },
  { text: "Jangan dong", icon: <FaceSadIcon size={20} /> },
  { text: "Kasian aku", icon: <FacePleadingIcon size={20} /> },
  { text: "Plisss", icon: <FaceCryingIcon size={20} /> },
  { text: "Cobain lagi", icon: <FaceMonkeyIcon size={20} /> },
  { text: "Aku nangis nih", icon: <FaceCryingIcon size={20} /> },
  { text: "Ga boleh", icon: <FaceAngryIcon size={20} /> },
];

function playBoop() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(660, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.2);
    setTimeout(() => ctx.close(), 300);
  } catch {
    /* ignore */
  }
}

export function RunawayButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const [labelIdx, setLabelIdx] = useState(0);
  const lastDodge = useRef(0);

  const dodge = () => {
    const now = performance.now();
    if (now - lastDodge.current < 120) return;
    lastDodge.current = now;

    const btn = btnRef.current;
    if (!btn) return;
    const parent = btn.parentElement!.getBoundingClientRect();
    const rect = btn.getBoundingClientRect();
    const margin = 12;
    const maxX = parent.width - rect.width - margin;
    const maxY = parent.height - rect.height - margin;
    const nx = margin + Math.random() * Math.max(0, maxX - margin);
    const ny = margin + Math.random() * Math.max(0, maxY - margin);
    setPos({ x: nx - (rect.left - parent.left), y: ny - (rect.top - parent.top) });
    setDodges((d) => d + 1);
    setLabelIdx(Math.floor(Math.random() * (TAUNTS.length - 1)) + 1);
    playBoop();
  };

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const point =
        "touches" in e && e.touches[0]
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : "clientX" in e
            ? { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
            : null;
      if (!point) return;
      const dx = point.x - cx;
      const dy = point.y - cy;
      if (Math.hypot(dx, dy) < 110) dodge();
    };
    window.addEventListener("mousemove", handler);
    window.addEventListener("touchmove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("touchmove", handler);
    };
  }, []);

  const scale = Math.max(0.55, 1 - dodges * 0.04);
  const rot = ((dodges * 17) % 30) - 15;
  const current = TAUNTS[labelIdx];

  return (
    <button
      ref={btnRef}
      type="button"
      onPointerDown={dodge}
      onClick={dodge}
      className="absolute inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-6 py-3 font-display text-lg font-semibold text-foreground shadow-md backdrop-blur-md"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale}) rotate(${rot}deg)`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        willChange: "transform",
      }}
    >
      {current.text}
      {current.icon}
    </button>
  );
}
