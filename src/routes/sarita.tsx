import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Sarita } from "@/components/Sarita";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/sarita")({
  head: () => ({
    meta: [
      { title: "Sarita Residence — California Project | DECOBAY" },
      { name: "description", content: "Sarita residence: a warm, light-filled California home by DECOBAY Interiors. Explore the gallery, design brief and interactive 3D walkthrough." },
      { name: "keywords", content: "Sarita residence, California interior design project, 3D interior walkthrough, DECOBAY Interiors" },
      { property: "og:title", content: "Sarita Residence — California Interior Design Project" },
      { property: "og:description", content: "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deco-bay-dream.lovable.app/sarita" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sarita Residence — California Interior Design Project" },
      { name: "twitter:description", content: "A warm, light-filled California home. Gallery and interactive 3D walkthrough by DECOBAY Interiors." },
    ],
    links: [{ rel: "canonical", href: "https://deco-bay-dream.lovable.app/sarita" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Sarita Residence",
          about: "Interior design project in California",
          url: "https://deco-bay-dream.lovable.app/sarita",
          locationCreated: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" } },
          creator: { "@type": "Organization", name: "DECOBAY Interiors", url: "https://deco-bay-dream.lovable.app/" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://deco-bay-dream.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Sarita residence", item: "https://deco-bay-dream.lovable.app/sarita" },
          ],
        }),
      },
    ],
  }),
  component: SaritaPage,
});

function SaritaPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <article className="pt-24 md:pt-28">
        <header className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="kicker">Featured project · California</p>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Sarita residence — a <em className="italic text-accent">California</em> home.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A full-home interior design project by DECOBAY Interiors. Browse the gallery, read the design
            brief, and explore the interactive 3D walkthrough below.
          </p>
        </header>
        <Sarita />
        <nav aria-label="Related" className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 flex flex-wrap gap-4 text-sm">
          <Link to="/" className="underline underline-offset-4 hover:text-accent">← Back to DECOBAY Interiors</Link>
          <Link to="/" hash="projects" className="underline underline-offset-4 hover:text-accent">More projects</Link>
          <Link to="/" hash="quote" className="underline underline-offset-4 hover:text-accent">Request a quote</Link>
        </nav>
      </article>
      <Footer />
    </main>
  );
}
