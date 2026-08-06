import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";
import s1 from "@/assets/KatAndAdam/k.jpg";
import s2 from "@/assets/KatAndAdam/k1.jpg";
import s3 from "@/assets/KatAndAdam/k2.jpg";
import s4 from "@/assets/KatAndAdam/k4.jpg";
import pano from "@/assets/KatAndAdam/k3.jpg";

const slides = [
  { src: s1, label: "Kitchen" },
  { src: s2, label: "Kitchen" },
  { src: s3, label: "Kitchen" },
  { src: s4, label: "Kitchen" },
];

function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setI((v) => (v + 1) % slides.length), []);
  const prev = useCallback(() => setI((v) => (v - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt={`Sarita residence — ${s.label}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)] ${
            idx === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="absolute bottom-5 left-5 text-background/95">
        <p className="kicker !text-background/70">Sarita · {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
        <p className="font-display text-xl mt-1">{slides[i].label}</p>
      </div>

      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 right-5 flex gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-background" : "w-3 bg-background/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Panorama() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hint, setHint] = useState(true);
  const drag = useRef<{ active: boolean; startX: number; startOffset: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
  });
  const [offset, setOffset] = useState(0); // px translateX on image

  const maxOffset = useCallback(() => {
    const wrap = wrapRef.current, img = imgRef.current;
    if (!wrap || !img) return 0;
    return Math.max(0, img.clientWidth - wrap.clientWidth);
  }, []);

  // Auto-pan gentle until user interacts
  useEffect(() => {
    let raf = 0;
    let dir = 1;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!drag.current.active && hint) {
        setOffset((o) => {
          const m = maxOffset();
          if (m <= 0) return o;
          let nv = o + dir * 18 * dt;
          if (nv > m) { nv = m; dir = -1; }
          if (nv < 0) { nv = 0; dir = 1; }
          return nv;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hint, maxOffset]);

  const onDown = (clientX: number) => {
    drag.current = { active: true, startX: clientX, startOffset: offset };
    setHint(false);
  };
  const onMove = (clientX: number) => {
    if (!drag.current.active) return;
    const m = maxOffset();
    const dx = drag.current.startX - clientX;
    const nv = Math.min(m, Math.max(0, drag.current.startOffset + dx));
    setOffset(nv);
  };
  const onUp = () => { drag.current.active = false; };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onUp}
      >
        <img
          ref={imgRef}
          src={pano}
          alt="Sarita 3D interior — drag to look around"
          draggable={false}
          className="absolute top-0 left-0 h-full max-w-none pointer-events-none"
          style={{ transform: `translateX(${-offset}px)` }}
        />

        <div className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-500 ${hint ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur text-xs">
            <Move className="h-3.5 w-3.5" />
            Drag to explore the 3D space
          </div>
        </div>

        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] tracking-[0.2em] uppercase">3D · Interactive</span>
      </div>
    </div>
  );
}

export function KatAndAdam() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -0.08}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="sarita" className="relative py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      {/* Parallax decorative backdrop */}
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute -top-24 -right-24 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-3xl will-change-transform"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="kicker reveal reveal-fade">05 — Featured project</p>
            <h2 className="reveal reveal-up mt-4 text-4xl md:text-6xl">
              <em className="italic text-accent">Sarita</em> residence
            </h2>
            <p className="reveal reveal-up mt-3 text-sm text-muted-foreground tracking-[0.2em] uppercase">California · Private home</p>
          </div>
          <p className="reveal reveal-fade max-w-md text-muted-foreground">
            A warm, light-filled California home. Linen, oak and travertine in quiet conversation —
            and a fully modeled 3D walkthrough you can explore below.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="reveal reveal-left col-span-12 lg:col-span-7">
            <Carousel />
            <p className="kicker mt-4">Auto · Every 3s</p>
          </div>

          <div className="reveal reveal-right col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-2">
            <p className="kicker">The brief</p>
            <h3 className="text-3xl md:text-4xl mt-3">Light, linen and longevity.</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The Sarita residence is one of our recent California projects — a complete redesign
              focused on calm, warmth and how the family actually lives between rooms.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex justify-between border-b border-border/70 pb-2"><span className="text-muted-foreground">Location</span><span>California</span></li>
              <li className="flex justify-between border-b border-border/70 pb-2"><span className="text-muted-foreground">Scope</span><span>Full home</span></li>
              <li className="flex justify-between border-b border-border/70 pb-2"><span className="text-muted-foreground">Year</span><span>2025</span></li>
            </ul>
          </div>

          <div className="reveal reveal-zoom col-span-12 mt-6 md:mt-10">
            <Panorama />
            <p className="kicker mt-4">3D walkthrough · Custom render</p>
          </div>
        </div>

        <p className="reveal reveal-fade mt-16 text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">
          All projects designed &amp; produced in California
        </p>
      </div>
    </section>
  );
}