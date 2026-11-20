"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** Position and size of the shape inside its section. */
  style: CSSProperties;
  /** Parallax factor: below 1 drifts slower than the page, above 1 faster. */
  speed?: number;
  /** Length of one bob cycle, in seconds (6–8s). */
  duration?: number;
  /** Delay so the shapes don't bob in sync. */
  delay?: number;
  className?: string;
};

/** A decorative SVG that bobs ±10px on a slow loop and drifts with parallax. */
export default function FloatingShape({
  children,
  style,
  speed = 1,
  duration = 7,
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || speed === 1) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const travel = (1 - speed) * 400;
      gsap.fromTo(
        el,
        { y: -travel / 2 },
        {
          y: travel / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`float ${className}`.trim()} style={style} aria-hidden="true">
      <div
        className="float__bob"
        style={{ "--bob-dur": `${duration}s`, "--bob-delay": `${-delay}s` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
