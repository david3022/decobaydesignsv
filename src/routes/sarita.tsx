import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import saritaVideo from "@/assets/saritavideo.mp4";

// URLs de Flickr
const kitchenHero =
  "https://live.staticflickr.com/65535/55621572326_13f464488e_b.jpg"; // 16/9 remodelada
const laundryRoom =
  "https://live.staticflickr.com/65535/55621572331_07f3603151_b.jpg"; // 9/16 lavadora/secadora
const kitchenDetail =
  "https://live.staticflickr.com/65535/55621722048_1e482f2128_b.jpg"; // 9/6 solo cocina
const kitchenAngle =
  "https://live.staticflickr.com/65535/55621998180_997cde2bc5_b.jpg"; // 16/9 otro ángulo

export const Route = createFileRoute("/sarita")({
  head: () => ({
    meta: [
      { title: "Sarita Kitchen Renovation — Bay Area Interior Design | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Sarita kitchen renovation: a warm, functional California kitchen with a dedicated laundry nook. Gallery, video and design details by DECOBAY Interiors.",
      },
      {
        name: "keywords",
        content:
          "Sarita kitchen renovation, California kitchen design, laundry room, 3D interior walkthrough, DECOBAY Interiors",
      },
      { property: "og:title", content: "Sarita Kitchen Renovation — DECOBAY Interiors" },
      {
        property: "og:description",
        content:
          "A warm, functional California kitchen with a dedicated laundry nook. Gallery and video by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://decobayinteriors.com/sarita/kitchen" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sarita Kitchen Renovation — DECOBAY Interiors" },
      {
        name: "twitter:description",
        content:
          "A warm, functional California kitchen with a dedicated laundry nook. Gallery and video by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://decobayinteriors.com/sarita/kitchen" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Sarita Kitchen Renovation",
          about: "Kitchen and laundry room renovation in California",
          url: "https://decobayinteriors.com/sarita/kitchen",
          locationCreated: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
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
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://decobayinteriors.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Sarita residence",
              item: "https://decobayinteriors.com/sarita",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Kitchen renovation",
              item: "https://decobayinteriors.com/sarita/kitchen",
            },
          ],
        }),
      },
    ],
  }),
  component: SaritaKitchenPage,
});

function SaritaKitchenPage() {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reinicia el video a los 5 segundos para que se repita ese fragmento
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.currentTime >= 5) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Header />
      <article className="pt-24 md:pt-28">
        <header className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="kicker">Featured project · California · Kitchen</p>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Sarita kitchen — a <em className="italic text-accent">warm</em>, functional heart of the
            home.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A full kitchen renovation by DECOBAY Interiors, complete with a dedicated laundry nook.
            Browse the gallery, watch the family film, and explore the design details below.
          </p>
        </header>

        {/* Hero image · 16:9 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 md:mt-16">
          <figure className="reveal">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <img
                src={kitchenHero}
                alt="Remodeled kitchen at the Sarita residence, natural light over warm wood tones"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              The renovated kitchen, designed for everyday family life.
            </figcaption>
          </figure>
        </section>

        {/* Intro / brief */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24 grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl leading-tight">The design brief</h2>
            <p className="mt-4 text-muted-foreground">
              The Sarita kitchen was reimagined as a gathering space — an open, light-filled room
              where cooking and conversation share the same floor. Warm surfaces, careful storage,
              and a discreet laundry nook balance beauty with the demands of a busy household.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every detail was selected to feel calm and durable: tactile materials, generous
              counters, and lighting that shifts from morning prep to evening meals.
            </p>
          </div>
          <div className="reveal grid gap-4">
            <figure>
              <div className="aspect-[9/6] overflow-hidden rounded-lg bg-muted">
                <img
                  src={kitchenDetail}
                  alt="Kitchen detail at the Sarita residence"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Material palette and cabinetry detail.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Heyzine flipbook embed */}

                {/* Heyzine flipbook embed */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24">
          <div className="reveal" style={{ width: "100%" }}>
            <p className="kicker">The project</p>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              Browse the full project — Please use the arrows to see every detail.
            </p>
            <iframe
              allowFullScreen
              allow="autoplay; fullscreen; clipboard-write"
              scrolling="no"
              style={{ width: "100%", height: "400px", border: "1px solid lightgray" }}
              src="https://heyzine.com/flip-book/6a2db008ef.html"
              title="Heyzine flipbook"
            />
          </div>
        </section>

        {/* <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24">
          <div className="reveal" style={{ width: "100%" }}>
            <iframe
              allowFullScreen
              allow="autoplay; fullscreen; clipboard-write"
              scrolling="no"
              style={{ width: "100%", height: "400px", border: "1px solid lightgray" }}
              src="https://heyzine.com/flip-book/6a2db008ef.html"
              title="Heyzine flipbook"
            />
          </div>
        </section> */}

        {/* Gallery · 16:9 grande + 9:16 contenida */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl leading-tight reveal">Gallery</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[2fr_1fr] md:items-start">
            {/* 16:9 — ocupa la columna ancha */}
            <figure className="reveal">
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <img
                  src={kitchenAngle}
                  alt="Kitchen from a second angle at the Sarita residence"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                The kitchen from a second angle, showing flow and storage.
              </figcaption>
            </figure>

            {/* 9:16 — columna estrecha, altura controlada */}
            <figure className="reveal md:max-w-xs">
              <div className="aspect-[9/16] overflow-hidden rounded-lg bg-muted mx-auto">
                <img
                  src={laundryRoom}
                  alt="Laundry nook with washer and dryer inside the Sarita kitchen"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                The discreet laundry nook — washer and dryer tucked into the kitchen.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Video · 9:16 autoplay sin controles */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl leading-tight reveal">A family in the kitchen</h2>
          <p className="mt-4 max-w-xl text-muted-foreground reveal">
            A short film captured in the finished space — the kitchen as it was meant to be used.
          </p>
          <div className="reveal mt-8 flex justify-center">
            <div className="w-full max-w-sm aspect-[9/16] overflow-hidden rounded-lg bg-muted">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={saritaVideo}
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-label="Family using the Sarita kitchen"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 mt-16 flex flex-wrap gap-4 text-sm"
        >
          <Link to="/sarita" className="underline underline-offset-4 hover:text-accent">
            ← Back to Sarita residence
          </Link>
          <Link to="/" className="underline underline-offset-4 hover:text-accent">
            DECOBAY Interiors
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
    </main>
  );
}











// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useReveal } from "@/hooks/use-reveal";
// import { Sarita } from "@/components/Sarita";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";

// export const Route = createFileRoute("/sarita")({
//   head: () => ({
//     meta: [
//       { title: "Sarita Residence — Bay Area Interior Design Project | DECOBAY Interiors" },
//       {
//         name: "description",
//         content:
//           "Sarita residence: a warm, light-filled California home by DECOBAY Interiors. Explore the gallery, design brief and interactive 3D walkthrough.",
//       },
//       {
//         name: "keywords",
//         content:
//           "Sarita residence, California interior design project, 3D interior walkthrough, DECOBAY Interiors",
//       },
//       { property: "og:title", content: "Sarita Residence — California Interior Design Project" },
//       {
//         property: "og:description",
//         content:
//           "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
//       },
//       { property: "og:type", content: "article" },
//       { property: "og:url", content: "https://decobayinteriors.com/sarita" },
//       { name: "twitter:card", content: "summary_large_image" },
//       { name: "twitter:title", content: "Sarita Residence — California Interior Design Project" },
//       {
//         name: "twitter:description",
//         content:
//           "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
//       },
//     ],
//     links: [{ rel: "canonical", href: "https://decobayinteriors.com/sarita" }],
//     scripts: [
//       {
//         type: "application/ld+json",
//         children: JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "CreativeWork",
//           name: "Sarita Residence",
//           about: "Interior design project in California",
//           url: "https://decobayinteriors.com/sarita",
//           locationCreated: {
//             "@type": "Place",
//             address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
//           },
//           creator: {
//             "@type": "Organization",
//             name: "DECOBAY Interiors",
//             url: "https://decobayinteriors.com/",
//           },
//         }),
//       },
//       {
//         type: "application/ld+json",
//         children: JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "BreadcrumbList",
//           itemListElement: [
//             {
//               "@type": "ListItem",
//               position: 1,
//               name: "Home",
//               item: "https://decobayinteriors.com/",
//             },
//             {
//               "@type": "ListItem",
//               position: 2,
//               name: "Sarita residence",
//               item: "https://decobayinteriors.com/sarita",
//             },
//           ],
//         }),
//       },
//     ],
//   }),
//   component: SaritaPage,
// });

// function SaritaPage() {
//   useReveal();
//   return (
//     <main className="bg-background text-foreground">
//       <Header />
//       <article className="pt-24 md:pt-28">
//         <header className="max-w-7xl mx-auto px-6 lg:px-10">
//           <p className="kicker">Featured project · California</p>
//           <h1 className="mt-4 text-5xl md:text-7xl leading-[0.95] max-w-3xl">
//             Sarita residence — a <em className="italic text-accent">California</em> home.
//           </h1>
//           <p className="mt-6 max-w-xl text-muted-foreground">
//             A full-home interior design project by DECOBAY Interiors. Browse the gallery, read the
//             design brief, and explore the interactive 3D walkthrough below.
//           </p>
//         </header>
//         <Sarita />
//         <nav
//           aria-label="Related"
//           className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 flex flex-wrap gap-4 text-sm"
//         >
//           <Link to="/" className="underline underline-offset-4 hover:text-accent">
//             ← Back to DECOBAY Interiors
//           </Link>
//           <Link to="/" hash="projects" className="underline underline-offset-4 hover:text-accent">
//             More projects
//           </Link>
//           <Link to="/" hash="quote" className="underline underline-offset-4 hover:text-accent">
//             Request a quote
//           </Link>
//         </nav>
//       </article>
//       <Footer />
//     </main>
//   );
// }
