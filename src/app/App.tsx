import { type ComponentType, type FormEvent, type MouseEvent as ReactMouseEvent, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaFilePdf, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  ArrowRight,
  Award,
  Clock,
  Code,
  Database,
  ExternalLink,
  GitBranch,
  Globe,
  Mail,
  Menu,
  Package,
  Palette,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import { ImageWithFallback } from "./components/figma/ImageWithFallback";

type Project = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
};

type Skill = {
  icon: ComponentType<{ size?: number; className?: string }>;
  name: string;
  description: string;
  gradient: string;
};

type Service = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
};

const navItems = ["About", "Skills", "Projects", "Services", "Contact"];

const projects: Project[] = [
  {
    name: "Clip2Concept",
    description:
      "YouTube idea extraction app for creators with AI summary flow, notes system, and optimized content planning.",
    image: `${import.meta.env.BASE_URL}images/clip2concept.svg`,
    tags: ["Kotlin", "Compose", "MVVM", "Firebase", "YouTube API"],
    github: "https://github.com/kumarpankajkumar123/Clip2Concept",
  },
  {
    name: "TagInfoFinder",
    description:
      "A YouTube tags intelligence app for creator growth with keyword-driven recommendations and practical analytics.",
    image: `${import.meta.env.BASE_URL}images/tags-modified.png`,
    tags: ["REST API", "Firebase", "Material", "MVVM"],
    github: "https://github.com/kumarpankajkumar123/TagInfoFinder",
  },
  {
    name: "EduFun",
    description:
      "Gamified educational Android app focused on engagement, repeat usage and learning progress for kids.",
    image: `${import.meta.env.BASE_URL}images/edufun_child.jpg`,
    tags: ["Android", "Java", "Animation", "Clean UI"],
    github: "https://github.com/kumarpankajkumar123/EduFun_Android_Application",
  },
  {
    name: "QR Code Scanner",
    description:
      "Fast QR scanner with practical utility features and reliable real-time recognition for daily user workflows.",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1400&q=80",
    tags: ["CameraX", "ML Kit", "Coroutines"],
    github: "https://github.com/kumarpankajkumar123/qr_code-scanner-app",
  },
];

const skills: Skill[] = [
  {
    icon: Smartphone,
    name: "Android Studio",
    description: "Professional Android workflow and tooling",
    gradient: "from-[#22d3ee] via-[#0ea5e9] to-[#0284c7]",
  },
  {
    icon: Code,
    name: "Kotlin",
    description: "Maintainable and scalable mobile code",
    gradient: "from-[#38bdf8] via-[#6366f1] to-[#8b5cf6]",
  },
  {
    icon: Package,
    name: "Jetpack Compose",
    description: "Modern declarative UI patterns",
    gradient: "from-[#10b981] via-[#14b8a6] to-[#06b6d4]",
  },
  {
    icon: Database,
    name: "Firebase",
    description: "Auth, Firestore, notifications, analytics",
    gradient: "from-[#f59e0b] via-[#f97316] to-[#ef4444]",
  },
  {
    icon: Globe,
    name: "REST APIs",
    description: "Stable integrations and API architecture",
    gradient: "from-[#a3e635] via-[#22c55e] to-[#14b8a6]",
  },
  {
    icon: GitBranch,
    name: "Git + GitHub",
    description: "Version control and delivery consistency",
    gradient: "from-[#c084fc] via-[#a855f7] to-[#6366f1]",
  },
];

const services: Service[] = [
  {
    icon: Smartphone,
    title: "Android App Development",
    description: "From discovery to delivery for production-ready Android applications.",
  },
  {
    icon: Palette,
    title: "UI Implementation",
    description: "Pixel-accurate mobile UI with polished interaction behavior.",
  },
  {
    icon: Database,
    title: "Backend Integration",
    description: "Robust API and Firebase integration with secure data handling.",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Secure login systems with clean access control design.",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description: "Faster startup, smoother scrolling, and reduced memory overhead.",
  },
  {
    icon: TrendingUp,
    title: "Maintenance",
    description: "Ongoing updates, monitoring, and release support.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Clean Architecture",
    text: "Code stays maintainable as your product grows.",
  },
  {
    icon: Package,
    title: "Scalable Codebase",
    text: "Built for future features without refactoring chaos.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    text: "Predictable milestones and transparent progress.",
  },
  {
    icon: Users,
    title: "Client Collaboration",
    text: "Clear communication and fast decision loops.",
  },
];

