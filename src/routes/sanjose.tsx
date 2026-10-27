import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Maximize2,
  Clock,
  CheckCircle2,
  Ruler,
  Bath,
  Droplets,
  Layers,
  MapPin,
  Calendar,
  PenTool,
  ShieldCheck,
  Award,
  Utensils,
  Sofa,
  Coffee,
  Flame,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

// Palmetto San Jose image imports
import banner from "@/assets/PalmettoSanJose/jb1.jpg";     // main banner
import lobby1 from "@/assets/PalmettoSanJose/jb2.jpg";    // lobby photo 1
import lobby2 from "@/assets/PalmettoSanJose/jb3.jpg";    // lobby photo 2
import kitchen1 from "@/assets/PalmettoSanJose/JB.jpg";   // kitchen photo 1
import kitchen2 from "@/assets/PalmettoSanJose/jb5.jpg";  // kitchen photo 2
import kitchen3 from "@/assets/PalmettoSanJose/jb6.jpg";  // kitchen photo 3

// Project image data (lobby + kitchen)
const projectImages = [
  {
    src: lobby1,
    alt: "Palmetto San Jose lobby — welcoming seating area",
    title: "The Lobby Welcome",
    description:
      "The first impression at Palmetto San Jose is warm, open, and inviting. Natural textures, soft lighting, and a thoughtful seating layout create a space where guests feel at home the moment they walk through the door.",
    badge: "Lobby",
    side: "right",
    icon: Sofa,
    stat: "Front of House",
    objectFit: "object-cover",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: lobby2,
    alt: "Palmetto San Jose lobby — detail and atmosphere",
    title: "Lobby Atmosphere & Details",
    description:
      "Every detail in the lobby was chosen to reflect Palmetto San Jose's character — from the material palette to the finishing touches. It's a space that balances comfort, character, and a distinctly local feel.",
    badge: "Lobby",
    side: "left",
    icon: Coffee,
    stat: "Guest Experience",
    objectFit: "object-cover",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: kitchen1,
    alt: "Palmetto San Jose kitchen — the heart of the operation",
    title: "Inside the Kitchen",
    description:
      "The kitchen at Palmetto San Jose is built for both craft and flow. Clean lines, durable surfaces, and a smart layout keep the team moving smoothly while every plate leaves with the same care and consistency.",
    badge: "Kitchen",
    side: "right",
    icon: Utensils,
    stat: "Back of House",
    // show full image without cropping
    objectFit: "object-contain",
    aspectRatio: "aspect-square",
  },
  {
    src: kitchen2,
    alt: "Palmetto San Jose kitchen — layout and equipment",
    title: "Kitchen Layout & Equipment",
    description:
      "A thoughtfully planned workspace maximizes efficiency in every square foot. Key features include dedicated prep zones, a focused cooking line, and an organized flow that supports fast, consistent service during peak hours.",
    badge: "Kitchen",
    side: "left",
    icon: Flame,
    stat: "Operational Flow",
    objectFit: "object-cover",
    aspectRatio: "aspect-[4/3]",
  },
  {
    src: kitchen3,
    alt: "Palmetto San Jose kitchen — finishing and service",
    title: "Finishing & Service",
    description:
      "From the final pass to the moment a plate leaves the kitchen, every station is designed for precision. The result is a calm, organized back of house that supports consistent quality even during the busiest service.",
    badge: "Kitchen",
    side: "right",
    icon: Sparkles,
    stat: "Quality & Consistency",
    objectFit: "object-cover",
    aspectRatio: "aspect-[4/3]",
  },
];

