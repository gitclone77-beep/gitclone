import type { IconName } from "@/types/site";

type VectorIconProps = {
  name: IconName;
  className?: string;
};

export function VectorIcon({ name, className }: VectorIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className={className ?? "h-6 w-6"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`icon-${name}`} x1="8" y1="8" x2="40" y2="40">
          <stop stopColor="#5AA7FF" />
          <stop offset="0.56" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#5EEAD4" />
        </linearGradient>
      </defs>
      {renderIcon(name)}
    </svg>
  );
}

function stroke(name: IconName) {
  return `url(#icon-${name})`;
}

function renderIcon(name: IconName) {
  const common = {
    stroke: stroke(name),
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (name) {
    case "repo":
      return (
        <>
          <path d="M12 12.8 24 7l12 5.8v22.4L24 41l-12-5.8V12.8Z" {...common} />
          <path d="M12.8 13.2 24 19l11.2-5.8M24 19v21" {...common} />
          <path d="M17.5 26.2 24 29.4l6.5-3.2" {...common} />
        </>
      );
    case "branch":
      return (
        <>
          <path d="M15 13v13c0 6.1 4.9 11 11 11h7" {...common} />
          <path d="M33 18h-6c-4.4 0-8 3.6-8 8" {...common} />
          <circle cx="15" cy="12" r="4" {...common} />
          <circle cx="35" cy="18" r="4" {...common} />
          <circle cx="36" cy="37" r="4" {...common} />
        </>
      );
    case "commit":
      return (
        <>
          <path d="M7 24h12M29 24h12" {...common} />
          <circle cx="24" cy="24" r="7" {...common} />
          <path d="M24 19.8v8.4M19.8 24h8.4" {...common} />
        </>
      );
    case "pull":
      return (
        <>
          <path d="M14 14v20M34 15v8c0 5.5-4.5 10-10 10h-4" {...common} />
          <path d="m29 18 5-5 5 5M20 29l-5 5-5-5" {...common} />
          <circle cx="14" cy="12" r="4" {...common} />
          <circle cx="34" cy="36" r="4" {...common} />
        </>
      );
    case "issue":
      return (
        <>
          <path d="M24 7.5 39.5 16v16L24 40.5 8.5 32V16L24 7.5Z" {...common} />
          <path d="M24 15v11" {...common} />
          <circle cx="24" cy="32" r="1.7" fill="#22D3EE" />
        </>
      );
    case "team":
      return (
        <>
          <circle cx="24" cy="17" r="6" {...common} />
          <path d="M13 38c1.7-7 6.1-10.5 11-10.5S33.3 31 35 38" {...common} />
          <path d="M11.5 30.5c-2.1-2.2-2.1-5.7 0-7.8M36.5 30.5c2.1-2.2 2.1-5.7 0-7.8" {...common} />
        </>
      );
    case "ai":
      return (
        <>
          <path d="M24 8v6M24 34v6M8 24h6M34 24h6M13.5 13.5l4.2 4.2M30.3 30.3l4.2 4.2M34.5 13.5l-4.2 4.2M17.7 30.3l-4.2 4.2" {...common} />
          <path d="M24 16.5 30.5 24 24 31.5 17.5 24 24 16.5Z" {...common} />
          <circle cx="24" cy="24" r="2.2" fill="#22D3EE" />
        </>
      );
    case "deploy":
      return (
        <>
          <path d="M12 31.5V14a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v17.5" {...common} />
          <path d="M8 31.5h32l-4 7H12l-4-7Z" {...common} />
          <path d="M24 16v10M19.5 21.5 24 26l4.5-4.5" {...common} />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M24 7.5 38 12v10.4c0 8.4-5.5 15.5-14 18.1-8.5-2.6-14-9.7-14-18.1V12l14-4.5Z" {...common} />
          <path d="m17.5 24.3 4.4 4.4 9-9" {...common} />
        </>
      );
    case "analytics":
      return (
        <>
          <path d="M9 37h30" {...common} />
          <path d="M14 31V20M24 31V13M34 31V24" {...common} />
          <path d="m13 16 8 5 7-9 8 6" {...common} />
          <circle cx="13" cy="16" r="2.6" {...common} />
          <circle cx="28" cy="12" r="2.6" {...common} />
          <circle cx="36" cy="18" r="2.6" {...common} />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M24 6 28.7 19.3 42 24l-13.3 4.7L24 42l-4.7-13.3L6 24l13.3-4.7L24 6Z" {...common} />
          <path d="M34 7.5 35.7 12 40 13.5 35.7 15 34 19.5 32.3 15 28 13.5 32.3 12 34 7.5Z" {...common} />
        </>
      );
    default:
      return null;
  }
}
