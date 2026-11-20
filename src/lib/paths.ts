/** "" on Vercel, "/portfolio-v2" on GitHub Pages (set in next.config.ts). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public file path with the base path. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
