"use client";

import { motion } from "motion/react";
import FillTitle from "./FillTitle";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

const SERVICES = [
  {
    title: "UI/UX DESIGN",
    text: "Research, user flows and polished interfaces in Figma, designed around how real people use the product.",
  },
  {
    title: "PROTOTYPING",
    text: "Clickable prototypes with Smart Animate, so every flow can be tested before a line of code is written.",
  },
  {
    title: "FRONTEND DEVELOPMENT",
    text: "Turning designs into fast, responsive sites with React, Next.js and Tailwind CSS.",
  },
  {
    title: "DESIGN SYSTEMS",
    text: "Reusable components, Auto Layout and tokens that keep a product consistent as it grows.",
  },
  {
    title: "RESPONSIVE WEB",
    text: "Layouts planned for desktop and mobile from the start, not squeezed down at the end.",
  },
];

export default function Services() {
  return (
    <>
      <span className="anchor" data-anchor="services" aria-hidden="true" />
      <section id="services" className="services stick" aria-labelledby="services-title" tabIndex={-1}>
        <FillTitle id="services-title">SERVICES</FillTitle>
        <ol className="services__list">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              className="svc"
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: DURATION.base, ease: EASE, delay: i * STAGGER.rows }}
            >
              <span className="svc__num disp" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="svc__title">{s.title}</h3>
                <p className="svc__text">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>
    </>
  );
}