// Each image block with parallax effect
function ProjectImage({
  image,
  index,
}: {
  image: typeof projectImages[0];
  index: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollProgress = 1 - rect.top / window.innerHeight;
      if (scrollProgress > 0 && scrollProgress < 1) {
        const imageElement = el.querySelector(".parallax-image") as HTMLElement;
        if (imageElement) {
          imageElement.style.transform = `translateY(${scrollProgress * 20}px) scale(1.02)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRight = image.side === "right";
  const Icon = image.icon;

  return (
    <div
      ref={imgRef}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 py-8 md:py-12 border-b border-border/30 last:border-0 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Parallax image */}
      <div
        className={`${isRight ? "lg:order-2" : "lg:order-1"} relative overflow-hidden rounded-sm bg-black/5 dark:bg-white/5 w-full flex items-center justify-center`}
      >
        <div
          className={`parallax-image relative ${image.aspectRatio} w-full overflow-hidden transition-transform duration-700`}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={`h-full w-full ${image.objectFit} transition-transform duration-700 hover:scale-105`}
          />
          {/* Overlay badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase backdrop-blur bg-black/50 text-white border border-white/20">
              {image.badge}
            </span>
          </div>
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Description */}
      <div
        className={`flex flex-col justify-center ${
          isRight ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-4 mt-2 lg:mt-0">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-accent/70">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projectImages.length).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border/50" />
        </div>

        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
          <span className="text-[11px] sm:text-xs text-muted-foreground tracking-widest uppercase">
            {image.stat}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-display mb-2 sm:mb-3">
          {image.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {image.description}
        </p>
      </div>
    </div>
  );
}

// Project stats
function ProjectStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Clock, label: "Hours", value: "Open Daily" },
    { icon: Sofa, label: "Lobby", value: "Welcome Area" },
    { icon: Utensils, label: "Kitchen", value: "Full Service" },
    { icon: MapPin, label: "Location", value: "San Jose, CA" },
  ];

  return (
    <div
      ref={statsRef}
      className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8 md:py-12 border-y border-border/30 my-6 sm:my-8 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } transition-all duration-700`}
    >
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className="text-center p-2"
          style={{ transitionDelay: `${idx * 100}ms` }}
        >
          <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-accent mb-2 sm:mb-3" />
          <p className="text-xl sm:text-2xl font-display">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// Featured highlight section
function FeaturedHighlightSection() {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 my-8">
      <div className="p-8 sm:p-12 md:p-16 rounded-sm bg-muted/20 border border-border/40 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative overflow-hidden rounded-sm bg-muted/30 aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
            <img
              src={kitchen2}
              alt="Palmetto San Jose featured kitchen detail"
              loading="lazy"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase backdrop-blur bg-amber-500/80 text-white border border-amber-400/30">
                Palmetto San Jose
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs text-accent font-medium tracking-widest uppercase">
                Featured Space
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display mb-4">
              Crafted for Comfort &amp; Craft
            </h3>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              From the welcoming lobby to the working kitchen, Palmetto San Jose
              is designed as one connected experience. Warm materials and careful
              detailing set the tone up front, while a focused, efficient kitchen
              keeps everything running behind the scenes. The result is a space
              that feels effortless to guests and practical for the team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-3">
                <Sofa className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Inviting Lobby</p>
                  <p className="text-[11px] text-muted-foreground">
                    Warm, welcoming first impression
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Efficient Kitchen</p>
                  <p className="text-[11px] text-muted-foreground">
                    Built for consistent, quality service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main project section
function PalmettoSanJoseSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -0.06}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="lobby-kitchen"
      className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Decorative parallax background */}
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -right-24 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-accent/5 blur-3xl will-change-transform pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-500/5 blur-3xl will-change-transform pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="kicker reveal reveal-fade">Featured Spaces</p>
            <h2 className="reveal reveal-up mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <em className="italic text-accent">Palmetto</em> San Jose
            </h2>
            <p className="reveal reveal-up mt-3 text-xs sm:text-sm text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              San Jose, California · Lobby &amp; Kitchen
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-sm sm:text-base text-muted-foreground">
            A look inside Palmetto San Jose — from the warm, welcoming lobby to
            the working kitchen, every space is designed to feel connected,
            comfortable, and true to the character of San Jose.
          </p>
        </div>

        {/* Stats */}
        <ProjectStats />

        {/* Gallery */}
        <div className="mt-8 sm:mt-12">
          {projectImages.map((image, index) => (
            <ProjectImage key={index} image={image} index={index} />
          ))}
        </div>

        {/* Extra project details */}
        <div className="reveal reveal-fade mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-muted/20 rounded-sm border border-border/30">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <PenTool className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Design Concept</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Warm, welcoming spaces with a local feel
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Layers className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Key Features</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Welcoming lobby · Full-service kitchen · Smart flow
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 sm:col-span-2 md:col-span-1">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                San Jose, CA
              </p>
            </div>
          </div>
        </div>

        <p className="reveal reveal-fade mt-12 sm:mt-16 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground text-center">
          Palmetto San Jose · Local roots, thoughtful design
        </p>
      </div>
    </section>
  );
}

// Main page
function PalmettoSanJosePage() {
  useReveal();

  return (
    <main className="bg-background text-foreground w-full overflow-x-hidden">
      <Header />
      <article className="pt-20 sm:pt-24 md:pt-28 w-full">
        {/* Banner with background image (jb1.jpg) */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
          <div className="relative w-full overflow-hidden rounded-sm min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:aspect-[21/9]">
            <img
              src={banner}
              alt="Palmetto San Jose — business banner"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Lighter responsive gradient so the image stays visible */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/55 via-black/25 to-black/5" />

            {/* Overlay content */}
            <div className="relative h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-0 w-full flex flex-col justify-end md:justify-center p-5 sm:p-8 md:p-12 lg:p-16 z-10 box-border">
              <p className="kicker reveal reveal-fade !text-white/90 text-xs sm:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                Featured Business · <span className="whitespace-nowrap">Palmetto San Jose</span>
              </p>
              <h1 className="reveal reveal-up mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-2xl font-display drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                San Jose&apos;s <br className="hidden sm:inline" />
                <span className="text-accent/90">Lobby &amp; Kitchen</span>
              </h1>
              <p className="reveal reveal-fade mt-3 sm:mt-4 text-white/90 max-w-md text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                A look inside Palmetto San Jose — a welcoming lobby and a
                working kitchen, designed to feel connected and full of local
                character.
              </p>
              <div className="reveal reveal-fade mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-6 text-white/90 text-xs sm:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  Open daily
                </span>
                <span className="w-px h-3.5 sm:h-6 bg-white/30" />
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Sofa className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  Welcoming lobby
                </span>
                <span className="w-px h-3.5 sm:h-6 bg-white/30" />
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 flex-shrink-0" />
                  San Jose, CA
                </span>
              </div>
            </div>
          </div>
        </header>

        <PalmettoSanJoseSection />
        <FeaturedHighlightSection />
        <Consultation />

        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 flex flex-wrap gap-4 text-xs sm:text-sm"
        >
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-accent transition-colors"
          >
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

export const Route = createFileRoute("/sanjose")({
  head: () => ({
    meta: [
      { title: "Palmetto San Jose — Lobby & Kitchen | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "A look inside Palmetto San Jose — a welcoming lobby and a full working kitchen in San Jose, California. Warm, connected spaces designed by DECOBAY Interiors.",
      },
      {
        name: "keywords",
        content:
          "Palmetto San Jose, lobby design, kitchen design, San Jose California, DECOBAY Interiors, hospitality spaces, interior design",
      },
      { property: "og:title", content: "Palmetto San Jose — Lobby & Kitchen" },
      {
        property: "og:description",
        content:
          "Inside Palmetto San Jose — a welcoming lobby and a working kitchen, designed to feel connected and full of local character.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://decobayinteriors.com/palmetto-san-jose" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Palmetto San Jose  — Lobby & Kitchen" },
      {
        name: "twitter:description",
        content:
          "Inside Palmetto San Jose — a welcoming lobby and a working kitchen, designed to feel connected and full of local character.",
      },
    ],
    links: [{ rel: "canonical", href: "https://decobayinteriors.com/palmetto-san-jose" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Palmetto San Jose — Lobby & Kitchen",
          about: "Interior design showcase of a lobby and kitchen in San Jose, California",
          url: "https://decobayinteriors.com/palmetto-san-jose",
          locationCreated: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Jose",
              addressRegion: "CA",
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
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://decobayinteriors.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Palmetto San Jose",
              item: "https://decobayinteriors.com/palmetto-san-jose",
            },
          ],
        }),
      },
    ],
  }),
  component: PalmettoSanJosePage,
});
