"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";

// ✅ Render Spline *only* on the client to avoid hydration mismatches
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// ⤵️ Replace with your real Spline scene URL (must end with `/scene.splinecode`)
const SPLINE_SCENE_URL =
  "https://prod.spline.design/YOUR-REAL-SCENE-ID/scene.splinecode";

export default function RochesterGingerLanding() {
  // Smooth scrolling (client-only)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // syncTouch: true, // <- optional, only if your installed lenis version supports it
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
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
              <a href="#home" className="hover:text-amber-200">
                Home
              </a>
              <a href="#about" className="hover:text-amber-200">
                About
              </a>
              <a href="#ingredients" className="hover:text-amber-200">
                Ingredients
              </a>
              <a href="#reviews" className="hover:text-amber-200">
                Reviews
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#shop"
                className="group rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg shadow-amber-900/30 transition hover:opacity-90"
              >
                Shop
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.96]);

  // Gate 3D/Spline until after mount to avoid SSR/CSR diffs
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Basic guard to avoid loading the known placeholder
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
            // Fallback skeleton to preserve layout
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

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-amber-100 drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]"
          >
            Rochester Ginger: {" "}
            <span className="text-amber-300">A Non-Alcoholic Elixir</span> of
            Ginger & Spice
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-zinc-200/90"
          >
            Freshly fired ginger warmth, citrus lift, and heritage
            craft—bottled for modern rituals.
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
              Discover More
            </a>
            <a
              href="#shop"
              className="rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-xl shadow-amber-900/30 hover:opacity-90"
            >
              Buy Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* Glass card with quick facts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto -mt-12 w-[92%] max-w-5xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-2xl shadow-black/40"
      >
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
          {[
            ["Heritage", "Dickensian recipe"],
            ["Profile", "Ginger • Spice • Citrus"],
            ["Spirit", "0.0% Alcohol"],
            ["Craft", "Small-batch brewed"],
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

function AboutSection() {
  return (
    <Section id="about" title="Our Story" kicker="Since 1870 (in spirit)">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30">
          <p className="text-zinc-300">
            Born from a Victorian tradition and affectionately called a
            “Dickensian recipe,” Rochester Ginger is crafted to deliver the
            rousing warmth of ginger with layered botanicals—without alcohol. We
            honour time: steeping, warming, and clarifying to achieve a clarity
            of flavour that feels both nostalgic and strikingly modern.
          </p>
          <p className="mt-4 text-zinc-300">
            Our process embraces real ginger root and natural botanicals,
            capturing the lively heat, soft sweetness, and aromatic lift that
            made the original English ginger elixirs beloved in winter markets
            and summer picnics alike.
          </p>
        </div>
        <AboutCanvasCard />
      </div>
    </Section>
  );
}

function AboutCanvasCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/30">
      <div className="relative h-72 md:h-full">
        {mounted ? (
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 4, 6]} intensity={1.2} />
            <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
              <GingerKnot />
            </Float>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.6}
            />
          </Canvas>
        ) : (
          <div className="h-full w-full bg-gradient-to-tr from-zinc-900/30 to-amber-900/10" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/30 px-3 py-1.5 text-xs text-amber-100 backdrop-blur-md ring-1 ring-white/10">
          Live 3D: Ginger Knot
        </div>
      </div>
    </div>
  );
}

function GingerKnot() {
  return (
    <mesh>
      <torusKnotGeometry args={[1.1, 0.35, 220, 36]} />
      <meshPhysicalMaterial
        roughness={0.3}
        metalness={0.1}
        transmission={0.1}
        thickness={0.6}
        color="#d2a25b"
        emissive="#3a2a13"
        emissiveIntensity={0.1}
        clearcoat={0.6}
      />
    </mesh>
  );
}

