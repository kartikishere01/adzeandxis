"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          infoRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      {/* Subtle noise grain overlay */}
      <div className="contact-noise" aria-hidden="true" />

      <div className="contact-inner">
        {/* ── Opening Headline ────── */}
        <h2 ref={headlineRef} className="contact-headline">
          Let&apos;s build something
          <br />
          <em>timeless.</em>
        </h2>

        <div className="contact-body">
          {/* ── Contact Info ────────── */}
          <div ref={infoRef} className="contact-info">
            <div className="contact-info__block">
              <span className="contact-info__label">Email</span>
              <a
                href="mailto:info@adzeandaxis.com"
                className="contact-info__value contact-info__link"
              >
                info@adzeandaxis.com
              </a>
            </div>

            <div className="contact-info__block">
              <span className="contact-info__label">Phone</span>
              <a
                href="tel:+919888750686"
                className="contact-info__value contact-info__link"
              >
                +91 98887 50686
              </a>
            </div>

            <div className="contact-info__block">
              <span className="contact-info__label">Location</span>
              <span className="contact-info__value">Chandigarh, India</span>
            </div>

            {/* Thin decorative rule */}
            <div className="contact-info__rule" />

            <p className="contact-info__note">
              Available for commissions,<br />
              collaborations & consultations.
            </p>
          </div>

          {/* ── Contact Form ─────────── */}
          <form 
            ref={formRef} 
            className="contact-form" 
            action="https://formspree.io/f/info@adzeandaxis.com" 
            method="POST"
          >
            {/* Name */}
            <div className={`contact-field ${focused === "name" ? "contact-field--focused" : ""}`}>
              <label htmlFor="contact-name" className="contact-field__label">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="contact-field__input"
                placeholder="Your name"
                required
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            {/* Email */}
            <div className={`contact-field ${focused === "email" ? "contact-field--focused" : ""}`}>
              <label htmlFor="contact-email" className="contact-field__label">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="contact-field__input"
                placeholder="your@email.com"
                required
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            {/* Message */}
            <div className={`contact-field ${focused === "message" ? "contact-field--focused" : ""}`}>
              <label htmlFor="contact-message" className="contact-field__label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="contact-field__input contact-field__textarea"
                placeholder="Tell me about your project…"
                rows={4}
                required
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            {/* Submit */}
            <button type="submit" className="contact-submit">
              <span className="contact-submit__text">Send Message</span>
              <span className="contact-submit__arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
