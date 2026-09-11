import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Building2, Ruler, Users, Calendar, MapPin, Utensils, Sparkles, Layers } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

// URLs de imágenes alojadas en Flickr
const BANNER_URL = "https://live.staticflickr.com/65535/55521139214_6c9f39ea14_b.jpg";

const MAIN_IMAGES = [
  "https://live.staticflickr.com/65535/55521087768_de98c025e2_b.jpg",
  "https://live.staticflickr.com/65535/55521139169_6e0bbb2657_b.jpg",
];

const KITCHEN_IMAGES = [
  "https://live.staticflickr.com/65535/55520985556_e948bbefdd_b.jpg",
  "https://live.staticflickr.com/65535/55521139159_115fd8a5a6_b.jpg",
];

// Configuración del collage principal
const collageImages = [
  {
    src: MAIN_IMAGES[0],
    label: "Exterior Architecture",
    description: "Modern, thoughtful architectural lines integrated into the urban fabric of Berkeley.",
  },
  {
    src: MAIN_IMAGES[1],
    label: "Interior Living Experience",
    description: "Open spatial layouts designed for seamless flow, high ceiling heights, and refined natural illumination.",
  },
];

function Banner() {
  return (
    <div className="relative w-full aspect-[21/9] overflow-hidden rounded-sm bg-muted">
      <img
        src={BANNER_URL}
        alt="Palmetto Berkeley — Architectural Design Project"
        loading="eager"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl">
        <p className="text-background/80 text-sm tracking-[0.2em] uppercase reveal reveal-fade">
          Palmetto Berkeley · Residential & Architectural Design
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-background mt-2 leading-[1.1] reveal reveal-up">
          Urban refinement <br className="hidden sm:block" />in Berkeley.
        </h1>
        <p className="text-background/80 mt-3 max-w-lg text-sm md:text-base reveal reveal-fade">
          A modern residential concept crafted around warm minimalism, precise craftsmanship, and fluid indoor-outdoor connectivity.
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
              alt={`Palmetto Berkeley — ${img.label}`}
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
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
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

      <div className="reveal reveal-fade bg-muted/30 rounded-lg p-6 border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {collageImages[activeIndex].description}
        </p>
      </div>
    </div>
  );
}

function OverviewSection() {
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
    <section id="overview" className="relative py-20 md:py-32 px-6 lg:px-10 overflow-hidden">
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -left-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade">07 — Architecture & Interior Design</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
              <em className="italic text-accent">Palmetto</em> Berkeley
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              Berkeley, CA · East Bay Living
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            A boutique architectural undertaking situated in Berkeley, balancing contemporary geometry with organic interior finishes.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            <Collage />
          </div>

          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Project Overview
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl">Harmonious architectural space.</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Palmetto Berkeley embraces high-performance architectural envelope design with bespoke interior details. Created for modern lifestyles, the layout prioritizes quiet luxury, durable material selections, and light-filled spatial transitions.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Ruler className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scale & Area</p>
                  <p className="text-xs text-muted-foreground">4,800 SF · Custom Residence</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scope</p>
                  <p className="text-xs text-muted-foreground">Architecture · Interiors · FF&E</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-xs text-muted-foreground">Completed · 2026</p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm border-t border-border/70 pt-6">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Berkeley, CA
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>2026</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function NarrativeSection() {
  return (
    <section className="py-20 bg-muted/20 border-y border-border/40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-xs font-medium tracking-widest uppercase text-accent">
              Design Philosophy
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display leading-tight">
            Curated textures, <br />tailored light.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every corner of Palmetto Berkeley reflects DECOBAY’s signature approach: pairing minimal visual noise with deep tactile richness. Monolithic natural stone surfaces are softened by custom architectural woodwork and warm, recessed ambient illumination.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-md bg-background border border-border/60">
              <Layers className="h-5 w-5 text-accent mb-2" />
              <p className="text-sm font-medium">Custom Joinery</p>
              <p className="text-xs text-muted-foreground mt-1">Integrated storage and seamless wall transitions.</p>
            </div>
            <div className="p-4 rounded-md bg-background border border-border/60">
              <Building2 className="h-5 w-5 text-accent mb-2" />
              <p className="text-sm font-medium">Urban Context</p>
              <p className="text-xs text-muted-foreground mt-1">Designed specifically to honor Berkeley’s landscape.</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="aspect-[4/3] rounded-sm overflow-hidden bg-muted border border-border/50 shadow-sm">
            <img
              src={MAIN_IMAGES[1]}
              alt="Palmetto Berkeley — Interior details"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function KitchenGallerySection() {
  return (
    <section id="kitchen" className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-accent" />
            <span className="text-xs font-medium tracking-widest uppercase text-accent">
              Culinary & Kitchen Studio
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display">Bespoke Kitchen Architecture</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            The culinary hub serves as the heart of the residence, featuring concealed cabinetry, stone island focal points, and warm ergonomic layout planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {KITCHEN_IMAGES.map((url, idx) => (
            <div key={idx} className="group space-y-4">
              <div className="aspect-[16/11] rounded-sm overflow-hidden bg-muted border border-border/40 relative">
                <img
                  src={url}
                  alt={`Palmetto Berkeley — Kitchen Space ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground border-b border-border/40 pb-3">
                <span className="font-medium text-foreground">Kitchen Perspective 0{idx + 1}</span>
                <span>Custom Millwork & Stone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PalmettoBerkeleyPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <article>
        <Banner />
        <div className="pt-8 md:pt-12">
          <OverviewSection />
          <NarrativeSection />
          <KitchenGallerySection />
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

export const Route = createFileRoute("/berkeley")({
  head: () => ({
    meta: [
      { title: "Palmetto Berkeley — Architecture & Interiors | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Palmetto Berkeley: A modern architectural & interior design project by DECOBAY Interiors located in Berkeley, California.",
      },
      {
        name: "keywords",
        content:
          "Palmetto Berkeley, architecture, interior design, Berkeley California, DECOBAY Interiors, residential architecture",
      },
      { property: "og:title", content: "Palmetto Berkeley — Architecture & Interior Design" },
      {
        property: "og:description",
        content:
          "Explore Palmetto Berkeley by DECOBAY Interiors — custom architectural design and bespoke kitchen spaces in Berkeley, CA.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/palmetto-berkeley" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Palmetto Berkeley — Architecture Project" },
      {
        name: "twitter:description",
        content:
          "Bespoke residential architecture and interior design in Berkeley, California by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/palmetto-berkeley" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Palmetto Berkeley",
          about: "Architectural and interior design project in Berkeley, California",
          url: "https://deco-bay-dream.lovable.app/palmetto-berkeley",
          locationCreated: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Berkeley",
              addressRegion: "CA",
              addressCountry: "US",
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
              name: "Palmetto Berkeley",
              item: "https://deco-bay-dream.lovable.app/palmetto-berkeley",
            },
          ],
        }),
      },
    ],
  }),
  component: PalmettoBerkeleyPage,
});