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
  ArrowRight
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

// Importación de imágenes de Opera Plaza
import banner from "@/assets/OperaPlaza/wallpaper1.jpg";
import render from "@/assets/OperaPlaza/1.jpg";
import final1 from "@/assets/OperaPlaza/2.jpg";
import final2 from "@/assets/OperaPlaza/3.jpg";
import blueprint from "@/assets/OperaPlaza/4.jpg";

// Datos de las imágenes del proyecto
const projectImages = [
  {
    src: render,
    alt: "Opera Plaza bathroom render — 3D visualization",
    title: "3D Design Render",
    description: "The initial 3D visualization captures the vision for this Opera Plaza bathroom — clean lines, premium materials, and a spa-like atmosphere that complements San Francisco's iconic architecture.",
    badge: "Render",
    side: "right",
    icon: PenTool,
    stat: "Concept Phase"
  },
  {
    src: final1,
    alt: "Opera Plaza bathroom renovation — final result",
    title: "The Final Result",
    description: "The completed bathroom showcases the perfect blend of modern design and timeless elegance. Natural light floods the space through carefully positioned fixtures and a thoughtful layout.",
    badge: "After",
    side: "left",
    icon: Bath,
    stat: "Completed"
  },
  {
    src: final2,
    alt: "Opera Plaza bathroom — details and craftsmanship",
    title: "Details & Craftsmanship",
    description: "Every element was carefully selected — from the premium marble tilework to the custom oak vanities. The result is a bathroom that feels both luxurious and inviting, with meticulous attention to every surface.",
    badge: "Details",
    side: "right",
    icon: Layers,
    stat: "Premium Materials"
  },
  {
    src: blueprint,
    alt: "Opera Plaza bathroom — floor plan and blueprint",
    title: "Blueprint & Layout",
    description: "The thoughtfully designed floor plan maximizes every square foot of this 85 sq ft space. Key features include a spacious walk-in shower, dual vanities with custom storage, and optimized traffic flow for daily use.",
    badge: "Blueprint",
    side: "left",
    icon: Ruler,
    stat: "Space Planning"
  }
];

