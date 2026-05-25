import { useEffect, useRef } from "react";

export function HeartCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.classList.add("heart-cursor");
    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("heart-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden sm:block"
      style={{ willChange: "transform" }}
    >
      <div className="h-6 w-6 animate-pulse">
        <svg viewBox="0 0 32 32" className="drop-shadow-[0_0_8px_rgba(255,120,170,0.6)]">
          <path
            d="M16 28s-11-7.5-11-15a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7.5-11 15-11 15z"
            fill="#ff7aa8"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
