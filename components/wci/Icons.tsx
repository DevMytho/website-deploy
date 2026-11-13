import type { CSSProperties } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Mark({ style }: { style?: CSSProperties }) {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={style}
    >
      <path
        d="m3 8 10 25L23 8M12 8l10 25L37 8M5 8h9m6 0h7m5 0h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Glyph({
  kind = "change",
}: {
  kind?: "change" | "shield" | "layers" | "code" | "plan" | "review";
}) {
  const paths = {
    change: (
      <>
        <path d="M8 5v14m0-10h6a4 4 0 0 0 4-4" />
        <circle cx="8" cy="4" r="2" />
        <circle cx="8" cy="21" r="2" />
        <circle cx="18" cy="3" r="2" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5l8-3Z" />
        <path d="m8 11 3 3 5-6" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    code: (
      <>
        <path d="m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18" />
      </>
    ),
    plan: (
      <>
        <path d="M6 2h9l4 4v16H5V2h1Zm8 0v5h5M8 11h8m-8 4h8m-8 4h4" />
      </>
    ),
    review: (
      <>
        <path d="M20 13V4H3v15h9m-6-11h11M6 12h6m4 5 2 2 4-5" />
      </>
    ),
  };
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}
