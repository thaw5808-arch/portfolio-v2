"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  id?: string;
};

/**
 * A section title that starts as an outline and fills with its solid colour,
 * left to right, as it crosses the viewport. The solid layer is a clipped
 * duplicate whose clip-path is scrubbed with the scroll.
 */
export default function FillTitle({ children, className = "", id }: Props) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        fill,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: fill.parentElement,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <h2 id={id} className={`fill-title disp ${className}`.trim()}>
      <span className="fill-title__outline">{children}</span>
      <span ref={fillRef} className="fill-title__fill" aria-hidden="true">
        {children}
      </span>
    </h2>
  );
}
