"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillTitle from "./FillTitle";
import FloatingShape from "./FloatingShape";
import GradientPill from "./GradientPill";
import { CubeShape, FlowerShape, HeartShape, StarShape } from "./Shapes";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "I'm a UI/UX designer and front-end developer from Bangkok.",
  "I design interfaces in Figma, then build them with React and Next.js.",
  "I love turning messy problems into products that feel simple",
  "and look polished on every screen.",
  "Let's build something useful together!",
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);

  // Each word goes from 15% to 100% opacity as the paragraph moves
  // from 80% to 40% of the viewport.
  useEffect(() => {
    const p = textRef.current;
    if (!p) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        p.querySelectorAll(".about__word"),
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: p, start: "top 80%", end: "top 40%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <span className="anchor" data-anchor="about" aria-hidden="true" />
      <section id="about" className="about stick" aria-labelledby="about-title" tabIndex={-1}>
        <div className="about__inner">
          <FloatingShape className="shape-star" style={{ left: 120, top: 40, width: 150 }} speed={0.8} duration={7} delay={0}>
            <StarShape />
          </FloatingShape>
          <FloatingShape className="shape-cube" style={{ right: 130, top: 30, width: 130 }} speed={1.2} duration={6} delay={1.5}>
            <CubeShape />
          </FloatingShape>
          <FloatingShape className="shape-heart" style={{ left: 150, top: 400, width: 150 }} speed={1.1} duration={8} delay={3}>
            <HeartShape />
          </FloatingShape>
          <FloatingShape className="shape-flower" style={{ right: 150, top: 330, width: 160 }} speed={0.9} duration={7.5} delay={4.5}>
            <FlowerShape />
          </FloatingShape>

          <FillTitle id="about-title" className="about__title">
            ABOUT ME
          </FillTitle>

          <p ref={textRef} className="about__text">
            {LINES.map((line, li) => (
              <span key={li}>
                {line.split(" ").map((word, wi) => (
                  <span key={wi}>
                    <span className="about__word">{word}</span>
                    {wi < line.split(" ").length - 1 ? " " : null}
                  </span>
                ))}
                {li < LINES.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          <div className="about__cta">
            <GradientPill href="#contact">Contact me</GradientPill>
          </div>
        </div>
      </section>
    </>
  );
}
