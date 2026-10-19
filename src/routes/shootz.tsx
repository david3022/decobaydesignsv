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
import SHOOTZVideo1 from "@/assets/shootzv.mp4";
import SHOOTZVideo2 from "@/assets/shootzv2.mp4";

const banner1 = "https://live.staticflickr.com/65535/55590618625_078e899065_b.jpg";
const banner2 = "https://live.staticflickr.com/65535/55590323978_34bc92e40b_b.jpg";
const logo = "https://live.staticflickr.com/65535/55590216106_99a2e25ca6_b.jpg";
const mascot1 = "https://live.staticflickr.com/65535/55590323938_f960afd939_b.jpg";
const mascot2 = "https://live.staticflickr.com/65535/55589171142_6277aaf292_b.jpg";
const heroImage = "https://live.staticflickr.com/65535/55595607749_5b28405022_b.jpg";

/* ============================================================
   NUEVAS SECCIONES (complemento)
   ============================================================ */

function ExtendedStorySection() {
  return (
    <>
      {/* ---------- SECCIÓN 2: Solo texto (imagen movida a sección 3) ---------- */}
      <div className="reveal reveal-fade mt-16 md:mt-24">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The dining experience is all around movement — warm materials, focused lighting, and a
          layout that feels open yet intimate.
        </p>
      </div>

      {/* ---------- SECCIÓN 3: 5 imágenes 16/9 con offset orgánico + texto de construcción ---------- */}
      <div className="reveal reveal-up mt-16 md:mt-24">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Columna izquierda: 3 imágenes, la segunda desplazada a la derecha */}
          <div className="col-span-12 md:col-span-6 space-y-6 md:space-y-8">
            <div className="relative overflow-hidden rounded-sm border border-border/50">
              <img
                src="https://live.staticflickr.com/65535/55595417886_05df9aa119_b.jpg"
                alt="Commercial lobby — SHOOTZ"
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-sm text-[0.65rem] tracking-wider uppercase backdrop-blur bg-black/40 text-white">
                Lobby
              </div>
            </div>
            <div className="relative overflow-hidden rounded-sm border border-border/50 md:ml-8">
              <img
                src="https://live.staticflickr.com/65535/55594389102_814e7f32f9_b.jpg"
                alt="Lobby detail with branding"
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-sm text-[0.65rem] tracking-wider uppercase backdrop-blur bg-black/40 text-white">
                Lobby detail
              </div>
            </div>
            <div className="relative overflow-hidden rounded-sm border border-border/50 md:ml-4">
              <img
                src="https://live.staticflickr.com/65535/55595417891_853aa59429_b.jpg"
                alt="SHOOTZ counter and seating detail"
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-sm text-[0.65rem] tracking-wider uppercase backdrop-blur bg-black/40 text-white">
                Counter · flow
              </div>
            </div>
          </div>

          {/* Columna derecha: 2 imágenes, desplazadas hacia arriba */}
          <div className="col-span-12 md:col-span-6 space-y-6 md:space-y-8 md:-mt-10">
            <div className="relative overflow-hidden rounded-sm border border-border/50">
              <img
                src="https://live.staticflickr.com/65535/55594389117_1ac751371b_b.jpg"
                alt="Commercial kitchen interior — SHOOTZ"
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-sm text-[0.65rem] tracking-wider uppercase backdrop-blur bg-black/40 text-white">
                Kitchen
              </div>
            </div>
            <div className="relative overflow-hidden rounded-sm border border-border/50 md:ml-6">
              <img
                src="https://live.staticflickr.com/65535/55595417881_befb954613_b.jpg"
                alt="Kitchen prep area and equipment"
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-sm text-[0.65rem] tracking-wider uppercase backdrop-blur bg-black/40 text-white">
                Kitchen · prep
              </div>
            </div>
          </div>
        </div>

        {/* Texto de construcción y diseño (en inglés) */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6 border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">
              Design &amp; construction integrity.
            </span>{" "}
            Every detail — from the flow of the lobby to the efficiency of the kitchen — was
            coordinated by DECOBAY Interiors. The commercial design balances high-volume
            operations with a warm, island-inspired aesthetic. Durable finishes, strategic lighting,
            and a layout that supports both staff and guests were developed simultaneously to ensure
            the space feels effortless. The result is a seamless environment where construction
            serves the brand, not the other way around.
          </p>
        </div>
      </div>

      {/* ---------- SECCIÓN 5: Puente hacia "The Community" ---------- */}
      <div className="reveal reveal-up mt-16 md:mt-24 border-t border-border/70 pt-10">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          Commercial space designed  by DECOBAY
        </p>
      </div>
    </>
  );
}

