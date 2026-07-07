import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import PrimerLink from "@/ui/link/PrimerLink";
import PrimerButton from "@/ui/button/PrimerButton";
import useMusic from "@/hooks/useMusic";

import gsap from "gsap";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["tr", "en"];

const BRAND = "rshv".split("");

const SOCIALS = [
  { label: "instagram", href: "https://www.instagram.com/rhish.xd" },
  { label: "github", href: "https://github.com/rhishavhere" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { playing: musicPlaying, toggle: toggleMusic } = useMusic();

  const islandRef = useRef(null);
  const overlayRef = useRef(null);
  const brandNameRef = useRef(null);
  const brandCharsRef = useRef([]);
  const toggleLabelRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef(null);
  const sidesRef = useRef([]);
  const firstLinkRef = useRef(null);
  const tlRef = useRef(null);
  const firstRun = useRef(true);

  // pages: home, about, manifest, projects, contact
  const NAV_ITEMS = [
    { to: "/", label: t("nav.home") },
    {
      to: "/about-me",
      label: t("nav.about"),
      prefetch: () => import("@/pages/about/AboutPage"),
    },
    {
      to: "/manifest",
      label: t("nav.manifest"),
      prefetch: () => import("@/pages/manifest/ManifestPage"),
    },
    {
      to: "/projects",
      label: t("nav.projects"),
      prefetch: () => import("@/pages/projects/ProjectsPage"),
    },
    { to: "/contact-me", label: t("nav.contact") },
  ];

  // notch open/closed dimensions derived from em scale (aligned with type-scale).
  const getMetrics = () => {
    const fs = parseFloat(getComputedStyle(document.body).fontSize) || 12;
    const vw = window.innerWidth;
    const mobile = vw <= 600;
    return {
      closedW: (mobile ? 13 : 16) * fs,
      closedH: 2.6 * fs,
      closedR: 1.3 * fs,
      openW: mobile ? Math.min(vw - 2 * fs, 26 * fs) : 22 * fs,
      openH: (mobile ? 30 : 27) * fs,
      openR: 1.6 * fs,
    };
  };

  // open/close: GSAP timeline + accessibility (inert, scroll lock, focus).
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    [main, footer].forEach((el) => {
      if (!el) return;
      el.inert = isOpen;
      if (isOpen) el.setAttribute("aria-hidden", "true");
      else el.removeAttribute("aria-hidden");
    });

    const links = linksRef.current.filter(Boolean);
    const chars = brandCharsRef.current.filter(Boolean);

    // first render: no animation, snap to closed state instantly (avoid flash).
    if (firstRun.current) {
      firstRun.current = false;
      gsap.set(links, { autoAlpha: 0, y: 14 });
      gsap.set(socialRef.current, { autoAlpha: 0, y: 8 });
      gsap.set(chars, { yPercent: 110, autoAlpha: 0 });
      gsap.set(brandNameRef.current, { width: 0 });
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(sidesRef.current, { autoAlpha: 1 });
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const d = (x) => (reduce ? 0 : x);
    const m = getMetrics();

    tlRef.current?.kill();
    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    tlRef.current = tl;

    if (isOpen) {
      tl.to(sidesRef.current, { autoAlpha: 0, duration: d(0.8) }, 0)
        .to(overlayRef.current, { autoAlpha: 1, duration: d(0.33) }, 0)
        .to(
          islandRef.current,
          {
            width: m.openW,
            height: m.openH,
            borderRadius: m.openR,
            duration: d(0.8),
          },
          0,
        )
        // brackets spread apart; letters stack up from below like a counter
        .to(
          brandNameRef.current,
          { width: "auto", duration: d(0.66), ease: "hop" },
          d(0.8),
        )
        .to(
          chars,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: d(0.66),
            ease: "butter",
            stagger: d(0.06),
          },
          d(0.8),
        )
        .fromTo(
          toggleLabelRef.current,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: d(0.2), ease: "butter" },
          d(0.1),
        )
        .to(
          links,
          {
            autoAlpha: 1,
            y: 0,
            duration: d(0.3),
            ease: "butter",
            stagger: d(0.07),
          },
          d(0.3),
        )
        .to(
          socialRef.current,
          { autoAlpha: 1, y: 0, duration: d(0.4) },
          d(0.45),
        );

      if (!reduce) {
        requestAnimationFrame(() => firstLinkRef.current?.focus());
      }
    } else {
      tl.fromTo(
        toggleLabelRef.current,
        { yPercent: -120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: d(0.33), ease: "butter" },
        0,
      )
        .to(
          links,
          { autoAlpha: 0, y: 0, duration: d(0.2), stagger: d(0.03) },
          0,
        )
        .to(socialRef.current, { autoAlpha: 0, y: 8, duration: d(0.2) }, 0)
        .to(
          chars,
          { yPercent: 110, autoAlpha: 0, duration: d(0.3), stagger: d(0.03) },
          0,
        )
        .to(
          brandNameRef.current,
          { width: 0, duration: d(0.4), ease: "hop" },
          d(0.05),
        )
        .to(overlayRef.current, { autoAlpha: 0, duration: d(0.4) }, 0)
        .to(
          islandRef.current,
          {
            width: m.closedW,
            height: m.closedH,
            borderRadius: m.closedR,
            duration: d(0.5),
            // on close, clear px so em scale (resize) takes effect again.
            clearProps: "width,height,borderRadius",
          },
          d(0.12),
        )
        .to(sidesRef.current, { autoAlpha: 1, duration: d(0.3) }, d(0.3));
    }

    // when open, resize the panel to new dimensions on window resize.
    const handleResize = () => {
      if (!isOpen) return;
      const mm = getMetrics();
      gsap.set(islandRef.current, {
        width: mm.openW,
        height: mm.openH,
        borderRadius: mm.openR,
      });
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab" || !isOpen || !islandRef.current) return;

      const focusable = islandRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // on unmount, always restore scroll lock and inert.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      const footer = document.querySelector("footer");
      [main, footer].forEach((el) => {
        if (!el) return;
        el.inert = false;
        el.removeAttribute("aria-hidden");
      });
    };
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const toggleLanguage = () => {
    const current = LANGUAGES.indexOf(i18n.language.split("-")[0]);
    i18n.changeLanguage(LANGUAGES[(current + 1) % LANGUAGES.length]);
  };

  return (
    <>
      <div className={styles.barLeft} ref={(el) => (sidesRef.current[0] = el)}>
        <PrimerLink
          href="/contact-me"
          buttonText={t("nav.contact")}
          onClick={close}
          random
        />
      </div>
      <div className={styles.barRight} ref={(el) => (sidesRef.current[1] = el)}>
        <PrimerButton
          onClick={toggleLanguage}
          buttonText={i18n.language.split("-")[0]}
          ariaLabel={t("nav.language_toggle")}
          random
        />
      </div>

      <div ref={islandRef} className={styles.island} data-open={isOpen}>
        <Link
          to="/"
          className={styles.brand}
          onClick={close}
          aria-label="rshv, home"
        >
          <span className={styles.bracket} aria-hidden="true">
            [
          </span>
          <span className={styles.brandName} ref={brandNameRef}>
            {BRAND.map((ch, i) => (
              <span
                key={i}
                className={styles.brandChar}
                ref={(el) => (brandCharsRef.current[i] = el)}
              >
                {ch}
              </span>
            ))}
          </span>
          <span className={styles.bracket} aria-hidden="true">
            ]
          </span>
        </Link>

        <button
          className={styles.toggle}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="nav-panel"
          aria-label={isOpen ? t("nav.menu_close") : t("nav.menu_open")}
        >
          <span className={styles.toggleLabel} ref={toggleLabelRef}>
            {isOpen ? t("nav.close_btn") : t("nav.menu_btn")}
          </span>
        </button>

        {/* top-left corner: music control when open — pause/resume while browsing */}
        <button
          type="button"
          className={styles.music}
          onClick={toggleMusic}
          aria-pressed={musicPlaying}
          aria-label={musicPlaying ? t("music.pause") : t("music.play")}
          tabIndex={isOpen ? 0 : -1}
        >
          <span
            className={styles.musicDot}
            data-on={musicPlaying}
            aria-hidden="true"
          />
          <span className={styles.musicLabel}>
            {musicPlaying ? t("music.pause") : t("music.play")}
          </span>
        </button>

        <nav
          id="nav-panel"
          className={styles.links}
          aria-label={t("nav.menu_label")}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              ref={(el) => {
                linksRef.current[i] = el;
                if (i === 0) firstLinkRef.current = el;
              }}
              className={styles.link}
              onMouseEnter={item.prefetch}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.social} ref={socialRef}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              className={styles.socialLink}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} profile`}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div
        ref={overlayRef}
        className={styles.overlay}
        onClick={close}
        aria-hidden="true"
      />
    </>
  );
}
