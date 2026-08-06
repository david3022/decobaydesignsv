import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const isHome = currentPath === "/";

  const sectionLink = (hash: string, label: string) => {
    const cls = "hover:text-accent transition-colors";
    return isHome ? (
      <a className={cls} href={`#${hash}`}>
        {label}
      </a>
    ) : (
      <Link className={cls} to="/" hash={hash}>
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-xl md:text-2xl tracking-wide">
          DECOBAY <span className="text-muted-foreground">Interiors</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {sectionLink("philosophy", "Philosophy")}
          {sectionLink("projects", "Projects")}
          {sectionLink("services", "Services")}
          <span className="h-4 w-px bg-border" />
          {/* <Link className="hover:text-accent transition-colors" to="/sarita">Sarita</Link> */}
        </nav>
      </div>
    </header>
  );
}
