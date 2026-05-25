import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  rot: number;
  vr: number;
  type: "heart" | "spark";
  hue: number;
  alpha: number;
}

function isMobile() {
  return window.innerWidth < 640;
}

export function BackgroundFX({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const mobile = isMobile();
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const particleCount = mobile ? 12 : 28;
    const count = Math.floor(particleCount * intensity);
    const particles: Particle[] = Array.from({ length: count }).map(() => spawn(w, h));

    function spawn(w: number, h: number): Particle {
      const isHeart = Math.random() < 0.55;
      const sizeMult = mobile ? 0.65 : 1;
      return {
        x: Math.random() * w,
        y: h + Math.random() * h * 0.5,
        vy: -(0.3 + Math.random() * 0.8),
        vx: (Math.random() - 0.5) * 0.4,
        size: isHeart ? (10 + Math.random() * 16) * sizeMult : (2 + Math.random() * 3) * sizeMult,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.02,
        type: isHeart ? "heart" : "spark",
        hue: 330 + Math.random() * 40,
        alpha: 0.4 + Math.random() * 0.5,
      };
    }

    function drawHeart(x: number, y: number, s: number, rot: number, color: string) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(s / 32, s / 32);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.bezierCurveTo(0, -2, -16, -2, -16, 8);
      ctx.bezierCurveTo(-16, 18, 0, 26, 0, 30);
      ctx.bezierCurveTo(0, 26, 16, 18, 16, 8);
      ctx.bezierCurveTo(16, -2, 0, -2, 0, 8);
      ctx.fill();
      ctx.restore();
    }

    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < -30) Object.assign(p, spawn(w, h));
        const color = `oklch(0.8 0.15 ${p.hue} / ${p.alpha})`;
        if (p.type === "heart") {
          drawHeart(p.x, p.y, p.size, p.rot, color);
        } else {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intensity]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-soft opacity-50 blur-3xl max-sm:h-48 max-sm:w-48 max-sm:-top-16 max-sm:-left-16" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-lavender opacity-40 blur-3xl max-sm:h-48 max-sm:w-48 max-sm:-right-16" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-peach opacity-40 blur-3xl max-sm:h-48 max-sm:w-48 max-sm:-bottom-20" />
      </div>
    </>
  );
}