function SHOOTZSection() {
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
    <section id="SHOOTZ-build" className="relative py-12 md:py-32 px-6 lg:px-10 overflow-hidden">
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
            alt="SHOOTZ — Hawaiian-inspired fast casual"
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
                SHOOTZ — a <em className="italic text-accent">commercial Design</em> by DECOBAY.
              </h1>

              {/* Descripción */}
              <p className="reveal reveal-fade mt-4 max-w-xl text-white/90 text-xs sm:text-sm md:text-lg drop-shadow-md leading-relaxed">
                See how DECOBAY Interiors designed the SHOOTZ commercial space — from
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

        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade">Designed by DECOBAY</p>
            <h2 className="reveal reveal-up mt-4 text-3xl md:text-6xl">
              <em className="italic text-accent">Hawaiian-Inspired Food,</em> Made From the Soul
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">
              Southern California · Commercial Design
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            SHOOTZ is more than a restaurant — it's a movement. DECOBAY designed the
            commercial space that brings that movement to life, expanding across Southern California
            and beyond.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            {/* Imagen única en lugar del carrusel */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted">
              <img
                src={heroImage}
                alt="SHOOTZ dining area with warm lighting"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Commercial Design
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl">
              Designed for <br className="hidden sm:block" />
              the brand.
            </h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              DECOBAY handled the full design and construction of the SHOOTZ commercial space — from
              layout and flow to finishes and brand identity. The result is a fast-casual
              environment that feels warm, fast, and unmistakably SHOOTZ.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <img
                src={logo}
                alt="SHOOTZ logo"
                className="h-14 w-14 rounded-full object-cover border border-border/60"
              />
              <div>
                <p className="text-sm font-medium">SHOOTZ</p>
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
                  <p className="text-xs text-muted-foreground">Complete commercial design</p>
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
                <span>SHOOTZ</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span>2025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- PLANO: Movido aquí, justo debajo de la sección "Designed for the brand" ---------- */}
        <div className="reveal reveal-fade mt-16 md:mt-24">
          <div
            className="w-full overflow-hidden rounded-sm border border-border/50 bg-white/50 p-2"
            style={{ aspectRatio: "1267 / 416" }}
          >
            <img
              src="https://live.staticflickr.com/65535/55595607709_2518d07038_b.jpg"
              alt="SHOOTZ floor plan — commercial layout"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 tracking-[0.25em] uppercase text-center">
            Floor plan · SHOOTZ commercial{" "}
          </p>
        </div>

        {/* ── SECCIONES EXTENDIDAS: galerías ── */}
        <ExtendedStorySection />

        {/* ── SECCIÓN THE COMMUNITY (sin imagen "people", centrada) ── */}
        <div className="reveal reveal-up mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                The Community
              </span>
            </div>
            <h4 className="text-2xl md:text-3xl">
              A following designed on <em className="italic text-accent">real connection.</em>
            </h4>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              SHOOTZ has built one of the most engaged followings of any independent fast-casual
              brand in Southern California. Our content consistently generates organic reach through
              food influencers, customer-created videos, and brand-driven storytelling — and DECOBAY
              designed the space that makes it all possible.
            </p>

            <div className="mt-10">
              <h5 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
                The Mascots
              </h5>
              <div className="flex gap-6 justify-center">
                <img
                  src={mascot1}
                  alt="SHOOTZ mascot"
                  className="w-1/2 max-w-[200px] rounded-sm object-cover aspect-[3/4]"
                />
                <img
                  src={mascot2}
                  alt="SHOOTZ mascot alternate"
                  className="w-1/2 max-w-[200px] rounded-sm object-cover aspect-[3/4]"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Brand mascots designed to carry the SHOOTZ personality across the space and beyond
              </p>
            </div>
          </div>
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          Commercial space designed by DECOBAY
        </p>
      </div>
    </section>
  );
}

function SHOOTZPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      {/* Reducido el espacio superior en mobile de pt-8 md:pt-12 a pt-2 md:pt-6 */}
      <article className="pt-2 md:pt-6">
        <SHOOTZSection />

        <div className="reveal reveal-zoom max-w-7xl mx-auto px-6 lg:px-10 mt-16 mb-16 overflow-hidden rounded-sm">
          <img src={banner2} alt="SHOOTZ banner" className="w-full h-auto object-cover" />
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
      { title: "SHOOTZ — Commercial Build-Out | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "SHOOTZ commercial build-out by DECOBAY Interiors. Hawaiian-inspired fast casual designed in Southern California.",
      },
      {
        name: "keywords",
        content:
          "SHOOTZ, commercial build-out, fast casual design, Southern California restaurant, DECOBAY Interiors, Hawaiian-inspired restaurant",
      },
      { property: "og:title", content: "SHOOTZ Commercial Build-Out — DECOBAY Interiors" },
      {
        property: "og:description",
        content:
          "Hawaiian-Inspired Food, Made From the Soul. Designed by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/SHOOTZ" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SHOOTZ Commercial Build-Out — DECOBAY Interiors" },
      {
        name: "twitter:description",
        content:
          "Hawaiian-Inspired Food, Made From the Soul. Designed by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/SHOOTZ" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "SHOOTZ Commercial Build-Out",
          about:
            "Commercial design and construction project by DECOBAY Interiors in Southern California",
          url: "https://deco-bay-dream.lovable.app/SHOOTZ",
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
              name: "SHOOTZ Commercial Build-Out",
              item: "https://deco-bay-dream.lovable.app/SHOOTZ",
            },
          ],
        }),
      },
    ],
  }),
  component: SHOOTZPage,
});