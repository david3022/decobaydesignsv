import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Move,
  Sparkles,
  Maximize2,
  Clock,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

const banner1 = "https://live.staticflickr.com/65535/55590618625_078e899065_b.jpg";
const banner2 = "https://live.staticflickr.com/65535/55590323978_34bc92e40b_b.jpg";
const local1 = "https://live.staticflickr.com/65535/55590323963_b015a2b2cb_b.jpg";
const local2 = "https://live.staticflickr.com/65535/55590216206_3e874eb607_b.jpg";
const local3 = "https://live.staticflickr.com/65535/55590618665_8fe2f8bb3f_b.jpg";
const logo = "https://live.staticflickr.com/65535/55590216106_99a2e25ca6_b.jpg";
const mascot1 = "https://live.staticflickr.com/65535/55590323938_f960afd939_b.jpg";
const mascot2 = "https://live.staticflickr.com/65535/55589171142_6277aaf292_b.jpg";
const people = "https://live.staticflickr.com/65535/55589171127_57ce7726a2_z.jpg";

const localImages = [
  {
    src: local1,
    label: "The Space",
    description:
      "The finished commercial space — designed for flow, speed, and a welcoming fast-casual experience.",
    badge: "Built",
  },
  {
    src: local2,
    label: "The Counter",
    description:
      "A service counter built for high-volume ordering without losing the brand's warm, island-inspired feel.",
    badge: "Built",
  },
  {
    src: local3,
    label: "The Dining Area",
    description:
      "Seating and lighting designed to keep guests comfortable and moving — the heart of the Shootz experience.",
    badge: "Built",
  },
];

