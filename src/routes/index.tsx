import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import hero from "@/assets/hero.jpg";
import living from "@/assets/living.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bedroom from "@/assets/bedroom.jpg";
import dining from "@/assets/dining.jpg";
import bath from "@/assets/bath.jpg";
import commercial from "@/assets/commercial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DECOBAY Interiors — Minimalist Interior Design in California" },
      {
        name: "description",
        content:
          "California Architectural & Interior Design Firm creating minimalist, warm and timeless homes and commercial spaces. Book a free 30-minute consultation.",
      },
      {
        name: "keywords",
        content:
          "interior design California, minimalist interior design, residential interior design, commercial interior design, DECOBAY Interiors, free consultation",
      },
      {
        property: "og:title",
        content: "DECOBAY Interiors — Minimalist Interior Design in California",
      },
      {
        property: "og:description",
        content:
          "Minimalist, warm and timeless residential and commercial interior design from California. Book a free 30-minute consultation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/" },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb883835-6702-42e0-a9dc-f2070c1fd8fa/id-preview-44fd052c--a0b0cace-1d38-4ef2-b39f-67d3ab31cade.lovable.app-1782841553501.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "DECOBAY Interiors — Minimalist Interior Design in California",
      },
      {
        name: "twitter:description",
        content:
          "California Architectural & Interior Design Firm. Minimalist, warm and timeless residential and commercial interiors. Book a free consultation.",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb883835-6702-42e0-a9dc-f2070c1fd8fa/id-preview-44fd052c--a0b0cace-1d38-4ef2-b39f-67d3ab31cade.lovable.app-1782841553501.png",
      },
    ],
    links: [
      { rel: "canonical", href: "https://deco-bay-dream.lovable.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InteriorDesignStudio",
          name: "DECOBAY Interiors",
          description:
            "Minimalist Architectural & Interior Design Firm in California offering residential and commercial interior design services.",
          areaServed: { "@type": "State", name: "California" },
          url: "https://deco-bay-dream.lovable.app/",
          image:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fb883835-6702-42e0-a9dc-f2070c1fd8fa/id-preview-44fd052c--a0b0cace-1d38-4ef2-b39f-67d3ab31cade.lovable.app-1782841553501.png",
          priceRange: "$$",
          sameAs: [
            "https://decobayinteriors.com",
            "https://www.instagram.com/decobay.interiors/",
            "https://www.facebook.com/109287792171724",
            "https://www.tiktok.com/@decobay.interiors",
          ],
          address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Interior design services",
            itemListElement: [
              "Full-home design",
              "Single-room refresh",
              "Color & material consult",
              "Commercial spaces",
              "Furniture sourcing",
              "Project management",
            ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="DECOBAY Interiors — Minimalist Interior Design in California"
    >
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Minimalist California living room interior designed by DECOBAY Interiors"
          className="w-full h-full object-cover scale-105 animate-[fade-in_1.4s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20 md:pb-32 w-full">
        <p className="kicker reveal reveal-fade">DECOBAY Designs LLC · California</p>
        <h1 className="reveal reveal-up mt-4 text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          Minimalist <em className="italic text-accent">interior design</em> in California.
        </h1>
        <p className="reveal reveal-up mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
          DECOBAY Interiors is a California design studio shaping minimalist, warm and timeless
          residential and commercial interiors — from a single room to a full home.
        </p>
        <div className="reveal reveal-up mt-10 flex flex-wrap gap-3">
          <a
            href="#consultation"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
          >
            Book a free consultation
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-full border border-foreground/30 hover:border-foreground transition-colors"
          >
            View projects
          </a>
          <a
            href="/sarita"
            className="px-6 py-3 rounded-full border border-foreground/30 hover:border-foreground transition-colors"
          >
            Sarita residence →
          </a>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const items = [
    {
      title: "Our Philosophy",
      body: "Interior design is a collaboration. We listen first, then shape spaces that are beautiful and quietly functional.",
    },
    {
      title: "Our Experience",
      body: "Over a decade refining residential and commercial interiors — from a single room to a full home.",
    },
    {
      title: "Our Approach",
      body: "Light, color, texture and flow, considered together. Spaces that promote well-being as much as taste.",
    },
  ];
  return (
    <section id="philosophy" className="py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="kicker reveal reveal-fade">01 — Studio</p>
        <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl max-w-3xl">
          A studio devoted to <em className="italic">timeless</em> interiors.
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-14">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal reveal-up"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="h-px w-12 bg-accent mb-6" />
              <h3 className="text-2xl md:text-3xl mb-3">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="kicker reveal reveal-fade">02 — Selected work</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">Recent projects</h2>
          </div>
          <p className="reveal reveal-fade max-w-sm text-muted-foreground">
            A curated mix of residential and commercial spaces — each one shaped around how it will
            be lived in.
          </p>
        </div>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <figure className="reveal reveal-left img-hover col-span-12 md:col-span-7 aspect-[16/11] overflow-hidden rounded-sm">
            <img
              src={living}
              alt="Minimalist California living room with linen sofa and oak details"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure className="reveal reveal-zoom img-hover col-span-12 md:col-span-5 aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={kitchen}
              alt="Minimalist oak kitchen with stone worktop by DECOBAY Interiors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="reveal reveal-up col-span-12 md:col-span-5 flex flex-col justify-center md:pl-4">
            <p className="kicker">Residential</p>
            <h3 className="text-3xl md:text-4xl mt-3">Coastal residence</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              A double-height living space where natural light, linen and oak set the tone for slow
              weekends.
            </p>
          </div>
          <figure className="reveal reveal-right img-hover col-span-12 md:col-span-7 aspect-[16/10] overflow-hidden rounded-sm">
            <img
              src={bedroom}
              alt="Warm neutral bedroom interior design in a California home"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <figure className="reveal reveal-tilt img-hover col-span-12 md:col-span-4 aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={dining}
              alt="Minimalist dining room with sculptural wood table and soft lighting"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure className="reveal reveal-fade img-hover col-span-12 md:col-span-4 aspect-[4/5] overflow-hidden rounded-sm md:mt-12">
            <img
              src={bath}
              alt="Serene stone bathroom design with natural textures"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure className="reveal reveal-zoom img-hover col-span-12 md:col-span-4 aspect-[4/5] overflow-hidden rounded-sm md:mt-24">
            <img
              src={commercial}
              alt="Commercial interior design project for a California workspace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const list = [
    "Full-home design",
    "Single-room refresh",
    "Color & material consult",
    "Commercial spaces",
    "Furniture sourcing",
    "Project management",
  ];
  return (
    <section id="services" className="py-28 md:py-40 px-6 lg:px-10 bg-muted/40">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="kicker reveal reveal-fade">03 — Services</p>
          <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
            From a single room to the whole home.
          </h2>
          <p className="reveal reveal-up mt-6 text-muted-foreground max-w-md">
            We work at every scale. Tell us what you have in mind — we'll respond with a tailored
            proposal within 48 hours.
          </p>
        </div>
        <ul className="md:col-span-7 grid sm:grid-cols-2 gap-x-10">
          {list.map((s, i) => (
            <li
              key={s}
              className="reveal reveal-up border-b border-border/70 py-6 flex items-baseline justify-between gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-xl md:text-2xl font-display">{s}</span>
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FreeConsultation() {
  return (
    <section id="consultation" className="py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <p className="kicker reveal reveal-fade">04 — Start</p>
        <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl max-w-3xl">
          Ready to bring your <em className="italic text-accent">vision</em> to life?
        </h2>
        <p className="reveal reveal-up mt-6 text-muted-foreground max-w-xl">
          Schedule a complimentary 30-minute consultation to discuss your project, explore
          possibilities, and discover how Decobay Design can transform your space.
        </p>

        <div className="reveal reveal-up mt-12 p-10 md:p-14 border border-accent/30 bg-card rounded-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-3xl md:text-4xl">Book your free consultation</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Choose a time that works for you directly on Calendly. No extra forms needed.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/70 bg-background/50">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm tracking-wide">Free consultation · 30 minutes</span>
              </div>
            </div>
            <a
              href="https://calendly.com/zdimensionz2/30min"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors text-base tracking-wide"
            >
              Schedule your call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Philosophy />
      <Projects />
      <Services />
      <FreeConsultation />
      <Footer />
    </main>
  );
}
