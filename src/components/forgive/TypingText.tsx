import { useEffect, useState } from "react";

export function TypingText({
  text,
  speed = 45,
  className,
  onDone,
  startDelay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
  startDelay?: number;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setShown(text.slice(0, i));
        if (i < text.length) {
          t = setTimeout(tick, speed);
        } else {
          onDone?.();
        }
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(t!);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className={className}>
      {shown}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