function IngredientsSection() {
  return (
    <Section id="ingredients" title="Ingredients & Process" kicker="Rooted in nature">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-black/30">
          <ul className="space-y-3 text-zinc-300">
            <li>
              <span className="text-amber-200">•</span> Fresh ginger root
              infusion for bold heat
            </li>
            <li>
              <span className="text-amber-200">•</span> Lemon peel & citrus oils
              for lift
            </li>
            <li>
              <span className="text-amber-200">•</span> Warming spices: clove,
              cinnamon, cardamom
            </li>
            <li>
              <span className="text-amber-200">•</span> Cane sugar
              balance—never cloying
            </li>
            <li>
              <span className="text-amber-200">•</span> Cold-filtered clarity
              and a long, clean finish
            </li>
          </ul>
          <p className="mt-4 text-zinc-400 text-sm">
            We brew in small batches and clarify low and slow. Expect a natural
            sediment—proof you’re tasting the real thing.
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
        Micro-3D: Ginger & botanicals as living icons.
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

function TastingNotesSection() {
  return (
    <Section id="notes" title="Tasting Notes & Benefits" kicker="Warmth you can feel">
      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Spiced Heat",
            copy:
              "Immediate ginger fire balanced by clove and cinnamon; vibrant without harshness.",
          },
          {
            title: "Citrus Lift",
            copy:
              "Lemon zest aromatics brighten the mid-palate; a crisp, refreshing arc.",
          },
          {
            title: "Clean Finish",
            copy:
              "Light sweetness gives way to a long, warming finish that invites another sip.",
          },
        ].map((t) => (
          <GlassCard key={t.title} title={t.title} copy={t.copy} />
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-zinc-300">
        <BenefitTag>Non-alcoholic (0.0%)</BenefitTag>
        <BenefitTag>Real ginger infusion</BenefitTag>
        <BenefitTag>Serve neat, over ice, or as a mixer</BenefitTag>
        <BenefitTag>Vegan friendly</BenefitTag>
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

function ReviewsSection() {
  const reviews = [
    {
      quote:
        "A sophisticated ginger kick—warming yet refreshingly clean. My winter and summer staple.",
      author: "Anya, London",
    },
    {
      quote:
        "Complex, adult, and alcohol-free. Gorgeous with soda and a lemon twist.",
      author: "Marco, Milano",
    },
    {
      quote:
        "Tastes like heritage with modern polish—spice, citrus, and a real lingering glow.",
      author: "Jelena, Belgrade",
    },
  ];

  return (
    <Section id="reviews" title="Testimonials" kicker="What people say">
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
  { title: "Rochester Ginger 750ml", price: "€12.90", badge: "Best Seller", image: "/1.png" },
  { title: "Rochester Ginger — 4 Pack", price: "€45.00", badge: "Bundle", image: "/2.png" },
  { title: "Rochester Ginger — 12 Pack", price: "€120.00", badge: "Trade", image: "/3.png" },
];


  return (
    <Section id="shop" title="Shop" kicker="Bring warmth home">
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
              <p className="mt-1 text-sm text-zinc-300">{it.price}</p>
              <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-md shadow-amber-900/30 transition hover:opacity-90">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  // Compute once to avoid any render-time differences
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-serif text-amber-100">Rochester Ginger</div>
            <p className="mt-2 text-sm text-zinc-400">
              A modern non-alcoholic ginger elixir with Victorian soul.
            </p>
          </div>
          <div className="text-sm text-zinc-300/90">
            <ul className="space-y-1">
              <li>
                <a href="#about" className="hover:text-amber-200">
                  About
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-amber-200">
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-200">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-amber-200">
                  Shop
                </a>
              </li>
            </ul>
          </div>
          <div className="text-sm text-zinc-300/90">
            <div className="flex gap-3">
              <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md hover:bg-white/10" href="#">
                Instagram
              </a>
              <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md hover:bg-white/10" href="#">
                Contact
              </a>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              © {currentYear} Rochester Ginger. All rights reserved.
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
    <section
      id={id}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28"
    >
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
