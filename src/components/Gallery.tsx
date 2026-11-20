"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY } from "@/lib/projects";
import { MOTION_OK } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Key = keyof typeof GALLERY;

const ROW_1: Key[] = ["marinerescue", "adore", "serpent", "vesper", "bendux"];
const ROW_2: Key[] = ["vesper", "bendux", "marinerescue", "adore", "serpent"];
/** Each row is repeated so there is never a gap at either edge. */
const COPIES = 3;
const TRAVEL = 300;

function Row({ items, rowRef, start }: { items: Key[]; rowRef: React.Ref<HTMLDivElement>; start: number }) {
  return (
    <div ref={rowRef} className="gallery__row" style={{ transform: `translateX(${start}px)` }}>
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        items.map((key, i) => {
          const shot = GALLERY[key];
          const isCopy = copy > 0;
          return (
            <div key={`${copy}-${i}`} className="gallery__item zoom" aria-hidden={isCopy || undefined}>
              <Image src={shot.src} alt={isCopy ? "" : shot.alt} fill sizes="300px" />
            </div>
          );
        }),
      )}
    </div>
  );
}

/** Two rows of screenshots that move in opposite directions with the scroll. */
export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      gsap.fromTo(row1.current, { x: -60 }, { x: -60 - TRAVEL, ease: "none", scrollTrigger });
      gsap.fromTo(row2.current, { x: -80 - TRAVEL }, { x: -80, ease: "none", scrollTrigger });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gallery" aria-label="Project gallery">
      <Row items={ROW_1} rowRef={row1} start={-60} />
      <Row items={ROW_2} rowRef={row2} start={-220} />
    </section>
  );
}
