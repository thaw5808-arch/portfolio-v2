import type { NextConfig } from "next";

/**
 * Two targets from one codebase:
 * - Vercel (default): server build at the domain root, optimised images.
 * - GitHub Pages (GITHUB_PAGES=true): static export under /portfolio-v2.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/portfolio-v2" : "";

const nextConfig: NextConfig = {
  // Partial prerendering needs a server, so it's off for the static export.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  ...(isPages && {
    output: "export",
    basePath,
    images: { unoptimized: true },
  }),
  env: {
    // next/image and plain links to /public files don't get basePath
    // automatically, so components prefix it with asset().
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isPages ? "https://thaw5808-arch.github.io/portfolio-v2" : "",
  },
  turbopack: {
    // Pin the root to this folder (there is an unrelated package-lock.json in ~).
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
