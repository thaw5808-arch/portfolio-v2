"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** The shared Lenis instance, or null when smooth scroll is off. */
export function getLenis() {
  return lenis;
}

/**
 * Panels that slide over each other are `position: sticky`. A panel taller
 * than the viewport sticks once its bottom edge reaches the bottom of the
 * screen, so the next panel's rounded top edge slides up over it.
 */
function updateStickyTops() {
  const vh = window.innerHeight;
  document.querySelectorAll<HTMLElement>(".stick").forEach((el) => {
    el.style.setProperty("--stick-top", `${Math.min(0, vh - el.offsetHeight)}px`);
  });
}

/** Scroll to an in-page anchor. Uses the zero-height `.anchor` marker
 *  before a sticky panel, because a stuck panel reports the wrong position. */
export function scrollToId(id: string) {
  const marker = document.querySelector<HTMLElement>(`[data-anchor="${id}"]`);
  const section = document.getElementById(id);
  const target = marker ?? section;
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
  section?.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    updateStickyTops();
    const ro = new ResizeObserver(() => {
      updateStickyTops();
      ScrollTrigger.refresh();
    });
    document.querySelectorAll(".stick").forEach((el) => ro.observe(el));
    window.addEventListener("resize", updateStickyTops);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      lenis = new Lenis({ autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
      };
    });

    // Every in-page link scrolls smoothly to its section.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateStickyTops);
      document.removeEventListener("click", onClick);
      mm.revert();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
