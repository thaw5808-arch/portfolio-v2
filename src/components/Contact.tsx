"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import FloatingShape from "./FloatingShape";
import { BlobShape, BoltShape } from "./Shapes";
import { EMAIL } from "@/lib/projects";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{6,20}$/;

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  return e;
}

const LINES = ["LET'S", "GET IN", "TOUCH"];

export default function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const set = (f: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      setStatus("");
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    const body = [
      values.message.trim(),
      "",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phone.trim() ? `Phone: ${values.phone.trim()}` : "",
    ]
      .filter((l, i) => i < 2 || l)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the message ready to send.");
  };

  const fieldProps = (f: Field) => ({
    id: `contact-${f}`,
    name: f,
    className: "field",
    value: values[f],
    onChange: set(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `contact-${f}-error` : undefined,
  });

  const error = (f: Field) =>
    errors[f] ? (
      <span id={`contact-${f}-error`} className="form__error">
        {errors[f]}
      </span>
    ) : null;

  return (
    <>
      <span className="anchor anchor--contact" data-anchor="contact" aria-hidden="true" />
      <section id="contact" className="contact stick" aria-labelledby="contact-title" tabIndex={-1}>
        <FloatingShape className="shape-blob" style={{ left: 60, top: 330, width: 140 }} speed={0.85} duration={7} delay={2}>
          <BlobShape />
        </FloatingShape>
        <FloatingShape className="shape-bolt" style={{ right: 70, top: 50, width: 110 }} speed={1.15} duration={6.5} delay={0}>
          <BoltShape />
        </FloatingShape>

        <div className="contact__grid">
          <div className="contact__left">
            <h2 id="contact-title" className="contact__title disp" aria-label="Let's get in touch">
              {LINES.map((line, i) => (
                <span key={line} className="contact__mask" aria-hidden="true">
                  <motion.span
                    className="contact__line"
                    data-reveal
                    initial={{ opacity: 0, y: "100%" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: DURATION.slow, ease: EASE, delay: i * STAGGER.lines }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
            <a className="contact__email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>

          <form className="form" noValidate onSubmit={onSubmit} aria-label="Contact form">
            <div className="form__full">
              <label htmlFor="contact-name" className="sr-only">
                Full name (required)
              </label>
              <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Full Name*" required />
              {error("name")}
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email (required)
              </label>
              <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="Email*" required />
              {error("email")}
            </div>
            <div>
              <label htmlFor="contact-phone" className="sr-only">
                Phone
              </label>
              <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="Phone" />
              {error("phone")}
            </div>
            <div className="form__full">
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea {...fieldProps("message")} rows={2} placeholder="Message" style={{ resize: "none" }} />
            </div>
            <button type="submit" className="form__send">
              SEND
            </button>
            <p className="form__status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
