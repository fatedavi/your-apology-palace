import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function CapooFlower({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-flower.gif" 
      alt="Capoo Flower" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
    />
  );
}

export function CapooLove({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-love.gif" 
      alt="Capoo Love" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
    />
  );
}

// Using the new JPG for the Happy state as requested
export function CapooHappy({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-new.jpg" 
      alt="Capoo Happy" 
      width={size} 
      height={size} 
      className={`inline-block object-contain ${className}`}
    />
  );
}

// Fallback to local GIFs for other states to ensure they appear
export function CapooCrying({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-love.gif" 
      alt="Capoo Crying" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
    />
  );
}

export function CapooAngry({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-flower.gif" 
      alt="Capoo Angry" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
    />
  );
}

export function CapooMonkey({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/img/capoo-flower.gif" 
      alt="Capoo Monkey" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
    />
  );
}


function base(size?: number) {
  return {
    width: size ?? 24,
    height: size ?? 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
}

export function HeartIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 20.5s-7.5-4.7-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.9C19.5 15.8 12 20.5 12 20.5z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartOutlineIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 20.5s-7.5-4.7-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.9C19.5 15.8 12 20.5 12 20.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
        fill="currentColor"
      />
      <circle cx="19" cy="5" r="1" fill="currentColor" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

export function FlowerIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <g fill="currentColor">
        <circle cx="12" cy="6" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <circle cx="12" cy="18" r="3" />
      </g>
      <circle cx="12" cy="12" r="2.2" fill="white" />
    </svg>
  );
}

export function BowIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 12L4 7v10l8-5zm0 0l8-5v10l-8-5z" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  );
}

export function TeddyIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <g fill="currentColor">
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="12" cy="13" r="6.5" />
      </g>
      <circle cx="9.5" cy="12" r="1" fill="#3a2230" />
      <circle cx="14.5" cy="12" r="1" fill="#3a2230" />
      <ellipse cx="12" cy="15.5" rx="1.6" ry="1.1" fill="#3a2230" />
    </svg>
  );
}

export function FacePleadingIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="10" fill="#ffd6a3" stroke="#d49a5e" strokeWidth="1" />
      <g>
        <ellipse cx="8.5" cy="11" rx="2.4" ry="2.8" fill="white" stroke="#3a2230" strokeWidth="0.9" />
        <ellipse cx="15.5" cy="11" rx="2.4" ry="2.8" fill="white" stroke="#3a2230" strokeWidth="0.9" />
        <circle cx="8.7" cy="11.6" r="1.3" fill="#3a2230" />
        <circle cx="15.7" cy="11.6" r="1.3" fill="#3a2230" />
        <circle cx="9.2" cy="11" r="0.4" fill="white" />
        <circle cx="16.2" cy="11" r="0.4" fill="white" />
      </g>
      <path d="M9.5 16c1 0.8 4 0.8 5 0" stroke="#3a2230" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M6.2 13.5q0.4 1.4 0 2.2q-0.6-0.8-0.2-2.2z" fill="#7ec8f5" />
    </svg>
  );
}

export function FaceDevilIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 6l2-3 1.8 2.6M19 6l-2-3-1.8 2.6" stroke="#7a1538" strokeWidth="1.2" fill="#a52a4a" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="8.5" fill="#d94a78" stroke="#7a1538" strokeWidth="1" />
      <path d="M8 12l1.8-0.9M16 12l-1.8-0.9" stroke="#3a0e1f" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9.8" cy="13" r="0.8" fill="#3a0e1f" />
      <circle cx="14.2" cy="13" r="0.8" fill="#3a0e1f" />
      <path d="M9 17c1 -1.2 5 -1.2 6 0c-1 0.6 -5 0.6 -6 0z" fill="#3a0e1f" />
    </svg>
  );
}

export function FaceHappyTearIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="10" fill="#ffd66e" stroke="#c98a13" strokeWidth="1" />
      <path d="M7 11c0.6 -1.2 2.4 -1.2 3 0M14 11c0.6 -1.2 2.4 -1.2 3 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M8.5 15c1 1.5 6 1.5 7 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M5.5 13q0.5 1.6 0 2.6q-0.7 -1 -0.2 -2.6z" fill="#7ec8f5" />
      <path d="M18.5 13q0.5 1.6 0 2.6q-0.7 -1 -0.2 -2.6z" fill="#7ec8f5" />
    </svg>
  );
}

export function FaceSadIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="10" fill="#ffd6a3" stroke="#d49a5e" strokeWidth="1" />
      <circle cx="9" cy="11" r="1" fill="#3a2230" />
      <circle cx="15" cy="11" r="1" fill="#3a2230" />
      <path d="M9 16c1 -1.2 5 -1.2 6 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function FaceCryingIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="10" fill="#ffd6a3" stroke="#d49a5e" strokeWidth="1" />
      <path d="M7 10.5c0.6 0.6 2.4 0.6 3 0M14 10.5c0.6 0.6 2.4 0.6 3 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <ellipse cx="12" cy="16" rx="1.8" ry="1.2" fill="#3a2230" />
      <path d="M6.2 12q0.6 3 0 4.4q-0.8 -1.4 -0.2 -4.4z" fill="#7ec8f5" />
      <path d="M17.8 12q0.6 3 0 4.4q-0.8 -1.4 -0.2 -4.4z" fill="#7ec8f5" />
    </svg>
  );
}

export function FaceMonkeyIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="13" r="9" fill="#a06b3e" />
      <ellipse cx="12" cy="15" rx="6" ry="5" fill="#f3d0a7" />
      <circle cx="6" cy="9" r="2.4" fill="#a06b3e" />
      <circle cx="18" cy="9" r="2.4" fill="#a06b3e" />
      <path d="M8 9c0.5 1 1.5 1 2 0M14 9c0.5 1 1.5 1 2 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M10 15c1 0.6 3 0.6 4 0" stroke="#3a2230" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function FaceAngryIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="10" fill="#ffb37a" stroke="#b25a14" strokeWidth="1" />
      <path d="M7 9.5l3 1M17 9.5l-3 1" stroke="#3a2230" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="12" r="0.9" fill="#3a2230" />
      <circle cx="15" cy="12" r="0.9" fill="#3a2230" />
      <path d="M9 16c1 -1 5 -1 6 0" stroke="#3a2230" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function GiftIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3.5" y="9.5" width="17" height="11" rx="1.5" fill="currentColor" stroke="white" strokeWidth="1" />
      <rect x="3" y="7" width="18" height="3.5" rx="1" fill="currentColor" stroke="white" strokeWidth="1" />
      <rect x="10.8" y="7" width="2.4" height="13.5" fill="white" opacity="0.85" />
      <circle cx="9.5" cy="6" r="2" fill="white" opacity="0.85" />
      <circle cx="14.5" cy="6" r="2" fill="white" opacity="0.85" />
    </svg>
  );
}
