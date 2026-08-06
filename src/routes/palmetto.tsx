import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Move, Building2, Ruler, Users, Calendar, MapPin } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

// Imágenes del proyecto (solo las locales)
import img1 from "@/assets/PalmettoSanRamon/SR3_02v3.jpg";
import img2 from "@/assets/PalmettoSanRamon/SR3_01v3.jpg";
import img3 from "@/assets/PalmettoSanRamon/SR3_03v3.jpg";
import pano from "@/assets/PalmettoSanRamon/SR 360.jpg";

// Banner desde URL externa
const BANNER_URL = "https://live.staticflickr.com/65535/55446000367_dfbe1964ef_b.jpg";

// Configuración del collage
const collageImages = [
  { 
    src: img1, 
    label: "Main facade",
    description: "The clean, modern facade establishes a strong retail presence along the main thoroughfare."
  },
  { 
    src: img2, 
    label: "Interior space",
    description: "Open, flexible interior volumes designed for diverse commercial tenants and future adaptability."
  },
  { 
    src: img3, 
    label: "Material detail",
    description: "A carefully curated material palette of glass, steel, and stone balances durability with sophistication."
  },
];

function Banner() {
  return (
    <div className="relative w-full aspect-[21/9] overflow-hidden rounded-sm bg-muted">
      <img
        src={BANNER_URL}
        alt="Palmetto San Ramon — Commercial Architecture Project"
        loading="eager"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Badge superpuesto */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <span className="px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm text-background text-xs font-medium tracking-[0.2em] uppercase border border-background/20">
          Commercial · Mixed-use
        </span>
      </div>
      
      {/* Texto del banner */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl">
        <p className="text-background/80 text-sm tracking-[0.2em] uppercase reveal reveal-fade">
          Palmetto San Ramon
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-background mt-2 leading-[1.1] reveal reveal-up">
          A new anchor for <br className="hidden sm:block" />San Ramon.
        </h1>
        <p className="text-background/80 mt-3 max-w-lg text-sm md:text-base reveal reveal-fade">
          A mixed-use commercial development designed to activate the street edge and create a 
          vibrant new destination in the East Bay.
        </p>
      </div>
    </div>
  );
}

function Collage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActiveIndex((v) => (v + 1) % collageImages.length), []);
  const prev = useCallback(() => setActiveIndex((v) => (v - 1 + collageImages.length) % collageImages.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="space-y-6">
      <div
        className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {collageImages.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)] ${
              idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={img.src}
              alt={`Palmetto San Ramon — ${img.label}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        <div className="absolute bottom-5 left-5 text-background/95">
          <p className="kicker !text-background/70">
            Project · {String(activeIndex + 1).padStart(2, "0")} / {String(collageImages.length).padStart(2, "0")}
          </p>
          <p className="font-display text-xl mt-1">{collageImages[activeIndex].label}</p>
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
          {collageImages.map((_, idx) => (
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

      {/* Descripción activa con efecto reveal */}
      <div className="reveal reveal-fade bg-muted/30 rounded-lg p-6 border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {collageImages[activeIndex].description}
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
          alt="Palmetto San Ramon 3D — drag to explore the commercial space"
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
            Drag to explore the 3D commercial space
          </div>
        </div>

        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] tracking-[0.2em] uppercase">
          3D · Interactive
        </span>
      </div>
    </div>
  );
}

function PalmettoSection() {
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
    <section id="palmetto" className="relative py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -left-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade">06 — Commercial architecture</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
              <em className="italic text-accent">Palmetto</em> San Ramon
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              San Ramon, CA · Mixed-use commercial
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            A ground-up commercial development that redefines the retail experience in San Ramon. 
            Designed to activate the street edge and create a new community gathering point.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Columna izquierda: collage */}
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            <Collage />
          </div>

          {/* Columna derecha: información del proyecto */}
          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Project Overview
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl">A new commercial <br className="hidden sm:block" />anchor.</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Palmetto San Ramon is a 12,000 SF mixed-use development designed to bring a new level 
              of architectural sophistication to the East Bay retail landscape. The project features 
              flexible commercial spaces, a central courtyard, and a material palette that balances 
              durability with contemporary elegance.
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Ruler className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Size</p>
                  <p className="text-xs text-muted-foreground">12,000 SF · Mixed-use</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Tenant mix</p>
                  <p className="text-xs text-muted-foreground">Retail · Office · Hospitality</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-xs text-muted-foreground">Under construction · 2026</p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm border-t border-border/70 pt-6">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  San Ramon, CA
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span>Commercial · Mixed-use</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>2026</span>
              </li>
            </ul>
          </div>

          {/* Sección panorámica 3D */}
          <div className="reveal reveal-zoom col-span-12 mt-8 md:mt-12">
            <div className="mb-4">
              <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Explore the 3D commercial space
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Drag to look around the fully modeled 3D environment
              </p>
            </div>
            <Panorama />
          </div>
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          Commercial architecture · Designed in California
        </p>
      </div>
    </section>
  );
}

function PalmettoPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <article>
        <Banner />
        <div className="pt-8 md:pt-12">
          <PalmettoSection />
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
        </div>
      </article>
      <Footer />
    </main>
  );
}

export const Route = createFileRoute("/palmetto")({
  head: () => ({
    meta: [
      { title: "Palmetto San Ramon — Commercial Architecture | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Palmetto San Ramon: a 12,000 SF mixed-use commercial development by DECOBAY Interiors. Explore the gallery, design brief, and interactive 3D walkthrough.",
      },
      {
        name: "keywords",
        content:
          "Palmetto San Ramon, commercial architecture, mixed-use development, San Ramon retail, DECOBAY Interiors, 3D commercial walkthrough",
      },
      { property: "og:title", content: "Palmetto San Ramon — Commercial Architecture Project" },
      {
        property: "og:description",
        content:
          "A 12,000 SF mixed-use commercial development in San Ramon. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/palmetto" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Palmetto San Ramon — Commercial Architecture Project" },
      {
        name: "twitter:description",
        content:
          "A 12,000 SF mixed-use commercial development in San Ramon. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/palmetto" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Palmetto San Ramon",
          about: "Commercial architecture mixed-use development in San Ramon, California",
          url: "https://deco-bay-dream.lovable.app/palmetto",
          locationCreated: {
            "@type": "Place",
            address: { 
              "@type": "PostalAddress", 
              addressLocality: "San Ramon",
              addressRegion: "CA", 
              addressCountry: "US" 
            },
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
              name: "Palmetto San Ramon",
              item: "https://deco-bay-dream.lovable.app/palmetto",
            },
          ],
        }),
      },
    ],
  }),
  component: PalmettoPage,
});