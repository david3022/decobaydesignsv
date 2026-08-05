import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border py-14 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 items-start">
        <div>
          <p className="font-display text-2xl">DECOBAY Interiors</p>
          <p className="text-muted-foreground text-sm mt-2">DECOBAY Designs LLC — All Rights Reserved</p>
          <p className="text-muted-foreground text-sm mt-1">Interior design studio · California, USA</p>
        </div>
        <nav aria-label="Site" className="text-sm space-y-2">
          <p className="kicker mb-2">Explore</p>
          <Link className="block hover:text-accent transition-colors" to="/">Home</Link>
          <Link className="block hover:text-accent transition-colors" to="/" hash="philosophy">Philosophy</Link>
          <Link className="block hover:text-accent transition-colors" to="/" hash="projects">Projects</Link>
          <Link className="block hover:text-accent transition-colors" to="/" hash="services">Services</Link>
          <Link className="block hover:text-accent transition-colors" to="/sarita">Sarita residence</Link>
          <Link className="block hover:text-accent transition-colors" to="/" hash="consultation">Free consultation</Link>
        </nav>
        <div className="text-sm space-y-2">
          <p className="kicker mb-2">Sister studios</p>
          <a className="block hover:text-accent transition-colors" href="https://decobayinteriors.com/decobayco" target="_blank" rel="noreferrer">Decobay&amp;Co →</a>
          <a className="block hover:text-accent transition-colors" href="https://decobayinteriors.com" target="_blank" rel="noreferrer">Decobay Designs →</a>
        </div>
        <div className="text-sm space-y-2 md:text-right">
          <p className="kicker mb-2">Follow</p>
          <a className="block hover:text-accent transition-colors" href="https://www.instagram.com/decobay.interiors/" target="_blank" rel="noreferrer">Instagram</a>
          <a className="block hover:text-accent transition-colors" href="https://www.facebook.com/109287792171724" target="_blank" rel="noreferrer">Facebook</a>
          <a className="block hover:text-accent transition-colors" href="https://www.tiktok.com/@decobay.interiors" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
