"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./Nav";
import GradientPill from "./GradientPill";
import { DURATION, EASE, MOTION_OK, STAGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HEADING = "HI, I'M TIM";
const LETTERS_DONE = 0.1 + HEADING.length * STAGGER.letters + DURATION.slow;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Parallax: the portrait moves at 0.7× page speed, the heading at 0.9×.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      const h = () => sectionRef.current?.offsetHeight ?? 900;
      gsap.to(portraitRef.current, { y: () => h() * 0.3, ease: "none", scrollTrigger: { ...trigger, invalidateOnRefresh: true } });
      gsap.to(headingRef.current, { y: () => h() * 0.1, ease: "none", scrollTrigger: { ...trigger, invalidateOnRefresh: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={sectionRef} className="hero">
      <Nav />

      <div ref={headingRef} className="hero__heading-wrap">
        <h1 id="top" tabIndex={-1} className="hero__heading disp" aria-label="Hi, I'm Tim">
          {HEADING.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="hero__char"
              data-reveal
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE, delay: 0.1 + i * STAGGER.letters }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
      </div>

      <div ref={portraitRef} className="hero__portrait">
        <motion.div
          data-reveal
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE, delay: 0.3 }}
        >
          <Image
            src="/img/tim-cutout.png"
            alt="Portrait of Tim"
            width={768}
            height={775}
            preload
            sizes="(max-width: 768px) 90vw, 560px"
          />
        </motion.div>
      </div>

      <motion.p
        className="hero__intro"
        data-reveal
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE, delay: LETTERS_DONE - 0.3 }}
      >
        A UI/UX designer &amp; front-end developer passionate about designing and building clear,
        memorable products
      </motion.p>

      <motion.div
        className="hero__cta"
        data-reveal
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE, delay: LETTERS_DONE - 0.2 }}
      >
        <GradientPill href="#contact">Contact me</GradientPill>
      </motion.div>
    </header>
  );
}
