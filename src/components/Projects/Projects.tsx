"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillTitle from "../FillTitle";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const listRef = useRef<HTMLOListElement>(null);

  // While a card is being covered by the next one, scale it to 0.96 and
  // dim its images to 60%.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", list);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const media = card.querySelector("[data-card-media]");
        const stuckTop = () => parseFloat(getComputedStyle(next).top) || 0;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: () => `top ${stuckTop()}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(card, { scale: 0.96, ease: "none" }, 0).to(media, { opacity: 0.6, ease: "none" }, 0);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <span className="anchor anchor--projects" data-anchor="projects" aria-hidden="true" />
      <section id="projects" className="projects stick" aria-labelledby="projects-title" tabIndex={-1}>
        <FillTitle id="projects-title">PROJECTS</FillTitle>
        <ol ref={listRef} className="projects__stack">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} total={PROJECTS.length} />
          ))}
        </ol>
      </section>
    </>
  );
}
