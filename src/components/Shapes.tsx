/* Decorative SVG shapes, copied from portfolio-design.html. All aria-hidden
   via FloatingShape or their parent. */

export function StarShape() {
  return (
    <svg width="150" height="150" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="shape-g1" cx="35%" cy="30%">
          <stop offset="0" stopColor="#E9F0FF" />
          <stop offset=".55" stopColor="#8FA6D6" />
          <stop offset="1" stopColor="#3B4A75" />
        </radialGradient>
      </defs>
      <g fill="url(#shape-g1)">
        <ellipse cx="50" cy="22" rx="13" ry="22" />
        <ellipse cx="50" cy="78" rx="13" ry="22" />
        <ellipse cx="22" cy="50" rx="22" ry="13" />
        <ellipse cx="78" cy="50" rx="22" ry="13" />
        <circle cx="50" cy="50" r="16" />
      </g>
    </svg>
  );
}

export function CubeShape() {
  return (
    <svg width="130" height="130" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="shape-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FB2FF" />
          <stop offset="1" stopColor="#2B4BD8" />
        </linearGradient>
      </defs>
      <polygon points="50,6 92,28 92,72 50,94 8,72 8,28" fill="url(#shape-g2)" />
      <polygon points="50,6 92,28 50,50 8,28" fill="#A9CBFF" opacity=".8" />
    </svg>
  );
}

export function HeartShape() {
  return (
    <svg width="150" height="140" viewBox="0 0 100 92">
      <defs>
        <radialGradient id="shape-g3" cx="35%" cy="30%">
          <stop offset="0" stopColor="#FF8A8A" />
          <stop offset=".6" stopColor="#E01E2B" />
          <stop offset="1" stopColor="#7A0710" />
        </radialGradient>
      </defs>
      <path
        d="M50 90 C10 62 0 40 6 24 C14 2 42 2 50 22 C58 2 86 2 94 24 C100 40 90 62 50 90Z"
        fill="url(#shape-g3)"
      />
    </svg>
  );
}

export function FlowerShape() {
  return (
    <svg width="160" height="160" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="shape-g4" cx="35%" cy="30%">
          <stop offset="0" stopColor="#E7C8FF" />
          <stop offset=".6" stopColor="#9B4DFF" />
          <stop offset="1" stopColor="#5320B0" />
        </radialGradient>
      </defs>
      <g fill="url(#shape-g4)">
        <circle cx="50" cy="22" r="20" />
        <circle cx="77" cy="42" r="20" />
        <circle cx="67" cy="74" r="20" />
        <circle cx="33" cy="74" r="20" />
        <circle cx="23" cy="42" r="20" />
      </g>
      <circle cx="50" cy="50" r="12" fill="#FFC93C" />
    </svg>
  );
}

export function BlobShape() {
  return (
    <svg width="140" height="170" viewBox="0 0 100 120">
      <defs>
        <radialGradient id="shape-g5" cx="35%" cy="30%">
          <stop offset="0" stopColor="#C9B6FF" />
          <stop offset=".6" stopColor="#6A3BFF" />
          <stop offset="1" stopColor="#3A16B5" />
        </radialGradient>
      </defs>
      <path
        d="M40 10 C70 0 92 20 80 40 C98 52 92 80 70 84 C70 108 40 118 28 98 C6 100 0 72 16 62 C2 44 16 18 40 10Z"
        fill="url(#shape-g5)"
      />
    </svg>
  );
}

export function BoltShape() {
  return (
    <svg width="110" height="150" viewBox="0 0 70 100">
      <defs>
        <linearGradient id="shape-g6" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF27A" />
          <stop offset=".5" stopColor="#F7C21B" />
          <stop offset="1" stopColor="#9BB51E" />
        </linearGradient>
      </defs>
      <path d="M42 2 L8 56 L32 56 L22 98 L64 38 L38 38 Z" fill="url(#shape-g6)" />
    </svg>
  );
}

/* Footer shapes: the eight flat shapes from the design, each on its own
   160×160 canvas so they can animate one by one. */
export const FOOTER_SHAPES = [
  <path key="x" d="M20 0 L80 60 L140 0 L160 20 L100 80 L160 140 L140 160 L80 100 L20 160 L0 140 L60 80 L0 20Z" fill="#7B3CFF" />,
  <g key="clover" fill="#A6E04A">
    <circle cx="40" cy="40" r="40" />
    <circle cx="120" cy="40" r="40" />
    <circle cx="40" cy="120" r="40" />
    <circle cx="120" cy="120" r="40" />
  </g>,
  <path key="arc" d="M80 0 A80 80 0 1 1 0 80 L44 80 A36 36 0 1 0 80 44Z" fill="#E6EEF8" />,
  <circle key="circle" cx="80" cy="80" r="80" fill="#7B3CFF" />,
  <g key="zigzag" fill="#E6EEF8">
    <path d="M0 0 H160 L80 80 H0 Z" />
    <path d="M80 80 H160 V160 H0 Z" />
  </g>,
  <g key="bowtie" fill="#F59E2B">
    <path d="M0 0 L80 80 L0 160Z" />
    <path d="M160 0 L80 80 L160 160Z" />
    <rect x="40" y="0" width="12" height="160" />
  </g>,
  <g key="arrow" fill="#E6EEF8">
    <path d="M80 0 L160 80 H0Z" />
    <path d="M0 160 L80 80 L160 160Z" />
  </g>,
  <g key="ring">
    <circle cx="80" cy="80" r="80" fill="#FF3FB8" />
    <circle cx="80" cy="80" r="34" fill="#000" />
  </g>,
];
