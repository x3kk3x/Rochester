
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// ✅ Render Spline only on client
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// ⤵️ Replace with your real Spline scene URL (must end with `/scene.splinecode`)
const SPLINE_SCENE_URL =
  "https://prod.spline.design/YOUR-REAL-SCENE-ID/scene.splinecode";

export default function RochesterGingerLanding() {
  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0b0f0d,_#050607)] text-zinc-200 selection:bg-amber-300/30 selection:text-amber-100">
      <BackgroundGlow />
      <Navbar />
      <Hero3D />
      <AboutSection />
      <IngredientsSection />
      <TastingNotesSection />
      <ReviewsSection />
      <ShopSection />
      <Footer />
    </main>
  );
}

/* =================== NAV =================== */
function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/30">
          <nav className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/80 to-emerald-600/80 ring-1 ring-white/30" />
              <span className="font-serif text-lg tracking-wide text-amber-100">
                Rochester Ginger
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-200/90">
              <a href="#home" className="hover:text-amber-200">Početna</a>
              <a href="#about" className="hover:text-amber-200">Priča</a>
              <a href="#ingredients" className="hover:text-amber-200">Sastojci</a>
              <a href="#reviews" className="hover:text-amber-200">Utisci</a>
              <a href="#shop" className="hover:text-amber-200">Ponuda</a>
            </div>
            <div className="flex items-center gap-3" />
          </nav>
        </div>
      </div>
    </div>
  );
}

/* =================== HERO =================== */
function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.96]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isValidSplineUrl =
    typeof SPLINE_SCENE_URL === "string" &&
    SPLINE_SCENE_URL.endsWith("/scene.splinecode") &&
    !SPLINE_SCENE_URL.includes("YOUR-REAL-SCENE-ID");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Parallax ambient texture */}
      <motion.div
        style={{ y, scale }}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* Spline 3D scene */}
        <div className="absolute inset-0">
          {mounted && isValidSplineUrl ? (
            <Spline scene={SPLINE_SCENE_URL} />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-emerald-900/30 via-transparent to-amber-900/20" />
          )}
        </div>

        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><filter id=\\'n\\'><feTurbulence baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\' /></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.5\\'/></svg>')",
          }}
        />
      </motion.div>

      {/* Content overlay — same spacing as your original */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-amber-100 drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]"
          >
            Rochester Ginger:{" "}
            <span className="text-amber-300">Bezalkoholni eliksir</span>{" "}
            đumbira i začina
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-zinc-200/90"
          >
            Toplina sveže „zapaljenog” đumbira, citrusni lift i nasleđe zanata —
            flaširano za moderne rituale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#about"
              className="rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-amber-100 backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15"
            >
              Saznaj više
            </a>
            <a
              href="#shop"
              className="rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-xl shadow-amber-900/30 hover:opacity-90"
            >
              Kupi sada
            </a>
          </motion.div>
        </div>
      </div>

      {/* Glass card with quick facts — unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto -mt-12 w-[92%] max-w-5xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-2xl shadow-black/40"
      >
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
          {[
            ["Nasleđe", "Dickensov recept"],
            ["Profil", "Đumbir • Začini • Citrus"],
            ["Alkohol", "0.0%"],
            ["Zanat", "Male serije"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-zinc-400">{k}</dt>
              <dd className="mt-1 font-medium text-amber-100">{v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}

/* =================== ABOUT WITH CAROUSEL =================== */
function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30 min-h-[320px] flex items-center justify-center">
          <div className="max-w-prose text-center">
            <p className="text-zinc-300">
              Rođen iz viktorijanske tradicije i od milošte nazvan „dickensov
              recept”, Rochester Ginger je spravljen da donese pokretnu toplinu
              đumbira sa slojevitim biljem — bez alkohola. Poštujemo vreme:
              potapanje, zagrevanje i bistrenje kako bismo postigli jasnoću
              ukusa koja deluje i nostalgično i iznenađujuće moderno.
            </p>
            <p className="mt-4 text-zinc-300">
              Proces se oslanja na pravi koren đumbira i prirodne biljke,
              hvatajući živu toplotu, meku slast i aromatični lift koji su
              učinili engleske eliksire od đumbira voljenim i na zimskim
              pijacama i na letnjim piknicima.
            </p>
          </div>
        </div>
        <AboutCarouselCard />
      </div>
    </section>
  );
}

