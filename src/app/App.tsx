import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { FaGithub, FaLinkedin, FaTwitter, FaFilePdf } from "react-icons/fa";
import {
  Smartphone,
  Code,
  Palette,
  Database,
  Zap,
  GitBranch,
  Package,
  Shield,
  Clock,
  Users,
  Mail,
  ExternalLink,
  Target,
  TrendingUp,
  Rocket,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Award,
  Star,
  Globe
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type Project = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
};


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const titles = ["Android Developer", "Freelancer"];
  const [typedText, setTypedText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  const paragraphText =
    "Freelance Android Developer | Kotlin | Jetpack Compose | MVVM | Firebase";

  const [typedParagraph, setTypedParagraph] = useState("");

  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1000); // 👈 dono ek saath start honge

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (!startTyping) return;

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startParaTyping = () => {
      intervalId = setInterval(() => {
        setTypedParagraph((prev) => {
          if (charIndex < paragraphText.length) {
            const updated = prev + paragraphText[charIndex];
            charIndex++;
            return updated;
          } else {
            if (intervalId) clearInterval(intervalId);

            timeoutId = setTimeout(() => {
              setTypedParagraph("");
              charIndex = 0;
              startParaTyping();
            }, 2000);

            return prev;
          }
        });
      }, 120);
    };

    startParaTyping();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [startTyping]);


  useEffect(() => {
    if (!startTyping) return;

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startTitleTyping = () => {
      intervalId = setInterval(() => {
        setTypedText((prev) => {
          if (charIndex < titles[titleIndex].length) {
            const updated = prev + titles[titleIndex][charIndex];
            charIndex++;
            return updated;
          } else {
            if (intervalId) clearInterval(intervalId);

            timeoutId = setTimeout(() => {
              setTypedText("");
              charIndex = 0;
              setTitleIndex((prev) => (prev + 1) % titles.length);
            }, 1500);

            return prev;
          }
        });
      }, 150);
    };

    startTitleTyping();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [startTyping, titleIndex]);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#312e81] text-white overflow-x-hidden">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, 60, 0],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/80 backdrop-blur-xl shadow-lg' : ''
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Pankaj Kumar
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href='#contact'>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full px-6">
                Hire Me
              </Button>
            </a>

          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl px-6 py-4"
          >
            {['About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
            >
              <Sparkles className="text-purple-400" size={18} />
              <span className="text-sm text-gray-300">Available for Freelance</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {typedText}
                <span className="ml-1 animate-pulse">|</span>
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-200">
              Turning Ideas into Scalable Apps
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed min-h-[56px]">
              {typedParagraph}
              <span className="ml-1">|</span>
            </p>


            <div className="flex flex-wrap gap-4">
              <a
                href='#contact'>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full px-8 py-6 text-lg group"
                >
                  Hire Me
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </a>

              <a
                href='#projects'>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                >
                  View Projects
                </Button>
              </a>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative  flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />

              <div className="relative z-10 aspect-[2/3] max-h-[360px] sm:max-h-[400px] md:max-h-[480px] overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src="/images/profile.jpeg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Building Android solutions that make a difference</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 flex items-center justify-center">

                {/* 🌑 DEEP BACK SHADOW (depth base) */}
                <div className="absolute inset-0 rounded-full bg-black/40 blur-3xl z-0" />

                {/* 🌈 OUTER RING + SHADOW */}
                <motion.svg
                  className="absolute inset-0 z-10 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]"
                  viewBox="0 0 200 200"
                  style={{ originX: "50%", originY: "50%" }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 22, // slow
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <linearGradient id="outerGradient" x1="0" y1="0" x2="200" y2="200">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r="94"
                    fill="none"
                    stroke="url(#outerGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* 🔵 INNER RING (REVERSE) + STRONGER SHADOW */}
                <motion.svg
                  className="absolute inset-6 z-20 drop-shadow-[0_0_18px_rgba(96,165,250,0.6)]"
                  viewBox="0 0 200 200"
                  style={{ originX: "50%", originY: "50%" }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 10, // fast (clear difference)
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <linearGradient id="innerGradient" x1="200" y1="0" x2="0" y2="200">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="none"
                    stroke="url(#innerGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="4 10"   // 👈 dashed (visual difference)
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* 🧑 PROFILE IMAGE (TOP LAYER) */}
                <div className="relative z-30 w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                  <ImageWithFallback
                    src="/images/pankaj_about1.jpeg"
                    alt="Pankaj Kumar - Android Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>


            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm a passionate Android Developer specializing in building modern, scalable mobile applications.
                With expertise in Kotlin, Jetpack Compose, and clean architecture principles, I transform innovative
                ideas into polished Android applications that users love.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Award, label: '1.5+ Years', sublabel: 'Experience' },
                  { icon: Rocket, label: '10+ Projects', sublabel: 'Completed' },
                  { icon: Star, label: '100%', sublabel: 'Freelance Ready' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                      <stat.icon className="text-purple-400 mb-3" size={32} />
                      <div className="text-2xl font-bold text-white mb-1">{stat.label}</div>
                      <div className="text-sm text-gray-400">{stat.sublabel}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Skills & Tools
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Technologies I work with</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, name: 'Android Studio', color: 'from-green-400 to-green-600' },
              { icon: Code, name: 'Kotlin', color: 'from-purple-400 to-purple-600' },
              { icon: Package, name: 'Jetpack Compose', color: 'from-blue-400 to-blue-600' },
              { icon: Code, name: 'XML', color: 'from-orange-400 to-orange-600' },
              { icon: Database, name: 'Firebase', color: 'from-yellow-400 to-yellow-600' },
              { icon: Globe, name: 'REST APIs', color: 'from-cyan-400 to-cyan-600' },
              { icon: Target, name: 'MVVM', color: 'from-pink-400 to-pink-600' },
              { icon: GitBranch, name: 'Git & GitHub', color: 'from-gray-400 to-gray-600' }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <div className={`bg-gradient-to-br ${skill.color} p-4 rounded-2xl inline-block mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300`}>
                    <skill.icon className="text-white" size={32} />
                  </div>
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Showcasing my best work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Clip2Concept',
                description: 'AI-powered YouTube learning app that transforms video content into structured learning materials with intelligent content extraction.',
                tags: ['Kotlin', 'Jetpack Compose', 'Room database', 'Mvvm', 'REST API', 'Animation', 'Crash Analytics', 'AI Integration', 'Google Ads', 'YouTube API'],
                image: '/images/clip2concept.svg',
                github: 'https://github.com/kumarpankajkumar123/Clip2Concept'
              },
              {
                name: 'TagInfoFinder',
                description: 'Advanced YouTube tags extraction tool helping content creators optimize their videos with data-driven tag suggestions.',
                tags: ['Firebase', 'REST API', 'Material Design', 'MVVM', 'Youtube API', 'Local Storage'],
                image: '/images/tags-modified.png',
                github: 'https://github.com/kumarpankajkumar123/TagInfoFinder'
              },
              {
                name: 'EduFun',
                description: 'Interactive kids learning application featuring gamified educational content with engaging animations and progress tracking.',
                tags: ['XML', 'Animation', 'Java', 'MVC pattern', 'Clean UI'],
                image: '/images/edufun_child.jpg',
                github: 'https://github.com/kumarpankajkumar123/EduFun_Android_Application'
              },
              {
                name: 'QR Code Scanner',
                description: 'ML-based QR code scanner with advanced recognition capabilities, supporting multiple formats and real-time scanning.',
                tags: ['ML Kit', 'CameraX', 'Kotlin Coroutines', 'Material You'],
                image: 'https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzY3NDE4MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                github: 'https://github.com/kumarpankajkumar123/qr_code-scanner-app'
              }
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </Button>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          className="rounded-xl border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
                        >
                          <FaGithub size={18} />
                        </Button>
                      </a>

                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelance Services Section */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Freelance Services
              </span>
            </h2>
            <p className="text-gray-400 text-lg">What I can do for you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                title: 'Android App Development',
                description: 'Custom Android applications built with modern architecture and best practices.'
              },
              {
                icon: Palette,
                title: 'UI Design Implementation',
                description: 'Transform Figma designs into pixel-perfect Android interfaces using Jetpack Compose.'
              },
              {
                icon: Database,
                title: 'API Integration',
                description: 'Seamless integration of REST APIs, GraphQL, and third-party services.'
              },
              {
                icon: Shield,
                title: 'Firebase Authentication',
                description: 'Secure user authentication and authorization using Firebase services.'
              },
              {
                icon: Zap,
                title: 'App Performance Optimization',
                description: 'Optimize app performance, reduce load times, and improve user experience.'
              },
              {
                icon: TrendingUp,
                title: 'App Maintenance',
                description: 'Ongoing support, bug fixes, and feature updates for existing applications.'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl inline-block mb-4">
                    <service.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Why Hire Me
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Client benefits that matter</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Clean Architecture',
                description: 'Well-structured, maintainable code following industry best practices.'
              },
              {
                icon: Package,
                title: 'Scalable Code',
                description: 'Future-proof solutions that grow with your business needs.'
              },
              {
                icon: Clock,
                title: 'On-Time Delivery',
                description: 'Reliable timelines with consistent progress updates.'
              },
              {
                icon: Users,
                title: 'Client-Friendly',
                description: 'Clear communication and collaborative development process.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border-white/10 p-6 rounded-2xl hover:from-white/10 hover:to-white/5 transition-all duration-300 text-center h-full">
                  <benefit.icon className="text-purple-400 mx-auto mb-4" size={40} />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Let's Build Your App Idea
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Ready to start your next Android project?</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-12 rounded-3xl">
              <div className="text-center mb-8">
                <Mail className="text-purple-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                <p className="text-gray-400">Available for freelance opportunities</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a href="mailto:pankajtech347@gmail.com">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full px-8 py-6 text-lg group">
                    <Mail className="mr-2" size={20} />
                    Email Me
                    <ExternalLink
                      className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      size={18}
                    />
                  </Button>
                </a>
                <a
                  href="https://github.com/kumarpankajkumar123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
                  >
                    <FaGithub className="mr-2" size={20} />
                    GitHub
                  </Button>
                </a>
                <a
                  href="/resume/pankaj_just_update.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
                  >
                    <FaFilePdf className="mr-2 text-red-500" size={20} />
                    Download Resume
                  </Button>
                </a>
              </div>

              <div className="flex justify-center gap-6">
                {[
                  {
                    icon: FaLinkedin,
                    label: 'LinkedIn',
                    link: 'https://www.linkedin.com/in/pankaj-kumar-a5a827224/'
                  },

                  {
                    icon: FaTwitter,
                    label: 'Twitter',
                    link: 'https://x.com/pankajk26315693'
                  },
                  {
                    icon: Globe,
                    label: 'Fiverr',
                    link: 'https://www.fiverr.com/sellers/pankaj_android/edit'
                  }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon size={24} className="text-gray-300 hover:text-white" />
                  </motion.a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl w-full bg-[#0F172A] rounded-3xl p-8 relative"
          >
            {/* ❌ Close */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            {/* 📱 App Image */}
            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />

            {/* 🧠 App Info */}
            <h2 className="text-3xl font-bold mb-2">{selectedProject.name}</h2>
            <p className="text-gray-400 mb-6">{selectedProject.description}</p>

            {/* 🛠 Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 🔘 Actions */}
            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>View on GitHub</Button>
              </a>

              <Button
                variant="outline"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              AndroidDev
            </div>

            <div className="flex gap-6">
              {['About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                {
                  icon: FaGithub,
                  link: "https://github.com/kumarpankajkumar123",
                  label: "GitHub",
                  blank: true,
                },
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/pankaj-kumar-a5a827224/",
                  label: "LinkedIn",
                  blank: true,
                },
                {
                  icon: FaTwitter,
                  link: "https://x.com/pankajk26315693",
                  label: "Twitter",
                  blank: true,
                },
                {
                  icon: Mail,
                  link: "mailto:pankajkm7417@gmail.com?subject=Freelance%20Android%20Project&body=Hi%20Pankaj,%0A%0AI%20want%20to%20discuss%20an%20Android%20app%20idea.",
                  label: "Email",
                  blank: false,
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  {...(social.blank && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  title={social.label}
                >
                  <social.icon size={18} className="text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>


          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>
              © 2025 Pankaj Kumar. Building scalable Android apps with ❤️ & passion 🚀
            </p>
          </div>
        </div>
      </footer>





    </div>
  );
}
