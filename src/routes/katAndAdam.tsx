import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Move, Sparkles, Maximize2, Clock, CheckCircle2 } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

import s1 from "@/assets/KatAndAdam/k.jpg";
import s2 from "@/assets/KatAndAdam/k2.jpg";
import pano from "@/assets/KatAndAdam/k3.jpg";

// Imágenes individuales con su descripción
const images = [
  { 
    src: s1, 
    label: "Before", 
    description: "The original kitchen — dark, closed-off, and lacking the natural flow the family needed.",
    badge: "Before"
  },
  { 
    src: s2, 
    label: "After", 
    description: "The transformed kitchen — open, light-filled, and designed for modern living.",
    badge: "After"
  },
];

function ImageDisplay() {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => setActiveIndex((v) => (v + 1) % images.length), []);
  const prev = useCallback(() => setActiveIndex((v) => (v - 1 + images.length) % images.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="space-y-6">
      {/* Vista principal con carrusel suave */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {images.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)] ${
              idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={img.src}
              alt={`Kat & Adam kitchen — ${img.label}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {/* Badge superpuesto */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur ${
                img.badge === "Before" 
                  ? "bg-amber-500/80 text-white" 
                  : "bg-emerald-500/80 text-white"
              }`}>
                {img.badge}
              </span>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-5 left-5 text-background/95">
          <p className="kicker !text-background/70">
            Kat & Adam · {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <p className="font-display text-xl mt-1">{images[activeIndex].label}</p>
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 right-5 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${
                idx === activeIndex ? "w-8 bg-background" : "w-3 bg-background/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Descripción activa */}
      <div className="reveal reveal-fade bg-muted/30 rounded-lg p-6 border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {images[activeIndex].description}
        </p>
      </div>
    </div>
  );
}

function Panorama() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hint, setHint] = useState(true);
  const drag = useRef<{ active: boolean; startX: number; startOffset: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
  });
  const [offset, setOffset] = useState(0);

  const maxOffset = useCallback(() => {
    const wrap = wrapRef.current,
      img = imgRef.current;
    if (!wrap || !img) return 0;
    return Math.max(0, img.clientWidth - wrap.clientWidth);
  }, []);

  useEffect(() => {
    let raf = 0;
    let dir = 1;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!drag.current.active && hint) {
        setOffset((o) => {
          const m = maxOffset();
          if (m <= 0) return o;
          let nv = o + dir * 18 * dt;
          if (nv > m) {
            nv = m;
            dir = -1;
          }
          if (nv < 0) {
            nv = 0;
            dir = 1;
          }
          return nv;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hint, maxOffset]);

  const onDown = (clientX: number) => {
    drag.current = { active: true, startX: clientX, startOffset: offset };
    setHint(false);
  };
  const onMove = (clientX: number) => {
    if (!drag.current.active) return;
    const m = maxOffset();
    const dx = drag.current.startX - clientX;
    const nv = Math.min(m, Math.max(0, drag.current.startOffset + dx));
    setOffset(nv);
  };
  const onUp = () => {
    drag.current.active = false;
  };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onUp}
      >
        <img
          ref={imgRef}
          src={pano}
          alt="Kat & Adam 3D kitchen — drag to look around"
          draggable={false}
          className="absolute top-0 left-0 h-full max-w-none pointer-events-none"
          style={{ transform: `translateX(${-offset}px)` }}
        />

        <div
          className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-500 ${
            hint ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur text-xs">
            <Move className="h-3.5 w-3.5" />
            Drag to explore the 3D kitchen
          </div>
        </div>

        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] tracking-[0.2em] uppercase">
          3D · Interactive
        </span>
      </div>
    </div>
  );
}

function KatAndAdamSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -0.08}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="kitchen-remodel" className="relative py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -right-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade"> You are just</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
              <em className="italic text-accent">3 Weeks away from</em> your new Kitchen
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              California · Complete renovation
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            From dark and closed-off to light and open — a complete kitchen transformation that
            reimagines how this California family lives, cooks, and gathers.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Columna izquierda: imágenes del carrusel */}
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            <ImageDisplay />
          </div>

          {/* Columna derecha: información del proyecto */}
          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Before & After
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl">From dark to <br className="hidden sm:block" />light.</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The Kat & Adam kitchen remodel is a study in contrast — transforming a closed-off,
              dated space into an open, light-filled heart of the home. Natural materials,
              thoughtful storage, and a calm palette bring new life to this California residence.
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-xs text-muted-foreground">6 weeks · Complete renovation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scope</p>
                  <p className="text-xs text-muted-foreground">Full kitchen remodel</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Key features</p>
                  <p className="text-xs text-muted-foreground">Open layout · Natural light · Oak & stone</p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm border-t border-border/70 pt-6">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>California</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>2025</span>
              </li>
            </ul>
          </div>

          {/* Sección panorámica 3D */}
          <div className="reveal reveal-zoom col-span-12 mt-8 md:mt-12">
            <div className="mb-4">
              <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Explore the 3D kitchen
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Drag to look around the fully modeled 3D space
              </p>
            </div>
            <Panorama />
          </div>
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          All projects designed &amp; produced in California
        </p>
      </div>
    </section>
  );
}

function KatAndAdamPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <article className="pt-24 md:pt-28">
        <header className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="kicker reveal reveal-fade">Featured project · California</p>
          <h1 className="reveal reveal-up mt-4 text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Kat & Adam — a <em className="italic text-accent">California</em> kitchen remodel.
          </h1>
          <p className="reveal reveal-fade mt-6 max-w-xl text-muted-foreground">
            See how DECOBAY Interiors transformed a dark, dated kitchen into a light-filled gathering
            space. Explore the before & after gallery and interactive 3D walkthrough below.
          </p>
        </header>
        <KatAndAdamSection />
        <Consultation />
        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 flex flex-wrap gap-4 text-sm"
        >
          <Link to="/" className="underline underline-offset-4 hover:text-accent transition-colors">
            ← Back to DECOBAY Interiors
          </Link>
          <Link to="/" hash="projects" className="underline underline-offset-4 hover:text-accent transition-colors">
            More projects
          </Link>
        </nav>
      </article>
      <Footer />
    </main>
  );
}

export const Route = createFileRoute("/katAndAdam")({
  head: () => ({
    meta: [
      { title: "Kat & Adam — Kitchen Remodel | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Kat & Adam kitchen remodel by DECOBAY Interiors. From dark to light — explore the before & after gallery and interactive 3D walkthrough.",
      },
      {
        name: "keywords",
        content:
          "Kat & Adam, kitchen remodel, California kitchen renovation, before and after kitchen, DECOBAY Interiors, 3D kitchen walkthrough",
      },
      { property: "og:title", content: "Kat & Adam Kitchen Remodel — California Interior Design" },
      {
        property: "og:description",
        content:
          "A complete kitchen transformation from dark to light. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/katAndAdam" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kat & Adam Kitchen Remodel — California Interior Design" },
      {
        name: "twitter:description",
        content:
          "A complete kitchen transformation from dark to light. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/katAndAdam" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Kat & Adam Kitchen Remodel",
          about: "Interior design kitchen renovation project in California",
          url: "https://deco-bay-dream.lovable.app/katAndAdam",
          locationCreated: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
          },
          creator: {
            "@type": "Organization",
            name: "DECOBAY Interiors",
            url: "https://deco-bay-dream.lovable.app/",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://deco-bay-dream.lovable.app/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Kat & Adam Kitchen Remodel",
              item: "https://deco-bay-dream.lovable.app/katAndAdam",
            },
          ],
        }),
      },
    ],
  }),
  component: KatAndAdamPage,
});