// Componente para cada imagen con efecto parallax
function ProjectImage({ 
  image, 
  index 
}: { 
  image: typeof projectImages[0], 
  index: number 
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

  // Efecto parallax en scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top / window.innerHeight);
      if (scrollProgress > 0 && scrollProgress < 1) {
        const imageElement = el.querySelector('.parallax-image') as HTMLElement;
        if (imageElement) {
          imageElement.style.transform = `translateY(${scrollProgress * 20}px) scale(1.02)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRight = image.side === 'right';
  const Icon = image.icon;

  return (
    <div 
      ref={imgRef}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 py-8 md:py-12 border-b border-border/30 last:border-0 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-1000`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Imagen con efecto parallax - Ajustado para alternar orden correctamente en desktop */}
      <div className={`${isRight ? 'lg:order-2' : 'lg:order-1'} relative overflow-hidden rounded-sm bg-muted/30 w-full`}>
        <div className="parallax-image relative aspect-[4/3] w-full overflow-hidden transition-transform duration-700">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Badge superpuesto */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase backdrop-blur bg-black/50 text-white border border-white/20">
              {image.badge}
            </span>
          </div>
          {/* Gradiente inferior */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Descripción */}
      <div className={`flex flex-col justify-center ${isRight ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4 mt-2 lg:mt-0">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-accent/70">
            {String(index + 1).padStart(2, '0')} / {String(projectImages.length).padStart(2, '0')}
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
        <div className="mt-4 flex items-center gap-2 text-xs text-accent">
          <span className="tracking-widest uppercase">View detail</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

// Estadísticas del proyecto
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
    { icon: Clock, label: "Timeline", value: "4 Weeks" },
    { icon: Ruler, label: "Area", value: "85 sq ft" },
    { icon: Droplets, label: "Features", value: "Walk-in Shower" },
    { icon: Layers, label: "Materials", value: "Marble & Oak" },
  ];

  return (
    <div 
      ref={statsRef}
      className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8 md:py-12 border-y border-border/30 my-6 sm:my-8 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

// Sección principal del proyecto
function OperaPlazaSection() {
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
    <section id="bathroom-remodel" className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Fondo decorativo con parallax */}
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
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="kicker reveal reveal-fade">Featured Project</p>
            <h2 className="reveal reveal-up mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <em className="italic text-accent">Opera Plaza</em> Bathroom
            </h2>
            <p className="reveal reveal-up mt-3 text-xs sm:text-sm text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              San Francisco · Complete Renovation
            </p>
          </div>
          <p className="reveal reveal-fade max-w-md text-sm sm:text-base text-muted-foreground">
            A sophisticated bathroom transformation in the heart of San Francisco's 
            iconic Opera Plaza — blending modern luxury with timeless elegance 
            and thoughtful functionality.
          </p>
        </div>

        {/* Estadísticas */}
        <ProjectStats />

        {/* Galería de imágenes */}
        <div className="mt-8 sm:mt-12">
          {projectImages.map((image, index) => (
            <ProjectImage key={index} image={image} index={index} />
          ))}
        </div>

        {/* Detalles adicionales del proyecto */}
        <div className="reveal reveal-fade mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-muted/20 rounded-sm border border-border/30">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <PenTool className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Design Concept</p>
              <p className="text-xs text-muted-foreground mt-0.5">Spa-inspired minimalism with natural materials</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Bath className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Key Features</p>
              <p className="text-xs text-muted-foreground mt-0.5">Walk-in shower · Dual vanities · Smart storage</p>
            </div>
          </div>
          <div className="flex items-start gap-4 sm:col-span-2 md:col-span-1">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Completed</p>
              <p className="text-xs text-muted-foreground mt-0.5">2025 · San Francisco, CA</p>
            </div>
          </div>
        </div>

        <p className="reveal reveal-fade mt-12 sm:mt-16 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground text-center">
          All projects designed &amp; produced in California
        </p>
      </div>
    </section>
  );
}

// Página principal
function OperaPlazaPage() {
  useReveal();
  
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <article className="pt-20 sm:pt-24 md:pt-28">
        {/* Banner con imagen de fondo */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-sm min-h-[380px] sm:min-h-[420px] md:min-h-0 md:aspect-[21/9]">
            <img
              src={banner}
              alt="Opera Plaza San Francisco — Bathroom Renovation Banner"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
            
            {/* Contenido superpuesto al banner */}
            <div className="relative h-full min-h-[380px] sm:min-h-[420px] md:min-h-0 flex flex-col justify-end md:justify-center p-6 sm:p-8 md:p-12 lg:p-16 z-10">
              <p className="kicker reveal reveal-fade !text-white/80 text-xs sm:text-sm">
                Featured Project · San Francisco
              </p>
              <h1 className="reveal reveal-up mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-2xl font-display">
                Opera Plaza <br className="hidden sm:inline" />
                <span className="text-accent/90">Bathroom Remodel</span>
              </h1>
              <p className="reveal reveal-fade mt-3 sm:mt-4 text-white/80 max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
                A complete transformation blending modern luxury with 
                the timeless character of San Francisco's iconic Opera Plaza.
              </p>
              <div className="reveal reveal-fade mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-white/70 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  4 weeks
                </span>
                <span className="w-px h-4 sm:h-6 bg-white/20" />
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  85 sq ft
                </span>
                <span className="w-px h-4 sm:h-6 bg-white/20" />
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 flex-shrink-0" />
                  Completed 2025
                </span>
              </div>
            </div>
          </div>
        </header>

        <OperaPlazaSection />
        <Consultation />
        
        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 flex flex-wrap gap-4 text-xs sm:text-sm"
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

export const Route = createFileRoute("/operaplaza")({
  head: () => ({
    meta: [
      { title: "Opera Plaza Bathroom Remodel — San Francisco | DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Opera Plaza bathroom remodel in San Francisco. A complete renovation featuring a walk-in shower, dual vanities, and spa-inspired design by DECOBAY Interiors.",
      },
      {
        name: "keywords",
        content:
          "Opera Plaza, bathroom remodel, San Francisco renovation, bathroom design, DECOBAY Interiors, spa bathroom, walk-in shower, luxury bathroom",
      },
      { property: "og:title", content: "Opera Plaza Bathroom Remodel — San Francisco" },
      {
        property: "og:description",
        content:
          "A sophisticated bathroom transformation in San Francisco's iconic Opera Plaza. Blending modern luxury with timeless elegance.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/operaPlaza" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Opera Plaza Bathroom Remodel — San Francisco" },
      {
        name: "twitter:description",
        content:
          "A sophisticated bathroom transformation in San Francisco's iconic Opera Plaza. Blending modern luxury with timeless elegance.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/operaPlaza" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Opera Plaza Bathroom Remodel",
          about: "Interior design bathroom renovation project in San Francisco",
          url: "https://deco-bay-dream.lovable.app/operaPlaza",
          locationCreated: {
            "@type": "Place",
            address: { 
              "@type": "PostalAddress", 
              addressLocality: "San Francisco", 
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
              name: "Opera Plaza Bathroom Remodel",
              item: "https://deco-bay-dream.lovable.app/operaPlaza",
            },
          ],
        }),
      },
    ],
  }),
  component: OperaPlazaPage,
});