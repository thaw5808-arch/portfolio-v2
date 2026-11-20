/**
 * One-off, dev-only script: captures two extra screenshots per project
 * from the live sites, for the project cards. Not used by the app, and
 * Playwright is deliberately NOT a dependency in package.json.
 *
 * Run it with a throwaway Playwright install, e.g.:
 *   npm i --prefix /tmp/pw playwright
 *   NODE_PATH=/tmp/pw/node_modules node scripts/capture-projects.cjs
 *
 * Output: public/img/<slug>-2.jpg and public/img/<slug>-3.jpg
 */
/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS script */
const path = require("node:path");
const { chromium } = require("playwright");

// Each shot is either a scroll position on the home page ({ y }) or the
// top of another page on the same site ({ path }).
const SITES = [
  { slug: "serpent", url: "https://serpent-zeta.vercel.app", shots: [{ y: 1000 }, { path: "/en/species" }] },
  { slug: "marinerescue", url: "https://marinerescue-five.vercel.app", shots: [{ y: 1000 }, { path: "/report" }] },
  { slug: "vesper", url: "https://luxe-fullstack-gamma.vercel.app", shots: [{ y: 1000 }, { y: 2000 }] },
  { slug: "bendux", url: "https://bendux-fullstack.vercel.app", shots: [{ y: 1000 }, { y: 2000 }] },
];

async function load(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  // Walk the page once so lazy images and scroll reveals fire.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(150);
  }
  return height;
}

const OUT = path.join(__dirname, "..", "public", "img");
const VIEWPORT = { width: 1600, height: 1000 };

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  for (const site of SITES) {
    const page = await context.newPage();
    try {
      for (const [i, shot] of site.shots.entries()) {
        const url = shot.path ? site.url + shot.path : site.url;
        const height = await load(page, url);
        const y = Math.min(shot.y ?? 0, Math.max(0, height - VIEWPORT.height));
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(1500);
        const file = path.join(OUT, `${site.slug}-${i + 2}.jpg`);
        await page.screenshot({ path: file, type: "jpeg", quality: 82 });
        console.log(`saved ${file} (${url}, scrollY=${y})`);
      }
    } catch (err) {
      console.error(`FAILED ${site.url}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();