function LocalDisplay() {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => setActiveIndex((v) => (v + 1) % localImages.length), []);
  const prev = useCallback(
    () => setActiveIndex((v) => (v - 1 + localImages.length) % localImages.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="space-y-6">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {localImages.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)] ${
              idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={img.src}
              alt={`Shootz commercial space — ${img.label}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur bg-emerald-500/80 text-white">
                {img.badge}
              </span>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-5 left-5 text-background/95">
          <p className="kicker !text-background/70">
            Shootz · {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(localImages.length).padStart(2, "0")}
          </p>
          <p className="font-display text-xl mt-1">{localImages[activeIndex].label}</p>
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
          {localImages.map((_, idx) => (
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
          {localImages[activeIndex].description}
        </p>
      </div>
    </div>
  );
}

function ShootzSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * 0.08}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="shootz-build" className="relative py-12 md:py-32 px-6 lg:px-10 overflow-hidden">
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -right-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Banner modificado con altura mínima adaptable y padding interno para móviles */}


        <div className="reveal reveal-zoom relative mb-14 overflow-hidden rounded-sm min-h-[420px] sm:min-h-[460px] md:min-h-[520px] flex items-center">
  {/* Imagen de fondo */}
  <img
    src={banner1}
    alt="Shootz — Hawaiian-inspired fast casual"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Capas de opacidad para asegurar contraste */}
  <div className="absolute inset-0 bg-black/40" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/40 md:from-black/90 md:via-black/60 md:to-transparent" />

  {/* Contenido */}
  <div className="relative z-10 py-12 px-6 sm:px-8 lg:px-10 w-full">
    <div className="max-w-3xl">
      
      {/* Título principal */}
      <h1 className="reveal reveal-up text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.15] md:leading-[0.95] text-white font-normal drop-shadow-xl">
        Shootz — a <em className="italic text-accent">commercial Design</em> by DECOBAY.
      </h1>

      {/* Descripción */}
      <p className="reveal reveal-fade mt-4 max-w-xl text-white/90 text-xs sm:text-sm md:text-lg drop-shadow-md leading-relaxed">
        See how DECOBAY Interiors designed and built the Shootz commercial space — from
        layout and construction to branding and atmosphere. Explore the gallery and the
        finished space below.
      </p>

      {/* Kicker abajo y en una sola línea (con scroll sutil por si la pantalla es muy chica) */}
      <div className="mt-6 overflow-x-auto no-scrollbar">
        <p className="kicker reveal reveal-fade !text-white font-medium text-xs sm:text-sm tracking-wide uppercase drop-shadow whitespace-nowrap">
  Featured project · Southern California
</p>
      </div>

    </div>
  </div>
</div>


        {/* <div className="reveal reveal-zoom relative mb-14 overflow-hidden rounded-sm min-h-[380px] sm:min-h-[440px] md:min-h-[520px] flex items-center">
          <img
            src={banner1}
            alt="Shootz — Hawaiian-inspired fast casual"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent md:from-black/90 md:via-black/60 md:to-transparent" />

          <div className="relative z-10 py-10 px-6 sm:px-8 lg:px-10 w-full">
            <div className="max-w-3xl">
              

              <h1 className="reveal reveal-up mt-3 text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[0.95] text-white font-normal drop-shadow-xl">
                Shootz — a <em className="italic text-accent">commercial Design</em> by DECOBAY.
              </h1>
              <p className="kicker reveal reveal-fade !text-white/90 drop-shadow">
                Featured project · Southern California
              </p>

              <p className="reveal reveal-fade mt-4 max-w-xl text-white/90 text-sm sm:text-base md:text-lg drop-shadow-md">
                See how DECOBAY Interiors designed and built the Shootz commercial space — from
                layout and construction to branding and atmosphere. Explore the gallery and the
                finished space below.
              </p>
            </div>
          </div>
        </div> */}

        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade">Designed &amp; built by DECOBAY</p>
            <h2 className="reveal reveal-up mt-4 text-3xl md:text-6xl">
              <em className="italic text-accent">Hawaiian-Inspired Food,</em> Made From the Soul
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              Southern California · Commercial Build-Out
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            Shootz is more than a restaurant — it's a movement. DECOBAY designed and built the
            commercial space that brings that movement to life, expanding across Southern California
            and beyond.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            <LocalDisplay />
          </div>

          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Commercial Build-Out
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl">
              Built for <br className="hidden sm:block" />
              the brand.
            </h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              DECOBAY handled the full design and construction of the Shootz commercial space — from
              layout and flow to finishes and brand identity. The result is a fast-casual
              environment that feels warm, fast, and unmistakably Shootz.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <img
                src={logo}
                alt="Shootz logo"
                className="h-14 w-14 rounded-full object-cover border border-border/60"
              />
              <div>
                <p className="text-sm font-medium">Shootz</p>
                <p className="text-xs text-muted-foreground">Hawaiian-Inspired Fast Casual</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-xs text-muted-foreground">Complete commercial build-out</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scope</p>
                  <p className="text-xs text-muted-foreground">Design · Construction · Branding</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Key features</p>
                  <p className="text-xs text-muted-foreground">
                    Open layout · Fast-casual flow · Island-inspired finishes
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm border-t border-border/70 pt-6">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>Southern California</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Client</span>
                <span>Shootz</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>2025</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8 mt-16 md:mt-24 items-center">
          <div className="reveal reveal-left col-span-12 md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
            <img
              src={people}
              alt="Shootz people"
              width={275}
              height={677}
              className="rounded-sm object-cover border border-border/50 w-full max-w-[275px] h-auto"
            />
          </div>

          <div className="reveal reveal-right col-span-12 md:col-span-8 lg:col-span-9">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                The Community
              </span>
            </div>
            <h4 className="text-2xl md:text-3xl">
              A following built on <em className="italic text-accent">real connection.</em>
            </h4>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Shootz has built one of the most engaged followings of any independent fast-casual
              brand in Southern California. Our content consistently generates organic reach through
              food influencers, customer-created videos, and brand-driven storytelling — and DECOBAY
              built the space that makes it all possible.
            </p>

            <div className="mt-8">
              <h5 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                The Mascots
              </h5>
              <div className="flex gap-4">
                <img
                  src={mascot1}
                  alt="Shootz mascot"
                  className="w-1/2 max-w-[180px] rounded-sm object-cover aspect-[3/4]"
                />
                <img
                  src={mascot2}
                  alt="Shootz mascot alternate"
                  className="w-1/2 max-w-[180px] rounded-sm object-cover aspect-[3/4]"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Brand mascots designed to carry the Shootz personality across the space and beyond.
              </p>
            </div>
          </div>
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          Commercial space designed &amp; built by DECOBAY
        </p>
      </div>
    </section>
  );
}

function ShootzPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      {/* Reducido el espacio superior en mobile de pt-8 md:pt-12 a pt-2 md:pt-6 */}
      <article className="pt-2 md:pt-6">
        <ShootzSection />

        <div className="reveal reveal-zoom max-w-7xl mx-auto px-6 lg:px-10 mt-16 mb-16 overflow-hidden rounded-sm">
          <img src={banner2} alt="Shootz banner" className="w-full h-auto object-cover" />
        </div>

        <Consultation />
        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 flex flex-wrap gap-4 text-sm"
        >
          <Link to="/" className="underline underline-offset-4 hover:text-accent transition-colors">
            ← Back to DECOBAY Interiors
          </Link>
          <Link
            to="/"
            hash="projects"
            className="underline underline-offset-4 hover:text-accent transition-colors"
          >
            More projects
          </Link>
        </nav>
      </article>
      <Footer />
    </main>
  );
}

export const Route = createFileRoute("/shootz")({
  head: () => ({
    meta: [
      { title: "Shootz — Commercial Build-Out | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Shootz commercial build-out by DECOBAY Interiors. Hawaiian-inspired fast casual designed and built in Southern California.",
      },
      {
        name: "keywords",
        content:
          "Shootz, commercial build-out, fast casual design, Southern California restaurant, DECOBAY Interiors, Hawaiian-inspired restaurant",
      },
      { property: "og:title", content: "Shootz Commercial Build-Out — DECOBAY Interiors" },
      {
        property: "og:description",
        content:
          "Hawaiian-Inspired Food, Made From the Soul. Designed and built by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/shootz" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shootz Commercial Build-Out — DECOBAY Interiors" },
      {
        name: "twitter:description",
        content:
          "Hawaiian-Inspired Food, Made From the Soul. Designed and built by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/shootz" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Shootz Commercial Build-Out",
          about:
            "Commercial design and construction project by DECOBAY Interiors in Southern California",
          url: "https://deco-bay-dream.lovable.app/shootz",
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
              name: "Shootz Commercial Build-Out",
              item: "https://deco-bay-dream.lovable.app/shootz",
            },
          ],
        }),
      },
    ],
  }),
  component: ShootzPage,
});