/* === Carousel card component (inline) === */
function AboutCarouselCard() {
  const IMAGES = [
    "/website_1.png",
    "/website_2.png",
    "/website_3.png",
    "/website_4.png",
    "/website_5.png",
  ];
  const TARGET_URL = "https://www.rochesterginger.shop/";

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0); // -1 left, +1 right
  const autoplayRef = useRef<number | null>(null);

  // Pointer swipe detection
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  function startAutoplay() {
    stopAutoplay();
    if (paused) return;
    autoplayRef.current = window.setInterval(() => {
      move(1);
    }, 3500);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function move(dir: number) {
    setDirection(dir);
    setIndex((i) => (i + dir + IMAGES.length) % IMAGES.length);
  }

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  function handlePointerDown(e: React.PointerEvent) {
    pointerStartX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (pointerStartX.current == null) return;
    pointerDeltaX.current = e.clientX - pointerStartX.current;
  }
  function handlePointerUp() {
    if (pointerStartX.current == null) return;
    const delta = pointerDeltaX.current;
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    if (delta > 60) move(-1);
    else if (delta < -60) move(1);
  }

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/30"
      onMouseEnter={() => { setPaused(true); stopAutoplay(); }}
      onMouseLeave={() => { setPaused(false); startAutoplay(); }}
    >
      <div
        className="relative h-72 md:h-full cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label="Open shop in new tab"
        onClick={() => window.open(TARGET_URL, "_blank", "noopener,noreferrer")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { window.open(TARGET_URL, "_blank", "noopener,noreferrer"); } }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Background weight/texture */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 10%, rgba(255,229,180,0.10), transparent 60%), radial-gradient(80% 60% at 60% 60%, rgba(255,171,64,0.10), transparent 70%), radial-gradient(70% 60% at 40% 70%, rgba(255,255,255,0.06), transparent 70%), linear-gradient(180deg, rgba(10,10,10,0.7), rgba(10,10,10,0.7))",
          }}
        />

        {/* Carousel viewport */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={IMAGES[index]}
              alt={`Site preview ${index + 1}`}
              draggable={false}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40, scale: 1.00 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-contain object-center scale-99"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </AnimatePresence>
        </div>

        {/* Overlay vignette + label */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-2 py-1.5 text-xs text-amber-100 backdrop-blur-md ring-1 ring-white/10">
          Live: rochesterginger.shop
        </div>

        {/* Controls */}
        <div className="absolute inset-y-0 left-3 flex items-center z-20">
          <button
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            className="rounded-full bg-black/30 p-2 backdrop-blur-md ring-1 ring-white/10 text-white/90 hover:bg-black/40"
            aria-label="Previous preview"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center z-20">
          <button
            onClick={(e) => { e.stopPropagation(); move(1); }}
            className="rounded-full bg-black/30 p-2 backdrop-blur-md ring-1 ring-white/10 text-white/90 hover:bg-black/40"
            aria-label="Next preview"
          >
            ›
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute left-1/2 bottom-3 z-20 -translate-x-1/2 flex gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Show preview ${i + 1}`}
              className={`h-2.5 w-8 rounded-full transition ${i === index ? "bg-amber-300" : "bg-white/20 hover:bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =================== INGREDIENTS =================== */
function IngredientsSection() {
  return (
    <Section id="ingredients" title="Sastojci i proces" kicker="Ukorenjeno u prirodi">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30">
          <ul className="space-y-3 text-zinc-300">
            <li><span className="text-amber-200">•</span> Infuzija svežeg korena đumbira za odlučnu toplinu</li>
            <li><span className="text-amber-200">•</span> Kora limuna i citrusna ulja za podizanje</li>
            <li><span className="text-amber-200">•</span> Grejući začini: karanfilić, cimet, kardamom</li>
            <li><span className="text-amber-200">•</span> Trska šećer za balans — nikad preslatko</li>
            <li><span className="text-amber-200">•</span> Prirodni talog kao dokaz autentičnosti i čist završetak</li>
          </ul>
          <p className="mt-4 text-zinc-400 text-sm">
            Kuvamo u malim serijama i bistrimo polako. Prirodni talog je znak da pijete stvarnu stvar.
          </p>
        </div>
        <IngredientsCanvasCard />
      </div>
    </Section>
  );
}

function IngredientsCanvasCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/30">
      <div className="h-64">
        {mounted ? (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} />
            <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
              <GingerRootIcon />
            </Float>
          </Canvas>
        ) : (
          <div className="h-full w-full bg-gradient-to-tr from-emerald-900/20 to-amber-900/10" />
        )}
      </div>
      <div className="px-5 py-4 text-sm text-zinc-300">
        Mikro-3D: đumbir i botanika kao živi simboli.
      </div>
    </div>
  );
}

