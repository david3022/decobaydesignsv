import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

const JOURNEY_BANNER = "https://live.staticflickr.com/65535/55604809784_17d40a7182_b.jpg";

type Project = {
  title: string;
  slug: string;
  url: string;
};

// Palmetto group — rendered in its own section
const palmettos: Project[] = [
  { title: "Palmetto San Ramon", slug: "sanramon", url: "https://decobayinteriors.com/sanramon" },
  { title: "Palmetto Petaluma", slug: "petaluma", url: "https://decobayinteriors.com/petaluma" },
  { title: "Palmetto San Jose", slug: "sanjose", url: "https://decobayinteriors.com/sanjose" },
  { title: "Palmetto Stonestown", slug: "stonestown", url: "https://decobayinteriors.com/stonestown" },
  { title: "Palmetto Berkeley", slug: "berkeley", url: "https://decobayinteriors.com/berkeley" },
  { title: "Palmetto Journey", slug: "journey", url: "https://decobayinteriors.com/journey" },
  { title: "Palmetto Fremont", slug: "fremont", url: "https://decobayinteriors.com/fremont" },
];

// All other projects
const projects: Project[] = [
  { title: "Hardscape", slug: "hardscape", url: "https://decobayinteriors.com/hardscape" },
  { title: "Kat and Adam", slug: "katAndAdam", url: "https://decobayinteriors.com/katAndAdam" },
  { title: "Opera Plaza", slug: "operaplaza", url: "https://decobayinteriors.com/operaplaza" },
  { title: "Sarita", slug: "sarita", url: "https://decobayinteriors.com/sarita" },
  { title: "Shootz", slug: "shootz", url: "https://decobayinteriors.com/shootz" },
];

// Combined list for SEO / JSON-LD
const allProjects: Project[] = [...palmettos, ...projects];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={`/${project.slug}`}
      className="reveal reveal-up project-card group block rounded-sm border border-border bg-background/60 backdrop-blur p-7 md:p-8"
      style={{ transitionDelay: `${(index % 6) * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="kicker">Project</span>
        <ArrowUpRight className="card-arrow h-5 w-5 text-accent" />
      </div>

      <h2 className="font-display text-2xl md:text-3xl mt-4 group-hover:text-accent transition-colors">
        {project.title}
      </h2>

      <p className="mt-3 text-xs md:text-sm text-muted-foreground break-all">
        <span className="underline underline-offset-4 group-hover:text-accent transition-colors">
          decobayinteriors.com/{project.slug}
        </span>
      </p>
    </a>
  );
}

function ProjectsPage() {
  useReveal();

  return (
    <main className="bg-background text-foreground relative overflow-x-hidden">
      {/* Blob decorativo, mismo vibe que Shootz */}
      <div
        aria-hidden
        className="absolute -top-[18vh] -right-[18vw] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full bg-accent/10 blur-[90px] pointer-events-none z-0"
      />

      <Header />

      <article className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {/* Hero / intro */}
        <section className="pt-16 md:pt-24 pb-14 md:pb-20">
          <p className="kicker reveal reveal-fade">Selected work · DECOBAY Interiors</p>

          <h1 className="reveal reveal-up font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-5 max-w-4xl">
            Projects that <em className="italic text-accent">shape space.</em>
          </h1>

          <p className="reveal reveal-fade mt-6 max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed">
            A curated index of commercial and residential work by DECOBAY Interiors. Explore each
            project below.
          </p>
        </section>

        {/* Projects section (moved before Palmettos) */}
        <section aria-labelledby="projects-heading" className="mb-16 md:mb-24">
          <div className="mb-8 md:mb-10">
            <p className="kicker reveal reveal-fade">More work</p>
            <h2
              id="projects-heading"
              className="reveal reveal-up font-display text-3xl md:text-4xl lg:text-5xl mt-3"
            >
              <em className="italic text-accent">Projects</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Palmettos section */}
        <section aria-labelledby="palmettos-heading">
          <div className="mb-8 md:mb-10">
            <p className="kicker reveal reveal-fade">Restaurant group</p>
            <h2
              id="palmettos-heading"
              className="reveal reveal-up font-display text-3xl md:text-4xl lg:text-5xl mt-3"
            >
              <em className="italic text-accent">Palmettos</em>
            </h2>
            <p className="reveal reveal-fade mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              A family of restaurant locations, each designed to feel connected
              to its own neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {palmettos.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Línea de cierre */}
        <p className="reveal reveal-fade mt-16 md:mt-24 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          Commercial &amp; residential spaces designed &amp; built by DECOBAY
        </p>

        {/* Navegación secundaria, igual que en Shootz */}
        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-4 text-sm">
          <Link to="/" className="underline underline-offset-4 hover:text-accent transition-colors">
            ← Back to DECOBAY Interiors
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
}

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Projects — DECOBAY Interiors" },
      {
        name: "description",
        content:
          "Selected projects by DECOBAY Interiors — Hardscape, Kat and Adam, Opera Plaza, Sarita, Shootz, plus the Palmettos group (San Ramon, Petaluma, San Jose, Stonestown, Berkeley, Journey, Fremont).",
      },
      {
        name: "keywords",
        content:
          "DECOBAY Interiors, Hardscape, Kat and Adam, Opera Plaza, Sarita, Shootz, Palmetto San Ramon, Palmetto Petaluma, Palmetto San Jose, Palmetto Stonestown, Palmetto Berkeley, Palmetto Journey, Palmetto Fremont, interior design, commercial design",
      },
      { property: "og:title", content: "Projects — DECOBAY Interiors" },
      {
        property: "og:description",
        content: "A curated index of commercial and residential work by DECOBAY Interiors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://decobayinteriors.com/links" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projects — DECOBAY Interiors" },
      {
        name: "twitter:description",
        content: "A curated index of commercial and residential work by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://decobayinteriors.com/links" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects — DECOBAY Interiors",
          url: "https://decobayinteriors.com/links",
          creator: {
            "@type": "Organization",
            name: "DECOBAY Interiors",
            url: "https://decobayinteriors.com/",
          },
          hasPart: allProjects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: p.url,
          })),
        }),
      },
    ],
  }),
  component: ProjectsPage,
});