const titleCycle = ["Android Developer", "Freelance Engineer", "Product-Focused Builder"];

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-cyan-200/90">{eyebrow}</p>
      <h2 className="text-balance font-[Sora,sans-serif] text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-slate-300 md:text-lg">{subtitle}</p>
    </motion.div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 180, damping: 24, mass: 0.3 });
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 90]);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 14, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 14, mass: 0.5 });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [formError, setFormError] = useState("");

  const heroStats = useMemo(
    () => [
      { icon: Award, value: "1.5+", label: "Years Experience" },
      { icon: Rocket, value: "10+", label: "Projects Delivered" },
      { icon: Star, value: "100%", label: "Freelance Focus" },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedTitle(titleCycle[0]);
      return;
    }

    let i = 0;
    const text = titleCycle[titleIndex];
    const interval = window.setInterval(() => {
      i += 1;
      setTypedTitle(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setTypedTitle("");
          setTitleIndex((prev) => (prev + 1) % titleCycle.length);
        }, 950);
      }
    }, 60);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, titleIndex]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedProject]);

  const handleImageMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;

    tiltX.set(-yPercent * 7);
    tiltY.set(xPercent * 7);
  };

  const resetImageTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, budget, message } = contactForm;

    if (!name.trim() || !email.trim() || !budget.trim() || !message.trim()) {
      setFormError("Please fill all fields before submitting.");
      return;
    }

    setFormError("");
    const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
    const messageText = `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nMessage:\n${message}`;
    const body = encodeURIComponent(messageText);
    const whatsappText = encodeURIComponent(`New Project Inquiry\n\n${messageText}`);
    const whatsappUrl = `https://wa.me/917417322289?text=${whatsappText}`;
    const mailtoUrl = `mailto:pankajkm347@gmail.com?subject=${subject}&body=${body}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.location.href = mailtoUrl;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#071321] text-white grain-bg">
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-[#22d3ee] via-[#34d399] to-[#f59e0b]"
      />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[#22d3ee]/16 blur-3xl" />
        <div className="absolute right-[-14rem] top-[16%] h-[36rem] w-[36rem] rounded-full bg-[#34d399]/14 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-[28%] h-[30rem] w-[30rem] rounded-full bg-[#fb923c]/16 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.14),transparent_38%)]" />
      </div>

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-white/10 bg-[#071321]/72 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex flex-col leading-tight">
            <span className="font-[Sora,sans-serif] text-xl font-semibold tracking-tight text-white">
              Pankaj Kumar
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/80">Android Developer</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-100 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-cyan-300">
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2 font-medium text-[#05212e] transition hover:brightness-110"
            >
              Hire Me
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            className="rounded-lg border border-white/20 p-2 text-slate-100 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 bg-[#071321]/95 md:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-slate-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section id="top" className="mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-20 pt-28 md:px-8">
        <div className="grid w-full gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
              <Sparkles size={14} /> Open For New Projects
            </div>

            <h1 className="text-balance font-[Sora,sans-serif] text-[2.2rem] font-semibold leading-[1.08] text-white md:text-[3.45rem]">
              Designing and building Android apps with premium product quality.
            </h1>

            <p className="mt-4 min-h-8 font-[Space_Grotesk,sans-serif] text-lg text-emerald-200 md:text-2xl">
              {typedTitle}
              {!prefersReducedMotion && <span className="ml-1 animate-pulse text-emerald-300">|</span>}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Freelance Android Developer specializing in Kotlin, Jetpack Compose, MVVM, and Firebase. I turn product ideas into smooth, scalable mobile experiences.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-7 py-3 font-medium text-[#05212e] transition hover:brightness-110"
              >
                View Projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div style={{ y: heroParallaxY }} className="relative mx-auto w-full max-w-[25rem]">
            <motion.div
              className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-br from-cyan-300/35 via-emerald-300/20 to-orange-300/25 blur-2xl"
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-1 rounded-[2.1rem] border border-cyan-200/30"
              animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative rounded-[2rem] border border-white/15 bg-white/8 p-2 backdrop-blur-xl glass-card"
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={resetImageTilt}
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <ImageWithFallback
                  src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                  alt="Pankaj Kumar"
                  className="h-[29rem] w-full rounded-[1.5rem] object-cover"
                />
                <motion.div
                  className="pointer-events-none absolute -inset-y-8 left-[-35%] w-[45%] rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={prefersReducedMotion ? undefined : { x: ["0%", "260%"] }}
                  transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <SectionHeader
          eyebrow="About"
          title="A developer portfolio built like a product landing page"
          subtitle="Modern bento-inspired layout, smooth animations, and clear conversion-focused structure."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {heroStats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/12 bg-white/6 p-7 backdrop-blur-xl glass-card"
            >
              <item.icon className="mb-4 text-cyan-300" size={24} />
              <p className="font-[Sora,sans-serif] text-4xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-slate-300">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="Technology stack for modern Android products"
          subtitle="Focused tooling and architecture choices for scalable, maintainable apps."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl glass-card"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${skill.gradient} opacity-85 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-[#0a2137]/90 p-3">
                <skill.icon className="text-cyan-300" size={24} />
              </div>
              <h3 className="font-[Sora,sans-serif] text-xl font-medium text-white">{skill.name}</h3>
              <p className="mt-2 text-slate-300">{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Featured work with modern card layout"
          subtitle="Case-study style cards with visual hierarchy and smooth micro-interactions."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/6 backdrop-blur-xl glass-card"
            >
              <div className="relative overflow-hidden px-6 pb-5 pt-6">
                <div className="relative mx-auto h-[16.5rem] w-[8.7rem] rounded-[2.1rem] border border-white/25 bg-[#061423] p-[6px] shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                  <div className="absolute left-1/2 top-[7px] z-10 h-[16px] w-[72px] -translate-x-1/2 rounded-full bg-black/70" />
                  <div className="h-full w-full overflow-hidden rounded-[1.65rem]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071321]/65 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-[Sora,sans-serif] text-2xl font-semibold text-white">{project.name}</h3>
                <p className="mt-3 text-slate-300">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2 text-sm font-medium text-[#05212e]"
                  >
                    View Details
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Freelance services for product teams"
          subtitle="Flexible support for new apps, feature work, and long-term Android maintenance."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl glass-card"
            >
              <div className="mb-4 inline-flex rounded-xl border border-white/12 bg-[#0a2137]/90 p-3">
                <service.icon className="text-emerald-300" size={22} />
              </div>
              <h3 className="font-[Sora,sans-serif] text-xl font-medium text-white">{service.title}</h3>
              <p className="mt-2 text-slate-300">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8">
        <SectionHeader
          eyebrow="Why Hire Me"
          title="Execution quality that reduces risk"
          subtitle="Technical ownership, clear communication, and dependable release cycles."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl glass-card"
            >
              <item.icon className="mb-4 text-cyan-300" size={22} />
              <h3 className="font-[Sora,sans-serif] text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-5 pb-24 pt-14 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-8 text-center backdrop-blur-xl glass-card md:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />

          <h2 className="relative font-[Sora,sans-serif] text-3xl font-semibold text-white md:text-4xl">
            Ready to build your Android app?
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-slate-200 md:text-lg">
            Let&apos;s discuss your idea, timeline, and launch plan. I can join from planning to production delivery.
          </p>

          <form onSubmit={handleFormSubmit} className="relative mx-auto mt-8 grid max-w-2xl gap-3 text-left">
            <input
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              className="rounded-xl border border-white/20 bg-[#0a2137]/70 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300/70 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your email"
              value={contactForm.email}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              className="rounded-xl border border-white/20 bg-[#0a2137]/70 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300/70 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Project budget (e.g. $2,000 - $5,000)"
              value={contactForm.budget}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  budget: event.target.value,
                }))
              }
              className="rounded-xl border border-white/20 bg-[#0a2137]/70 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300/70 focus:outline-none"
            />
            <textarea
              placeholder="Tell me about your app idea"
              rows={5}
              value={contactForm.message}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              className="rounded-xl border border-white/20 bg-[#0a2137]/70 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300/70 focus:outline-none"
            />
            {formError && <p className="text-sm text-rose-300">{formError}</p>}
            <button
              type="submit"
              className="mt-1 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-medium text-[#05212e]"
            >
              Submit Project Inquiry
            </button>
          </form>

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:pankajkm347@gmail.com"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-medium text-[#05212e]"
            >
              <Mail className="mr-2" size={18} /> Email Me
            </a>
            <a
              href={`${import.meta.env.BASE_URL}resume/pankaj_just_update.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10"
            >
              <FaFilePdf className="mr-2" /> Download Resume
            </a>
          </div>

          <div className="relative mt-8 flex justify-center gap-4">
            <a
              href="https://github.com/kumarpankajkumar123"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 p-3 text-slate-100 transition hover:bg-white/10"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/pankaj-kumar-a5a827224/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 p-3 text-slate-100 transition hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/pankajk26315693"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 p-3 text-slate-100 transition hover:bg-white/10"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-slate-400 md:px-8">
        © 2026 Pankaj Kumar. Built with modern React, TypeScript, and motion-first UI.
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0a1d2f]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/20 p-2 text-white"
              >
                <X size={16} />
              </button>

              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="font-[Sora,sans-serif] text-2xl font-semibold text-white">{selectedProject.name}</h3>
                <p className="mt-3 text-slate-300">{selectedProject.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2 text-sm font-medium text-[#05212e]"
                >
                  <FaGithub className="mr-2" /> View on GitHub <ExternalLink className="ml-2" size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}






