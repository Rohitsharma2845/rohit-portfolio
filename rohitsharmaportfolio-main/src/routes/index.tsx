import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Download, Mail, ArrowRight, Github, Linkedin, MapPin, Phone, ExternalLink,
  Sparkles, Code2, Database, Layout, Server, ShieldCheck, Cpu, Cloud, Sun, Moon,
  ArrowUp, GraduationCap, Award, Users, Eye, Rocket, Menu, X, Star, GitFork, Flame, Activity,
} from "lucide-react";
import rohit from "@/assets/rohit.jpg";
import heroBg from "@/assets/hero-gradient.jpg";
import sensaiShot from "@/assets/project-sensai.jpg";
import quickaiShot from "@/assets/project-quickai.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rohit Sharma — AI Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Rohit Sharma — aspiring AI Engineer and Full-Stack Developer building intelligent, scalable digital experiences." },
      { property: "og:title", content: "Rohit Sharma — AI Engineer & Full-Stack Developer" },
      { property: "og:description", content: "Portfolio of Rohit Sharma — aspiring AI Engineer and Full-Stack Developer." },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl"
    >
      {children}
    </motion.h2>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-fuchsia-500 to-sky-400"
    />
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(nav.map((n) => n.id));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <div
          className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border/60 px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elevated" : "glass"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 pl-2">
            <div className="grid size-7 place-items-center rounded-full bg-foreground text-background text-xs font-semibold">RS</div>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Rohit Sharma</span>
          </a>
          <nav className="relative hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const isActive = active === n.id;
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {n.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 sm:inline-flex"
            >
              Let's talk <ArrowRight className="size-3.5" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-background/70 backdrop-blur-xl md:hidden"
        onClick={() => setOpen(false)}
      >
        <motion.nav
          initial={false}
          animate={open ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-24 flex max-w-md flex-col gap-1 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {nav.map((n, i) => (
            <motion.a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              initial={false}
              animate={open ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ delay: open ? i * 0.04 : 0 }}
              className="rounded-2xl glass px-5 py-4 text-lg font-medium"
            >
              {n.label}
            </motion.a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-4 text-lg font-medium text-background"
          >
            Let's talk <ArrowRight className="size-4" />
          </a>
        </motion.nav>
      </motion.div>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  return (
    <div id="top" className="relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0 -z-10">
        <img src={heroBg} alt="" width={1920} height={1280} className="size-full object-cover opacity-90 dark:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </motion.div>
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 size-[640px] -translate-x-1/2 rounded-full bg-aurora blur-3xl opacity-70" />

      <Section className="!pt-44 md:!pt-52">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-aurora blur-2xl opacity-80" />
              <div className="relative grid size-36 place-items-center rounded-full glass-strong p-1 md:size-44">
                <img
                  src={rohit}
                  alt="Rohit Sharma portrait"
                  width={512}
                  height={512}
                  className="size-full rounded-full object-cover object-top"
                />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 -top-1 flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" /> Available
              </motion.div>
              {/* Floating tech badges */}
              {[
                { l: "React", c: "-left-20 top-2", d: 0 },
                { l: "Next.js", c: "-right-24 top-16", d: 0.4 },
                { l: "Node", c: "-left-24 bottom-4", d: 0.8 },
                { l: "AI APIs", c: "-right-16 -bottom-2", d: 1.2 },
              ].map((b) => (
                <motion.div
                  key={b.l}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay: 0.6 + b.d * 0.15, duration: 0.6 },
                    scale: { delay: 0.6 + b.d * 0.15, duration: 0.6 },
                    y: { duration: 5 + b.d, repeat: Infinity, ease: "easeInOut", delay: b.d },
                  }}
                  className={`absolute hidden rounded-full glass-strong px-3 py-1.5 text-xs font-medium shadow-soft md:flex ${b.c}`}
                >
                  {b.l}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <Eyebrow>AI Engineer • Full-Stack Developer</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl font-semibold tracking-[-0.04em] text-foreground md:text-7xl lg:text-8xl"
          >
            Rohit Sharma.
            <br />
            <span className="text-gradient">Building intelligent</span>
            <br />
            digital experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          >
            Aspiring AI engineer crafting scalable, user-centric applications with
            React, Next.js, Node.js and modern AI APIs — built secure, responsive, and high-performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-glow transition hover:scale-[1.02]">
              View Projects <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition hover:bg-accent">
              <Mail className="size-4" /> Contact me
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-accent">
              <Download className="size-4" /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-3 md:gap-6"
          >
            {[
              { k: "2+", v: "Years coding" },
              { k: "10+", v: "Projects shipped" },
              { k: "7.0", v: "Current CGPA" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-3xl px-4 py-5 text-left">
                <div className="text-2xl font-semibold tracking-tight md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>About</Eyebrow>
          <H2>A builder learning at the edge of AI and the web.</H2>
        </div>
        <div className="md:col-span-7 md:pt-2">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-balance text-lg text-muted-foreground md:text-xl">
             I'm an enthusiastic B.Tech student passionate about Artificial Intelligence, full-stack development and cloud architecture. I enjoy turning ambiguous problems into clean, dependable software — and shipping it.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 glass rounded-3xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-11 place-items-center rounded-2xl bg-foreground/5 text-foreground">
                <GraduationCap className="size-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Education</div>
                <div className="mt-1 text-lg font-medium">Bachelor of Technology — Computer Science</div>
                <div className="text-muted-foreground">Meerut Institute of Engineering and Technology · 2023 – 2027</div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-sm">
                  Current CGPA <span className="font-semibold text-foreground">7.0 / 10.0</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Users, t: "Head, Discipline Committee", d: "Computer Science Department" },
              { icon: Eye, t: "Visual Head", d: "Computer Society" },
              { icon: Rocket, t: "Shipped AI products", d: "Sensai, QuickAI & more" },
              { icon: Award, t: "Continuous learner", d: "Daily commits on GitHub" },
            ].map(({ icon: Icon, t, d }) => (
              <motion.div key={t} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-2xl p-4">
                <Icon className="size-5 text-primary" />
                <div className="mt-3 text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const skillGroups = [
  { icon: Code2, title: "Languages", items: ["C", "Java", "Python", "JavaScript", "SQL"] },
  { icon: Layout, title: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { icon: Server, title: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { icon: Database, title: "Database", items: ["PostgreSQL", "MongoDB"] },
  { icon: ShieldCheck, title: "Tools", items: ["Git", "GitHub", "Clerk Auth", "AI APIs"] },
  { icon: Cloud, title: "Concepts", items: ["Full-Stack Dev", "Cloud Architecture"] },
];

function Skills() {
  return (
    <Section id="skills">
      <div className="mb-14 max-w-2xl">
        <Eyebrow>Toolkit</Eyebrow>
        <H2>Tools I reach for to ship fast.</H2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ icon: Icon, title, items }, i) => (
          <motion.div
            key={title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl glass p-6 transition"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-aurora opacity-0 blur-2xl transition group-hover:opacity-60" />
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-foreground/5">
                <Icon className="size-5" />
              </div>
              <div className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{title}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-sm text-foreground/90 backdrop-blur transition hover:border-primary/60 hover:text-foreground">
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const projects = [
  {
    name: "Sensai",
    tag: "AI Career & Interview Prep",
    desc: "An AI-powered platform that personalizes career guidance, simulates interviews and tracks skill progress end-to-end.",
    stack: ["Next.js", "PostgreSQL", "Clerk Auth", "AI APIs"],
    features: ["AI interview prep", "Career guidance", "Skill development", "Progress tracking"],
    img: sensaiShot,
    live: "https://sensai-rosy-beta.vercel.app",
    repo: "#",
  },
  {
    name: "QuickAI",
    tag: "AI Content & Image Generation",
    desc: "A full-stack creative studio for AI text and image generation with auth, REST APIs and a responsive dashboard.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind"],
    features: ["AI text generation", "AI image generation", "Auth", "REST APIs", "Dashboard"],
    img: quickaiShot,
    live: "https://quick-ai-one-beta.vercel.app",
    repo: "#",
  },
];

function Work() {
  return (
    <Section id="work">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>Selected work</Eyebrow>
          <H2>Products shipped with care.</H2>
        </div>
        <a href="https://github.com/Rohitsharma2845" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground md:inline-flex">
          All projects on GitHub <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="space-y-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="group relative grid items-center gap-8 overflow-hidden rounded-[2rem] glass-strong p-6 md:grid-cols-12 md:p-8"
          >
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-aurora opacity-50" />
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  src={p.img}
                  alt={`${p.name} preview`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="relative aspect-[4/3] size-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{p.name}</h3>
              <p className="mt-4 text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground/80 backdrop-blur">{s}</span>
                ))}
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="size-1 rounded-full bg-primary" />{f}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={p.live} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90">
                  Live demo <ExternalLink className="size-3.5" />
                </a>
                <a href={p.repo} className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium transition hover:bg-accent">
                  <Github className="size-4" /> Code
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

const services = [
  { icon: Sparkles, t: "AI Web Apps", d: "Intelligent web apps powered by modern AI APIs." },
  { icon: Code2, t: "Full-Stack Dev", d: "Scalable end-to-end apps with modern stacks." },
  { icon: Layout, t: "Frontend", d: "Fast, responsive UIs with React & Next.js." },
  { icon: Server, t: "Backend & APIs", d: "REST APIs with Node.js and Express.js." },
  { icon: Database, t: "Database Design", d: "Pragmatic MongoDB & PostgreSQL schemas." },
  { icon: ShieldCheck, t: "Auth Systems", d: "Secure auth with Clerk and JWT." },
  { icon: Cpu, t: "Responsive UI/UX", d: "Modern interfaces optimized for every screen." },
];

function Services() {
  return (
    <Section id="services">
      <div className="mb-14 max-w-2xl">
        <Eyebrow>Services</Eyebrow>
        <H2>How I can help you build.</H2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, t, d }, i) => (
          <motion.div
            key={t}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl glass p-7 transition"
          >
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-48 rounded-full bg-aurora opacity-0 blur-2xl transition group-hover:opacity-60" />
            <div className="grid size-12 place-items-center rounded-2xl bg-foreground text-background">
              <Icon className="size-5" />
            </div>
            <div className="mt-6 text-xl font-semibold tracking-tight">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const stack = ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Java", "Python", "JavaScript", "TypeScript", "Tailwind", "Git", "GitHub", "Clerk", "REST APIs", "AI APIs"];

function TechStack() {
  const row = [...stack, ...stack];
  return (
    <Section>
      <div className="mb-14 max-w-2xl">
        <Eyebrow>Tech stack</Eyebrow>
        <H2>The cloud of tech I work with.</H2>
        <p className="mt-4 text-muted-foreground">An evolving toolkit — picked for clarity, performance and developer joy.</p>
      </div>
      <div
        className="relative overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}
      >
        <motion.div
          className="flex w-max gap-3 py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        >
          {row.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="cursor-default whitespace-nowrap rounded-2xl glass px-5 py-3 text-sm font-medium transition hover:scale-105 hover:shadow-glow"
            >
              {s}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="mt-3 flex w-max gap-3 py-2"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 44, ease: "linear", repeat: Infinity }}
        >
          {row.map((s, i) => (
            <span
              key={`r-${s}-${i}`}
              className="cursor-default whitespace-nowrap rounded-2xl glass px-5 py-3 text-sm font-medium transition hover:scale-105 hover:shadow-glow"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function GitHubStats() {
  const stats = [
    { icon: Activity, k: "300+", v: "Contributions this year" },
    { icon: Star, k: "20+", v: "Repository stars" },
    { icon: GitFork, k: "15+", v: "Public repositories" },
    { icon: Flame, k: "30d", v: "Longest streak" },
  ];
  const langs = [
    { name: "JavaScript", pct: 32, c: "from-yellow-400 to-amber-300" },
    { name: "TypeScript", pct: 24, c: "from-sky-500 to-blue-400" },
    { name: "Python", pct: 18, c: "from-emerald-500 to-teal-400" },
    { name: "Java", pct: 14, c: "from-rose-500 to-orange-400" },
    { name: "CSS", pct: 12, c: "from-fuchsia-500 to-pink-400" },
  ];
  return (
    <Section id="github">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>GitHub Activity</Eyebrow>
          <H2>Building in public.</H2>
        </div>
        <a
          href="https://github.com/Rohitsharma2845"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full glass px-4 py-2 text-sm transition hover:bg-accent md:inline-flex"
        >
          <Github className="size-4" /> @Rohitsharma2845
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(({ icon: Icon, k, v }, i) => (
          <motion.div
            key={v}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl p-6"
          >
            <Icon className="size-5 text-primary" />
            <div className="mt-4 text-3xl font-semibold tracking-tight">{k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{v}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-12">
        {/* Contribution grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:col-span-8 rounded-3xl glass p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Contributions</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span
                  key={l}
                  className="size-2.5 rounded-[3px]"
                  style={{ background: l === 0 ? "color-mix(in oklab, var(--foreground) 6%, transparent)" : `color-mix(in oklab, var(--primary) ${15 + l * 18}%, transparent)` }}
                />
              ))}
              More
            </div>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {Array.from({ length: 7 * 26 }).map((_, i) => {
              const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
              const level = Math.floor(Math.abs(seed) * 5);
              const bg =
                level === 0
                  ? "color-mix(in oklab, var(--foreground) 6%, transparent)"
                  : `color-mix(in oklab, var(--primary) ${15 + level * 18}%, transparent)`;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i % 26) * 0.008 }}
                  className="aspect-square w-full rounded-[3px]"
                  style={{ background: bg }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Top languages */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:col-span-4 rounded-3xl glass p-6"
        >
          <div className="text-sm font-medium">Most used languages</div>
          <div className="mt-5 space-y-4">
            {langs.map((l, i) => (
              <div key={l.name}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-muted-foreground">{l.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-foreground/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct * 3}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${l.c}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || name.length > 100) return toast.error("Please enter a valid name (1-100 chars).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return toast.error("Please enter a valid email.");
    if (!message || message.length > 2000) return toast.error("Message is required (max 2000 chars).");
    setSending(true);
    try {
      await emailjs.send(
        "service_2x8o6qe",
        "template_vzkla1e",
        {
          from_name: name,
          from_email: email,
          subject: form.subject.trim() || "New portfolio message",
          message,
        },
        { publicKey: "EKXCOXQJX5XxCsW0M" },
      );
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSent(true);
    } catch (err) {
      toast.error("Failed to send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };


  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <H2>Let's build something great.</H2>
          <p className="mt-5 text-muted-foreground">
            Open to internships, freelance projects and collaborations on
            AI-powered products.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: MapPin, label: "Modinagar, India", href: "#" },
              { icon: Mail, label: "rohitsh6653@gmail.com", href: "mailto:rohitsh6653@gmail.com" },
              { icon: Phone, label: "+91 7217442150", href: "tel:+917217442150" },
              { icon: Linkedin, label: "linkedin.com/in/rohit-sharma-2803c1002", href: "https://linkedin.com/in/rohit-sharma-2803c1002" },
              { icon: Github, label: "github.com/Rohitsharma2845", href: "https://github.com/Rohitsharma2845" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="group flex items-center gap-4 rounded-2xl glass px-4 py-3 transition hover:bg-accent">
                <div className="grid size-10 place-items-center rounded-xl bg-foreground/5">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 text-sm">{label}</div>
                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:col-span-7 rounded-3xl glass-strong p-6 md:p-8"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
            >
              <div className="mb-5 grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Message sent!</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Send another message <ArrowRight className="size-4" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Your name" value={form.name} onChange={update("name")} maxLength={100} required />
                <Field label="Email" type="email" placeholder="you@domain.com" value={form.email} onChange={update("email")} maxLength={255} required />
              </div>
              <div className="mt-4">
                <Field label="Subject" placeholder="What's it about?" value={form.subject} onChange={update("subject")} maxLength={150} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell me a bit about your idea…"
                  value={form.message}
                  onChange={update("message")}
                  maxLength={2000}
                  required
                  className="w-full resize-none rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background"
                />
              </div>
              <button type="submit" disabled={sending} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-glow transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100">
                {sending ? "Sending..." : "Send message"} <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rohit Sharma. Crafted with care.</div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "https://github.com/Rohitsharma2845" },
            { icon: Linkedin, href: "https://linkedin.com/in/rohit-sharma-2803c1002" },
            { icon: Mail, href: "mailto:rohitsh6653@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} className="grid size-9 place-items-center rounded-full glass transition hover:bg-accent">
              <Icon className="size-4" />
            </a>
          ))}
          <a href="#top" className="ml-2 inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm transition hover:bg-accent">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Services />
        <TechStack />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
