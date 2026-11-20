"use client";

import { motion } from "motion/react";
import { FOOTER_SHAPES } from "./Shapes";
import { EMAIL } from "@/lib/projects";
import { DURATION, EASE_OVERSHOOT, STAGGER } from "@/lib/motion";

export default function Footer() {
  return (
    <>
      <span className="anchor anchor--footer" aria-hidden="true" />
      <footer className="footer">
        <div className="footer__grid">
          <p className="footer__name disp">
            THAW ZIN
            <br />
            HTUT
          </p>
          <div>
            <h2 className="footer__heading">SOCIAL</h2>
            <ul className="footer__list">
              <li>
                {/* TODO: add LinkedIn profile URL */}
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/thaw5808-arch" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                {/* TODO: add Figma profile URL */}
                <a href="#">Figma</a>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener">
                  Résumé
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer__heading">CONTACT</h2>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>UI/UX Designer &amp; Front-End Developer</li>
              <li>Bangkok, Thailand · Open to remote work</li>
            </ul>
          </div>
        </div>

        <motion.div
          className="footer__shapes"
          aria-hidden="true"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: STAGGER.footerShapes }}
        >
          {FOOTER_SHAPES.map((shape, i) => (
            <motion.div
              key={i}
              className="footer__shape"
              data-reveal
              variants={{ hidden: { y: "110%" }, shown: { y: 0 } }}
              transition={{ duration: DURATION.slow, ease: EASE_OVERSHOOT }}
            >
              <svg viewBox="0 0 160 160">{shape}</svg>
            </motion.div>
          ))}
        </motion.div>
      </footer>
    </>
  );
}