function GingerRootIcon() {
  return (
    <group>
      <mesh rotation={[0.6, 0.3, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#c58f3a" roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh position={[1.2, -0.6, 0]} scale={[0.4, 0.4, 0.4]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#b07a2d" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[-1.1, 0.7, 0]} scale={[0.5, 0.5, 0.5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#e0b15d" roughness={0.55} metalness={0.08} />
      </mesh>
    </group>
  );
}

/* =================== NOTES =================== */
function TastingNotesSection() {
  return (
    <Section id="notes" title="Note ukusa i benefiti" kicker="Toplina koju možeš da osetiš">
      <div className="grid gap-8 md:grid-cols-3">
        {[
          { title: "Začinska toplota", copy: "Trenutni „vatreni” đumbir izbalansiran karanfilićem i cimetom; živ, ali nežan." },
          { title: "Citrusni lift", copy: "Aromatika korice limuna osvetljava sredinu ukusa; hrskavo i osvežavajuće." },
          { title: "Čist završetak", copy: "Lagana slast prelazi u dugu, grejuću završnicu koja zove na još jedan gutljaj." },
        ].map((t) => (
          <GlassCard key={t.title} title={t.title} copy={t.copy} />
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-zinc-300">
        <BenefitTag>Bez alkohola (0.0%)</BenefitTag>
        <BenefitTag>Prava infuzija đumbira</BenefitTag>
        <BenefitTag>Serviraj čist, sa ledom ili kao mikser</BenefitTag>
        <BenefitTag>Prikladno za vegane</BenefitTag>
      </div>
    </Section>
  );
}

function GlassCard({ title, copy }: { title: string; copy: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30"
    >
      <h3 className="font-serif text-xl text-amber-100">{title}</h3>
      <p className="mt-2 text-zinc-300">{copy}</p>
    </motion.div>
  );
}

function BenefitTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-amber-100 backdrop-blur-md">
      <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />{" "}
      {children}
    </div>
  );
}

/* =================== REVIEWS =================== */
function ReviewsSection() {
  const reviews = [
    {
      quote:
        "Sofisticirani đumbirovski udar — greje, a ostaje osvežavajuće čist. Moj izbor i zimi i leti.",
      author: "Anja, London",
    },
    {
      quote:
        "Kompleksno, za odraste, a bez alkohola. Predivno sa sodom i kriškom limuna.",
      author: "Marko, Milano",
    },
    {
      quote:
        "Ukus nasleđa sa modernim sjajem — začin, citrus i stvarni, dug topli žar.",
      author: "Jelena, Beograd",
    },
  ];

  return (
    <Section id="reviews" title="Utisci" kicker="Šta ljudi kažu">
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30"
          >
            <p className="text-zinc-200">“{r.quote}”</p>
            <footer className="mt-3 text-sm text-zinc-400">— {r.author}</footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}


function ShopSection() {
  const items = [
    { title: "Rochester Ginger 750ml", badge: "Najtraženije", image: "/1.png" },
    { title: "Rochester Ginger — 4 pakovanja", badge: "Paket", image: "/2.png" },
    { title: "Rochester Ginger — 12 pakovanja", badge: "Za ugostiteljstvo", image: "/3.png" },
  ];

  return (
    <Section id="shop" title="Ponuda" kicker="Ponesi toplinu kući">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/30"
          >
            <div className="aspect-[4/5] relative">
              <img
                src={it.image}
                alt={it.title}
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-lg bg-black/40 px-2.5 py-1 text-xs text-amber-100 backdrop-blur-md ring-1 ring-white/10">
                {it.badge}
              </div>
            </div>

            <div className="p-5">
              <h4 className="font-serif text-lg text-amber-100">{it.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-serif text-amber-100">Rochester Ginger</div>
            <p className="mt-2 text-sm text-zinc-400">
              Moderni bezalkoholni eliksir od đumbira sa viktorijanskom dušom.
            </p>
          </div>
          <div className="text-sm text-zinc-300/90">
            <ul className="space-y-1">
              <li><a href="#about" className="hover:text-amber-200">Priča</a></li>
              <li><a href="#ingredients" className="hover:text-amber-200">Sastojci</a></li>
              <li><a href="#reviews" className="hover:text-amber-200">Utisci</a></li>
              <li><a href="#shop" className="hover:text-amber-200">Ponuda</a></li>
            </ul>
          </div>
          <div className="text-sm text-zinc-300/90">
            <div className="flex gap-3">
              <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md hover:bg-white/10" href="#">
                Instagram
              </a>
              <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md hover:bg-white/10" href="#">
                Kontakt
              </a>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              © {currentYear} Rochester Ginger. Sva prava zadržana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        {kicker && (
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300/70">
            {kicker}
          </div>
        )}
        <h2 className="font-serif text-3xl text-amber-100">{title}</h2>
      </motion.header>
      {children}
    </section>
  );
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[46rem] w-[46rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -right-32 h-[40rem] w-[40rem] rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_60%)]" />
    </div>
  );
}
