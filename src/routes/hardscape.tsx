import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Hardscape } from "@/components/Hardscape";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consultation } from "@/components/consultation";

export const Route = createFileRoute("/hardscape")({
  head: () => ({
    meta: [
      { title: "Hardscape — California Project | DECOBAY" },
      {
        name: "description",
        content:
          "Hardscape: a warm, light-filled California home by DECOBAY Interiors. Explore the gallery, design brief and interactive 3D walkthrough.",
      },
      {
        name: "keywords",
        content:
          "Hardscape, California interior design project, 3D interior walkthrough, DECOBAY Interiors",
      },
      { property: "og:title", content: "Hardscapeh — California Interior Design Project" },
      {
        property: "og:description",
        content:
          "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/hardscape" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hardscape — California Interior Design Project" },
      {
        name: "twitter:description",
        content:
          "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/hardscape" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Hardscape",
          about: "Interior design project in California",
          url: "https://deco-bay-dream.lovable.app/hardscape",
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
              name: "Hardscape",
              item: "https://deco-bay-dream.lovable.app/hardscape",
            },
          ],
        }),
      },
    ],
  }),
  component: HardscapePage,
});

function HardscapePage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <article className="pt-24 md:pt-28">
        <header className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="kicker">Featured project · California</p>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Hardscape — a <em className="italic text-accent">California</em> home.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Transform your outdoor space into a seamless extension of your home with DECOBAY’s custom hardscape design services. 
            
          </p>

          <p className="mt-6 max-w-xl text-muted-foreground">
            
            We create thoughtfully planned environments that combine beauty, functionality, and lasting value through patios, walkways, 
            driveways, outdoor kitchens, fire features, retaining walls, pool surrounds, and custom landscape elements
          </p>
        </header>
        <Hardscape />
        <Consultation />
        <nav
          aria-label="Related"
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 flex flex-wrap gap-4 text-sm"
        >
          <Link to="/" className="underline underline-offset-4 hover:text-accent">
            ← Back to DECOBAY Interiors
          </Link>
          <Link to="/" hash="projects" className="underline underline-offset-4 hover:text-accent">
            More projects
          </Link>
          {/* <Link to="/" hash="quote" className="underline underline-offset-4 hover:text-accent">
            Request a quote
          </Link> */}
        </nav>
      </article>
      <Footer />
    </main>
  );
}
