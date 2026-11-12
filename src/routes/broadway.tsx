import { useEffect, useRef, useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ============================================================
   ASSETS
   ============================================================ */
const kitchenImages = {
  banner: "https://live.staticflickr.com/65535/55647795594_9d4c490db7_b.jpg",
  d: "https://live.staticflickr.com/65535/55647795609_d6273873fb_b.jpg",
};

const bathImages = [
  "https://live.staticflickr.com/65535/55647727613_d3c2ab0945_b.jpg",
  "https://live.staticflickr.com/65535/55647599036_552649612e_b.jpg",
  "https://live.staticflickr.com/65535/55646610477_24789594a2_b.jpg",
  "https://live.staticflickr.com/65535/55647727633_ea05c1b86d_b.jpg",
  "https://live.staticflickr.com/65535/55646610502_4e12ebddbc_b.jpg",
  "https://live.staticflickr.com/65535/55647793824_0afa0613b1_b.jpg",
];

const kitchenTallImages = [
  "https://live.staticflickr.com/65535/55647793819_5df57f1155_b.jpg",
];

// Imagen TEMPORAL de mujer profesional sonriente (Unsplash, uso libre)
// Reemplazar por foto real del founder cuando esté disponible
const founderPhoto =
  "https://images.pexels.com/photos/6980994/pexels-photo-6980994.jpeg";

const projectAddress = {
  line1: "350 Sansome St",
  line2: "Suite 820 PMB 1211",
  city: "San Francisco, CA 94104",
  country: "United States",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=350+Sansome+St+Suite+820+San+Francisco+CA+94104",
};

/* ============================================================
   ROUTE + SEO
   ============================================================ */
export const Route = createFileRoute("/broadway")({
  head: () => ({
    meta: [
      { title: "Broadway Residence — Historic Renovation | DECOBAY Interiors LLC" },
      {
        name: "description",
        content:
          "Historic residence renovation in Alameda County, California. Kitchen, primary bath, secondary bath and powder room — preserving architectural character with modern functionality. By DECOBAY Interiors LLC.",
      },
      {
        name: "keywords",
        content:
          "historic residence renovation, Alameda County interior design, California kitchen renovation, bathroom renovation, powder room, DECOBAY Interiors",
      },
      { property: "og:title", content: "Broadway Residence — Historic Renovation | DECOBAY Interiors" },
      {
        property: "og:description",
        content:
          "A four-area interior renovation of a historic California residence, balancing preserved character with modern comfort.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://decobayinteriors.com/broadway" },
      { property: "og:image", content: kitchenImages.banner },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Broadway Residence — Historic Renovation" },
      {
        name: "twitter:description",
        content:
          "A four-area interior renovation of a historic California residence. DECOBAY Interiors LLC.",
      },
      { name: "twitter:image", content: kitchenImages.banner },
    ],
    links: [{ rel: "canonical", href: "https://decobayinteriors.com/broadway" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Broadway Residence — Historic Renovation",
          about: "Historic residential interior renovation in Alameda County, California",
          url: "https://decobayinteriors.com/broadway",
          locationCreated: {
            "@type": "Place",
            name: "Broadway Residence",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${projectAddress.line1}, ${projectAddress.line2}`,
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94104",
              addressCountry: "US",
            },
          },
          creator: {
            "@type": "Organization",
            name: "DECOBAY Interiors",
            url: "https://decobayinteriors.com/",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://decobayinteriors.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: "https://decobayinteriors.com/#projects",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Broadway residence",
              item: "https://decobayinteriors.com/broadway",
            },
          ],
        }),
      },
    ],
  }),
  component: BroadwayPage,
});

/* ============================================================
   CAROUSEL (accessible, touch-friendly)
   ============================================================ */
function Carousel({
  images,
  alt,
  aspect = "9/16",
  className = "",
  label = "Gallery",
}: {
  images: string[];
  alt: string;
  aspect?: string;
  className?: string;
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next, count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const el = document.getElementById(`carousel-${alt.replace(/\s+/g, "-")}`);
    if (!el) return;
    el.addEventListener("keydown", onKey as EventListener);
    return () => el.removeEventListener("keydown", onKey as EventListener);
  }, [next, prev, alt]);

  return (
    <div
      id={`carousel-${alt.replace(/\s+/g, "-")}`}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`relative group rounded-lg overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className={`relative ${aspect === "9/16" ? "aspect-[9/16]" : "aspect-[16/9]"}`}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — view ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/45 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/65"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/45 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/65"
          >
            ›
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_.25s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
        onClick={onClose}
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[92vw] object-contain rounded-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
function BroadwayPage() {
  useReveal();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <main className="bg-background text-foreground">
      <Header />

      <article className="pt-24 md:pt-28">
        {/* ============ BANNER (16/9) ============ */}
        <section className="relative w-full">
          <div className="relative aspect-[16/9] max-h-[80vh] w-full overflow-hidden bg-muted">
            <img
              src={kitchenImages.banner}
              alt="Broadway residence — renovated historic kitchen, Alameda County"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-8 md:pb-14 w-full text-white">
              <p className="kicker !text-white/80">Featured project · Alameda County, California</p>
              <h1 className="mt-3 text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
                Broadway — a <em className="italic text-accent">historic</em> residence, renewed.
              </h1>
              <p className="mt-4 max-w-xl text-white/85 text-sm md:text-base">
                Four areas reborn within an existing historic home — kitchen, primary bath,
                secondary bath and powder room — where architectural character meets modern
                comfort.
              </p>
            </div>
          </div>
        </section>

        {/* ============ OVERVIEW / BRIEF ============ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <p className="kicker">Overview</p>
            <h2 className="mt-3 text-3xl md:text-4xl leading-tight">
              Preserving the past, <em className="italic text-accent">designing</em> the future.
            </h2>
            <p className="mt-5 text-muted-foreground">
              The Broadway residence is a historic home in Alameda County, California. Our scope
              covered the renovation and interior design of four distinct areas within the existing
              structure, preserving its architectural character while introducing modern
              functionality, comfort and refined finishes.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every intervention was guided by a single principle: <strong>respect the original
              details</strong> while allowing contemporary materials and functional improvements to
              carry the home into its next chapter.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[kitchenImages.d, kitchenTallImages[0]].map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => openLightbox(src, `Broadway detail ${i + 1}`)}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
              >
                <img
                  src={src}
                  alt={`Broadway detail ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* ============ MEET THE FOUNDER ============ */}
        {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 md:mt-28">
          <div className="reveal grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-muted">
              <img
                src={founderPhoto}
                alt="Founder and principal designer of DECOBAY Interiors, smiling"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:p-12">
              <p className="kicker">Behind DECOBAY</p>
              <h2 className="mt-3 text-3xl md:text-4xl leading-tight">
                A personal approach to <em className="italic text-accent">timeless</em> design.
              </h2>
              <p className="mt-5 text-muted-foreground">
                At DECOBAY Interiors, every project begins with listening. We believe a renovation
                is more than construction — it's a collaboration between the home, its history and
                the people who live in it.
              </p>
              <p className="mt-4 text-muted-foreground">
                With a background in interior architecture and a deep respect for California's
                historic homes, our founder leads each project personally — from the first sketch
                to the final walkthrough.
              </p>
              <div className="mt-6">
                <p className="font-medium">DECOBAY Interiors LLC</p>
                <p className="text-sm text-muted-foreground">Founder & Principal Designer</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* ============ SCOPE OF WORK ============ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 md:mt-28">
          <div className="reveal">
            <p className="kicker">Proposed scope of work</p>
            <h2 className="mt-3 text-3xl md:text-4xl leading-tight max-w-2xl">
              Four areas, one coherent story.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Kitchen",
                body:
                  "Cabinetry, countertops, backsplash, appliances, lighting, plumbing fixtures and space planning.",
                img: kitchenImages.d,
              },
              {
                title: "Primary Bathroom",
                body:
                  "Shower, vanity, flooring, plumbing fixtures, lighting and finishes.",
                img: bathImages[0],
              },
              {
                title: "Secondary Bathroom",
                body:
                  "Renovation of fixtures, cabinetry, tile, lighting and finishes.",
                img: bathImages[1],
              },
              {
                title: "Powder Room",
                body:
                  "Vanity, toilet, decorative finishes, lighting and accessories.",
                img: bathImages[2],
              },
            ].map((item, i) => (
              <article
                key={item.title}
                className="reveal group relative overflow-hidden rounded-xl border border-border bg-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-lg font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============ KITCHEN — GALLERY ============ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 md:mt-28">
          <div className="reveal flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="kicker">Kitchen</p>
              <h2 className="mt-3 text-3xl md:text-4xl leading-tight">
                Warm surfaces, generous light.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Cabinetry, countertops, backsplash, lighting and appliances were selected to feel
              calm, durable and unmistakably contemporary — without erasing the home's past.
            </p>
          </div>

          <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-3">
            <button
              type="button"
              onClick={() => openLightbox(kitchenImages.banner, "Kitchen — wide view")}
              className="reveal group relative aspect-[16/9] md:col-span-2 overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={kitchenImages.banner}
                alt="Kitchen wide view at the Broadway residence"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
            <button
              type="button"
              onClick={() => openLightbox(kitchenTallImages[0], "Kitchen — tall detail")}
              className="reveal group relative row-span-2 overflow-hidden rounded-lg bg-muted"
            >
              <div className="aspect-[9/16] h-full">
                <img
                  src={kitchenTallImages[0]}
                  alt="Kitchen tall detail at the Broadway residence"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => openLightbox(kitchenImages.d, "Kitchen — alternate angle")}
              className="reveal group relative aspect-[16/9] md:col-span-2 overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={kitchenImages.d}
                alt="Kitchen alternate angle at the Broadway residence"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </div>
        </section>

        {/* ============ BATHROOM — DOBLE CARRUSEL ============ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 md:mt-28">
          <div className="reveal">
            <p className="kicker">Bathrooms</p>
            <h2 className="mt-3 text-3xl md:text-4xl leading-tight max-w-2xl">
              Quiet luxury, <em className="italic text-accent">carefully</em> restored.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-sm md:text-base">
              The primary bath, secondary bath and powder room each received their own palette —
              tied together by material, proportion and a shared respect for the home's historic
              detail.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <Carousel
                images={bathImages.slice(0, 3)}
                alt="Broadway primary bathroom"
                aspect="9/16"
                label="Primary bathroom gallery"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Primary bath — swipe, or use the arrows.
              </p>
            </div>

            <div className="reveal">
              <Carousel
                images={bathImages.slice(3)}
                alt="Broadway secondary bathroom"
                aspect="9/16"
                label="Secondary bathroom gallery"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Secondary bath & powder room — swipe, or use the arrows.
              </p>
            </div>
          </div>
        </section>

        {/* ============ DESIGN APPROACH ============ */}
        <section className="mt-20 md:mt-28 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="reveal">
              <p className="kicker !text-background/60">Design approach</p>
              <h2 className="mt-3 text-3xl md:text-4xl leading-tight">
                Historic character, <em className="italic text-accent">contemporary</em> life.
              </h2>
            </div>
            <div className="reveal space-y-4 text-background/80">
              <p>
                Respect the home's historic architectural details while integrating contemporary
                materials and functional improvements.
              </p>
              <p>
                The result is a renovation that feels inevitable — as though the new work had
                always belonged — while quietly upgrading how the home performs for the family who
                lives in it today.
              </p>
              <ul className="grid grid-cols-2 gap-3 pt-2 text-sm">
                {[
                  "Preserved millwork",
                  "Modern plumbing",
                  "Layered lighting",
                  "Durable finishes",
                  "Space planning",
                  "Material continuity",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ PROJECT LOCATION ============ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 md:mt-28">
          <div className="reveal rounded-xl border border-border overflow-hidden grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-card">
              <p className="kicker">Project location</p>
              <h2 className="mt-3 text-2xl md:text-3xl leading-tight">Broadway Residence</h2>
              <address className="mt-5 not-italic text-muted-foreground leading-relaxed">
                {projectAddress.line1}
                <br />
                {projectAddress.line2}
                <br />
                {projectAddress.city}
                <br />
                {projectAddress.country}
              </address>
              <a
                href={projectAddress.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-accent"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="relative aspect-[16/9] md:aspect-auto bg-muted overflow-hidden">
              <iframe
                title="Broadway Residence project location"
                src="https://www.google.com/maps?q=350+Sansome+St+Suite+820+San+Francisco+CA+94104&output=embed"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ============ RELATED NAV ============ */}
        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 mt-16 flex flex-wrap gap-4 text-sm"
        >
          <Link to="/" className="underline underline-offset-4 hover:text-accent">
            ← DECOBAY Interiors LLC
          </Link>
          <Link to="/" hash="projects" className="underline underline-offset-4 hover:text-accent">
            More projects
          </Link>
          <Link to="/" hash="quote" className="underline underline-offset-4 hover:text-accent">
            Request a quote
          </Link>
        </nav>
      </article>

      <Footer />

      <Lightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
        onClose={() => setLightbox(null)}
      />
    </main>
  );
}