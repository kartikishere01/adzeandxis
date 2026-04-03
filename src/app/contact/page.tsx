"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Page entry: hero headline slams in on mount ──
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entryTl
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.4 }
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        );

      // ── ScrollTrigger: contact info block ──
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // ── ScrollTrigger: form ──
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // ── ScrollTrigger: footer ──
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page">
      {/* Noise grain */}
      <div className="contact-noise" aria-hidden="true" />

      {/* ── HERO ───────────────────────────────────────── */}
      <section ref={heroRef} className="contact-page__hero">
        <div className="contact-page__hero-inner">
          {/* Mono top label */}
          <span className="contact-page__label">[ GET IN TOUCH ]</span>

          <h1 ref={headlineRef} className="contact-page__headline">
            Let&apos;s build
            <br />
            something
            <br />
            <em>timeless.</em>
          </h1>

          <p ref={subtextRef} className="contact-page__subtext">
            Every great space begins with a conversation.
          </p>
        </div>

        {/* Decorative vertical line */}
        <div className="contact-page__vline" aria-hidden="true" />
      </section>

      {/* ── BODY ───────────────────────────────────────── */}
      <section className="contact-page__body">
        <div className="contact-page__body-inner">

          {/* ── Contact Info ── */}
          <div ref={infoRef} className="contact-page__info">
            <h2 className="contact-page__info-heading">Studio</h2>

            <div className="contact-info__block">
              <span className="contact-info__label">Email</span>
              <a href="mailto:info@adzeandaxis.com" className="contact-info__value contact-info__link">
                info@adzeandaxis.com
              </a>
            </div>

            <div className="contact-info__block">
              <span className="contact-info__label">Phone</span>
              <a href="tel:+919888750686" className="contact-info__value contact-info__link">
                +91 98887 50686
              </a>
            </div>

            <div className="contact-info__block">
              <span className="contact-info__label">Location</span>
              <span className="contact-info__value">Chandigarh, India</span>
            </div>

            <div className="contact-info__rule" />

            <p className="contact-info__note">
              Open to commissions, collaborations,<br />
              and architectural consultations.
            </p>
          </div>

          {/* ── Form ── */}
          <form
            ref={formRef}
            className="contact-form contact-page__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={`contact-field ${focused === "name" ? "contact-field--focused" : ""}`}>
              <label htmlFor="cp-name" className="contact-field__label">Name</label>
              <input
                id="cp-name"
                type="text"
                className="contact-field__input"
                placeholder="Your full name"
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            <div className={`contact-field ${focused === "email" ? "contact-field--focused" : ""}`}>
              <label htmlFor="cp-email" className="contact-field__label">Email</label>
              <input
                id="cp-email"
                type="email"
                className="contact-field__input"
                placeholder="your@email.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            <div className={`contact-field ${focused === "message" ? "contact-field--focused" : ""}`}>
              <label htmlFor="cp-message" className="contact-field__label">Message</label>
              <textarea
                id="cp-message"
                className="contact-field__input contact-field__textarea"
                placeholder="Tell me about your project…"
                rows={5}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
              />
              <span className="contact-field__underline" />
            </div>

            <button type="submit" className="contact-submit">
              <span className="contact-submit__text">Send Message</span>
              <span className="contact-submit__arrow">→</span>
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <div ref={footerRef} className="contact-footer contact-page__footer">
        <span className="contact-footer__copy">© 2025 Adze & Axis. All rights reserved.</span>
        <span className="contact-footer__mono">[ ARCHITECTURE ]</span>
      </div>
    </div>
  );
}
