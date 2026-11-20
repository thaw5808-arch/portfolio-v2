/** Shared motion settings. Every entrance and hover uses these. */

/** cubic-bezier(.22,1,.36,1) as an array, for Motion. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** The same curve as a CSS string. */
export const EASE_CSS = "cubic-bezier(.22,1,.36,1)";

/** A slight overshoot, used only by the footer shapes. */
export const EASE_OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;

/** Durations in seconds (600–900ms everywhere). */
export const DURATION = {
  fast: 0.6,
  base: 0.75,
  slow: 0.9,
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  letters: 0.04,
  rows: 0.08,
  footerShapes: 0.07,
  lines: 0.1,
} as const;

/** Media query used to switch every scroll effect off. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
