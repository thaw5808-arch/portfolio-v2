"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "./SmoothScroll";
import { DURATION, EASE } from "@/lib/motion";

const LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    const opener = menuBtn.current;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="nav">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="mnav">
        <a href="#top" className="mnav__logo" aria-label="Tim, back to top">
          Tim
        </a>
        <button
          ref={menuBtn}
          type="button"
          className="mnav__btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          MENU
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            <div className="menu__top">
              <span className="mnav__logo">Tim</span>
              <button
                ref={closeBtn}
                type="button"
                className="mnav__btn"
                onClick={() => setOpen(false)}
              >
                CLOSE
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="menu__links">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 + i * 0.06 }}
                  >
                    <a href={l.href} className="disp" onClick={() => setOpen(false)}>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
