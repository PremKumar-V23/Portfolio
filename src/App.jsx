import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Mail,
  Send,
  Terminal,
  ExternalLink,
  Briefcase,
  Code,
  MapPin,
  GraduationCap,
  Award,
  CheckSquare,
  TrendingUp,
  ShieldCheck,
  Server,
  BarChart3,
  Code2,
  Bug,
  GitBranch,
  PlayCircle,
  Check,
  TestTube2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import CustomCursor from "./components/CustomCursor.jsx";
import ProjectsSlider from "./components/ProjectsSlider.jsx";

/**
 * V Premkumar — Portfolio
 * Single-file React component, Tailwind-styled.
 * Apple-inspired premium aesthetic: full-screen loader, sticky nav,
 * scroll-triggered reveals, marquee tech strip, split "two disciplines"
 * section, card-based layout, dark/light theme, mobile nav, animated
 * project filters, and a functional (client-side) contact form.
 * No phone number anywhere — contact is email, GitHub, and the form.
 */

const NAV_LINKS = [
  { href: "#about", label: "About", num: "01" },
  { href: "#focus", label: "Focus", num: "02" },
  { href: "#automation", label: "Automation QA", num: "03" },
  { href: "#skills", label: "Skills", num: "04" },
  { href: "#projects", label: "Projects", num: "05" },
  { href: "#experience", label: "Experience", num: "06" },
  { href: "#education", label: "Education", num: "07" },
  { href: "#contact", label: "Contact", num: "08" },
];

const MARQUEE_ITEMS = [
  "Playwright",
  "Selenium",
  "TestNG",
  "JavaScript",
  "Python",
  "Java",
  "SQL",
  "Docker",
  "Jenkins",
  "Git",
  "REST APIs",
  "Power BI",
  "Scikit-learn",
  "Figma",
  "Agile / STLC",
];

const SKILL_GROUPS = [
  {
    title: "Testing & QA",
    icon: ShieldCheck,
    accent: "cyan",
    items: [
      "Playwright",
      "Selenium",
      "TestNG",
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "UI Testing",
      "Cross-Browser Testing",
      "Test Case Design",
      "Defect Management",
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    accent: "indigo",
    items: ["JavaScript", "Python", "Java", "SQL"],
  },
  {
    title: "Web & DevOps",
    icon: Server,
    accent: "emerald",
    items: [
      "HTML",
      "CSS",
      "JSON",
      "REST APIs",
      "Git / GitHub",
      "Jenkins",
      "Docker",
      "Linux",
    ],
  },
  {
    title: "Analytics & Process",
    icon: BarChart3,
    accent: "purple",
    items: ["Power BI", "Figma", "SDLC", "STLC", "Agile"],
  },
];

const PROJECTS = [
  {
    id: "playwright",
    category: "Testing",
    badgeIcon: CheckSquare,
    accent: "cyan",
    title: "Playwright Test Automation Suite",
    description:
      "Automated 25+ end-to-end UI, regression, cross-browser, and responsive test cases. Built a reusable Page Object Model framework with assertions, screenshots, and HTML reports. Integrated Jenkins and Docker for CI/CD execution.",
    stack: ["JavaScript", "Playwright", "Docker", "Jenkins"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "stocks",
    category: "Machine Learning",
    badgeIcon: TrendingUp,
    accent: "indigo",
    title: "Stock Prediction & Portfolio Optimization",
    description:
      "Predicts stock prices using Linear Regression and Random Forest. Includes portfolio optimization, risk analysis, and interactive Plotly dashboards built with Streamlit, Pandas, NumPy, and Scikit-learn.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Plotly"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "mailer",
    category: "Web Development",
    badgeIcon: Mail,
    accent: "emerald",
    title: "Mass Mail Dispatcher",
    description:
      "Java application for automated bulk email delivery with recipient management and input validation. Features a responsive interface built using HTML and CSS.",
    stack: ["Java", "HTML/CSS", "Automation"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "dashboard",
    category: "Data Analytics",
    badgeIcon: BarChart3,
    accent: "purple",
    title: "Business Analytics Dashboard",
    description:
      "Interactive Power BI dashboard for sales and KPI analysis. Automated data cleaning and reporting using SQL and Excel to provide dynamic business insights.",
    stack: ["Power BI", "SQL", "Excel", "Python"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "selenium",
    category: "Automation QA",
    badgeIcon: ShieldCheck,
    accent: "cyan",
    title: "Selenium Automation Framework",
    description:
      "Hybrid Selenium framework built with Java, TestNG, and Maven using the Page Object Model. Includes reusable utilities, reporting, and CI/CD integration through Jenkins and GitHub Actions.",
    stack: ["Java", "Selenium", "TestNG", "Maven"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "automationexercise",
    category: "Automation QA",
    badgeIcon: Bug,
    accent: "indigo",
    title: "Automation Exercise Testing",
    description:
      "Automated complete e-commerce workflows including login, registration, cart, and checkout. Implemented data-driven testing with reusable Page Objects and Jenkins pipeline execution.",
    stack: ["Selenium", "Java", "TestNG", "Jenkins"],
    github: "https://github.com/PremKumar-V23",
    demo: "#",
  },

  {
    id: "restassured-framework",
    category: "QA Automation",
    badgeIcon: ShieldCheck,
    accent: "blue",
    title: "Enterprise REST Assured API Automation Framework",
    description:
      "Developed a scalable REST API automation framework using REST Assured, TestNG, and Maven with reusable architecture, authentication, data-driven testing, reporting, and CI/CD integration through Jenkins and GitHub Actions.",
    stack: ["REST Assured", "TestNG", "Maven", "Jenkins"],
    github: "https://github.com/PremKumar-V23/API-Testing-RestAssured",
    demo: "#",
  },
];

const FILTERS = ["All", "Testing", "Machine Learning", "Web Development"];

const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    org: "Imarticus Learning",
    period: "Nov 2025 – Apr 2026",
    tag: "Data & BI",
    icon: Briefcase,
    accent: "cyan",
    points: [
      "Cleaned and analyzed datasets using Python, SQL, and Power BI.",
      "Created interactive dashboards and reports to support business decisions.",
      "Collaborated with teams to validate data quality and reporting accuracy.",
    ],
  },
  {
    role: "Web Development Intern",
    org: "Exposys Data Labs",
    period: "Jan 2023 – Feb 2023",
    tag: "Web Dev",
    icon: Code,
    accent: "indigo",
    points: [
      "Developed a Java-based Mass Mail Dispatcher application.",
      "Designed responsive web interfaces using HTML and CSS.",
      "Tested application functionality and resolved software defects.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. Information Technology",
    school: "Dwaraka Doss Goverdhan Doss Vaishnav College, Chennai",
    period: "2024 – 2026",
    meta: "CGPA: 8.5",
  },
  {
    degree: "B.Sc. Computer Science",
    school: "Guru Nanak College, Chennai",
    period: "2021 – 2024",
    meta: "CGPA: 9.0",
  },
];

const DISCIPLINES = [
  {
    letter: "Q",
    accent: "cyan",
    icon: TestTube2,
    title: "Quality & Automation",
    desc: "The tools I use to make sure software behaves the way it should, before a user ever finds out otherwise.",
    items: [
      "Playwright & Selenium suites",
      "Cross-browser regression testing",
      "CI/CD with Jenkins & Docker",
    ],
  },
  {
    letter: "D",
    accent: "indigo",
    icon: Cpu,
    title: "Development & Data",
    desc: "The tools I use to build the application itself, and to make sense of the data it produces.",
    items: [
      "Python, Java & JavaScript",
      "ML models & data dashboards",
      "Responsive web interfaces",
    ],
  },
];

const ACCENT_MAP = {
  cyan: {
    text: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/50",
    chip: "bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-600",
    ring: "ring-cyan-500/30",
  },
  indigo: {
    text: "text-indigo-500 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/50",
    chip: "bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
    dot: "bg-indigo-600",
    ring: "ring-indigo-500/30",
  },
  emerald: {
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/50",
    chip: "bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-600",
    ring: "ring-emerald-500/30",
  },
  purple: {
    text: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/50",
    chip: "bg-purple-900/40 text-purple-700 dark:text-purple-300",
    dot: "bg-purple-600",
    ring: "ring-purple-500/30",
  },
};

/* ---------- Scroll spy: highlights the active nav link ---------- */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids]);
  return active;
}

/* ---------- Scroll reveal: fades/slides sections in as they enter view ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- Numbered eyebrow, mirrors a real sequential section order ---------- */
function Eyebrow({ num, label }) {
  return (
    <div className="flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-[0.2em] mb-3">
      <span className="opacity-60">{num}</span>
      <span className="w-6 h-px bg-cyan-500/50" />
      <span>{label}</span>
    </div>
  );
}

/* ---------- Full-screen loading intro ---------- */
function Loader({ show }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!show) return;
    let raf;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setPercent(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono mb-6">
        <span className="text-cyan-400">&lt;</span>Premkumar
        <span className="text-cyan-400">/&gt;</span>
      </div>
      <div className="w-48 sm:w-64 h-px bg-slate-800 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-[width] duration-100 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-4 font-mono text-xs text-slate-400 tabular-nums">
        LOADING {percent}%
      </div>
    </div>
  );
}

/* ---------- Infinite marquee of skills/tech ---------- */
function Marquee({ items }) {
  const loop = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <style>{`
        @keyframes portfolio-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .portfolio-marquee-track {
          animation: portfolio-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-marquee-track { animation: none; }
        }
      `}</style>
      <div className="portfolio-marquee-track flex w-max gap-3 sm:gap-4">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 px-4 sm:px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent
  const [loading, setLoading] = useState(true);

  const sectionIds = useMemo(
    () => NAV_LINKS.map((l) => l.href.replace("#", "")),
    [],
  );
  const activeSection = useScrollSpy(sectionIds);

  const isDark = theme === "dark";

  // Loading intro — mirrors a first-visit splash, then reveals the page
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = setTimeout(
      () => setLoading(false),
      prefersReduced ? 200 : 1300,
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, menuOpen]);

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormStatus("sending");
    // Client-side only demo submission — wire this to a backend or
    // service (e.g. Formspree, EmailJS) to actually deliver messages.
    setTimeout(() => {
      setFormStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <CustomCursor />
      <Loader show={loading} />
      <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased overflow-x-hidden font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-white [scrollbar-gutter:stable]">
        {/* ================= Header ================= */}
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/75 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex justify-between items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-1.5 font-mono shrink-0"
            >
              <span className="text-cyan-500 dark:text-cyan-400">&lt;</span>
              Premkumar
              <span className="text-cyan-500 dark:text-cyan-400">/&gt;</span>
            </a>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-cyan-500 dark:text-cyan-400"
                        : "hover:text-cyan-500 dark:hover:text-cyan-400"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors shrink-0"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <a
                href="mailto:premlatha598@gmail.com"
                className="hidden sm:flex px-3.5 lg:px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-cyan-600/30 items-center gap-2 whitespace-nowrap"
              >
                <Send className="w-4 h-4" /> Get In Touch
              </a>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile / tablet menu */}
          <div
            className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-slate-200 dark:border-slate-800 ${
              menuOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col px-4 xs:px-5 sm:px-6 py-4 gap-1 text-sm font-medium bg-white dark:bg-slate-950 max-h-[70svh] overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center gap-3 py-2.5 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 border-b border-slate-100 dark:border-slate-900 last:border-none"
                >
                  <span className="font-mono text-[11px] text-cyan-500/70 dark:text-cyan-400/70">
                    {link.num}
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:premlatha598@gmail.com"
                className="mt-3 px-4 py-3 rounded-lg bg-cyan-600 text-white text-sm font-semibold text-center"
              >
                Get In Touch
              </a>
            </nav>
          </div>
        </header>

        {/* ================= Hero ================= */}
        <section
          id="hero"
          className="min-h-[100svh] pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center relative overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/20 dark:bg-cyan-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
                QA Automation Engineer &amp; Developer
              </div>
              <h1 className="text-[clamp(2.1rem,5vw+1rem,3.75rem)] font-black tracking-tight leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  V Premkumar
                </span>
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Specializing in{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Playwright
                </span>
                , Test Automation Frameworks &amp; Full-Stack Tools
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                M.Sc. IT student with a strong focus on building automated
                end-to-end testing pipelines, web tools, and data-driven
                applications. Experienced in Playwright, Selenium, CI/CD
                workflows, Python, and JavaScript.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href="#focus"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#focus");
                  }}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm sm:text-base font-medium shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2"
                >
                  View My Work <Terminal className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/PremKumar-V23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-sm sm:text-base font-medium transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> PremKumar-V23
                </a>
              </div>

              <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />{" "}
                  Chennai, India
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />{" "}
                  premlatha598@gmail.com
                </span>
              </div>
            </div>

            {/* Terminal simulation card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-2xl shadow-cyan-600/10 overflow-hidden font-mono text-[11px] sm:text-xs">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                    playwright-runner.sh
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 text-slate-600 dark:text-slate-300">
                  <p className="text-slate-400 dark:text-slate-500 break-words">
                    $ npx playwright test --project=all-browsers
                  </p>
                  <p className="text-cyan-600 dark:text-cyan-400">
                    Running 25 tests using 4 workers...
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500 dark:text-emerald-400">
                        ✓
                      </span>{" "}
                      [chromium] › ui-regression.spec.js (1.2s)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500 dark:text-emerald-400">
                        ✓
                      </span>{" "}
                      [firefox] › functional-assertions.spec.js (1.8s)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500 dark:text-emerald-400">
                        ✓
                      </span>{" "}
                      [webkit] › responsive-layout.spec.js (1.4s)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500 dark:text-emerald-400">
                        ✓
                      </span>{" "}
                      [docker-ci] › pipeline-health.spec.js (0.9s)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex justify-between text-slate-500 dark:text-slate-400">
                    <span>
                      Passed:{" "}
                      <strong className="text-emerald-500 dark:text-emerald-400">
                        25
                      </strong>
                    </span>
                    <span>
                      Failed:{" "}
                      <strong className="text-slate-500 dark:text-slate-400">
                        0
                      </strong>
                    </span>
                    <span>
                      Flaky:{" "}
                      <strong className="text-slate-500 dark:text-slate-400">
                        0
                      </strong>
                    </span>
                  </div>
                  <p className="text-emerald-500 dark:text-emerald-400 font-semibold pt-1 break-words">
                    HTML Report Generated: ./playwright-report/index.html
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            <span>Scroll</span>
            <span className="w-px h-6 bg-gradient-to-b from-slate-400 dark:from-slate-600 to-transparent" />
          </div>
        </section>

        {/* ================= About / Summary ================= */}
        <section id="about" className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 text-center space-y-4">
            <Reveal>
              <Eyebrow num="01" label="About" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Professional Summary
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-4 text-sm sm:text-base">
                Motivated M.Sc. Information Technology student with experience
                in Python, JavaScript, automation testing using Playwright, and
                AI/ML application development. Skilled in developing automation
                solutions, web applications, and CI/CD workflows using Git,
                Jenkins, and Docker. Passionate about software development,
                automation, and intelligent systems.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================= Two Disciplines split section ================= */}
        <section
          id="focus"
          className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50"
        >
          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <Eyebrow num="02" label="Focus" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                Two disciplines,{" "}
                <span className="text-cyan-500 dark:text-cyan-400">
                  one engineer.
                </span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-3">
                I move between breaking software and building it — quality
                assurance on one side, development and data on the other.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {DISCIPLINES.map((d, i) => {
                const Icon = d.icon;
                const a = ACCENT_MAP[d.accent];
                return (
                  <Reveal key={d.title} delay={i * 120}>
                    <div
                      className={`h-full bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 ${a.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${a.bg} ${a.text} flex items-center justify-center text-2xl sm:text-3xl font-black mb-6`}
                      >
                        {d.letter}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-5 h-5 ${a.text}`} />
                        <h3 className="text-xl sm:text-2xl font-bold">
                          {d.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                        {d.desc}
                      </p>
                      <ul className="space-y-2.5">
                        {d.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                          >
                            <Check className={`w-4 h-4 shrink-0 ${a.text}`} />{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Marquee strip of tools */}
          <div className="mt-14 sm:mt-16">
            <Marquee items={MARQUEE_ITEMS} />
          </div>
        </section>

        {/* ================= Automation Focus ================= */}
        <section id="automation" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <Eyebrow num="03" label="Core Competency" />
              <h2 className="text-2xl sm:text-3xl font-black">
                Automation Testing Architecture
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                End-to-end quality assurance engineering, framework design, and
                CI/CD integration.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: PlayCircle,
                  accent: "cyan",
                  title: "Playwright Framework Design",
                  desc: "Custom automated testing scripts leveraging JavaScript & Playwright, with modular patterns, automatic wait mechanics, and cross-browser suites.",
                  bullets: [
                    "Chromium, Firefox, WebKit",
                    "Dynamic HTML Reporting",
                    "Visual & Assertion Logging",
                  ],
                },
                {
                  icon: GitBranch,
                  accent: "indigo",
                  title: "Continuous Integration & Docker",
                  desc: "Containerized execution environments ensuring consistent test runs using Docker and Jenkins automation workflows.",
                  bullets: [
                    "Jenkins CI Pipeline Execution",
                    "Isolated Docker Containers",
                    "Git-based Version Control",
                  ],
                },
                {
                  icon: Bug,
                  accent: "purple",
                  title: "Defect Management & STLC",
                  desc: "Functional, regression, and UI testing methodologies aligned with Agile STLC principles and systematic bug tracking.",
                  bullets: [
                    "Systematic Defect Logging",
                    "Comprehensive Test Suites",
                    "Automated Smoke & Sanity Runs",
                  ],
                },
              ].map((card, i) => {
                const Icon = card.icon;
                const a = ACCENT_MAP[card.accent];
                return (
                  <Reveal key={card.title} delay={i * 90}>
                    <div
                      className={`h-full bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 ${a.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${a.bg} flex items-center justify-center ${a.text} mb-4 sm:mb-5`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-2">
                        {card.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        {card.desc}
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 font-mono">
                        {card.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2">
                            <Check
                              className={`w-3.5 h-3.5 shrink-0 ${a.text}`}
                            />{" "}
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Skills ================= */}
        <section
          id="skills"
          className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/40"
        >
          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
              <Eyebrow num="04" label="Toolkit" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Technical Stack
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Tooling and languages used for software development and
                automation.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {SKILL_GROUPS.map((group, i) => {
                const Icon = group.icon;
                const a = ACCENT_MAP[group.accent];
                return (
                  <Reveal key={group.title} delay={i * 80}>
                    <div className="h-full bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                      <div className={`${a.text} mb-3`}>
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold mb-3">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs rounded-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Projects ================= */}
        <section id="projects" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <Eyebrow num="05" label="Selected Work" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Featured Projects
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Projects spanning automation testing, machine learning, and web
                development.
              </p>
            </Reveal>

            <ProjectsSlider projects={PROJECTS} />
          </div>
        </section>

        {/* ================= Experience ================= */}
        <section
          id="experience"
          className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/40"
        >
          <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12 sm:mb-16">
              <Eyebrow num="06" label="Experience" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Work Experience
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Professional software engineering, QA testing, and analytics
                exposure.
              </p>
            </Reveal>

            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-3.5 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {EXPERIENCE.map((exp, idx) => {
                const Icon = exp.icon;
                const a = ACCENT_MAP[exp.accent];
                const odd = idx % 2 === 0;
                return (
                  <Reveal key={exp.role} delay={idx * 100}>
                    <div
                      className={`relative flex items-center justify-between md:justify-normal group ${
                        odd ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${a.dot} border-4 border-white dark:border-slate-950 text-white shrink-0 md:order-1 ${
                          odd ? "md:-translate-x-1/2" : "md:translate-x-1/2"
                        } shadow-lg`}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="w-[calc(100%-2.25rem)] sm:w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span
                            className={`text-xs font-bold ${a.text} font-mono`}
                          >
                            {exp.period}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${a.bg} ${a.text} border border-current/20`}
                          >
                            {exp.tag}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">
                          {exp.org}
                        </p>
                        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc list-inside pt-2 leading-relaxed">
                          {exp.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Education ================= */}
        <section id="education" className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-10 sm:mb-14">
              <Eyebrow num="07" label="Education" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">Education</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Academic background and research.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {EDUCATION.map((ed, i) => (
                <Reveal key={ed.degree} delay={i * 90}>
                  <div className="h-full bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base">
                      {ed.degree}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {ed.school}
                    </p>
                    <div className="flex justify-between text-xs font-mono text-slate-400 dark:text-slate-500 pt-1">
                      <span>{ed.period}</span>
                      <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                        {ed.meta}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-4 items-start hover:shadow-lg transition-shadow duration-300">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    Paper Presentation — 2025
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    A Review on Authentication Techniques in Digital Security
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Dwaraka Doss Goverdhan Doss Vaishnav College, Chennai —
                    presented research on authentication techniques, security
                    challenges, and modern digital security practices.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= Contact ================= */}
        <section
          id="contact"
          className="relative py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden border-t border-slate-200 dark:border-slate-800"
        >
          {/* decorative column-grid overlay, mirrors an editorial layout grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden sm:grid grid-cols-4 lg:grid-cols-5 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-l border-slate-200/70 dark:border-slate-800/50 first:border-l-0"
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 relative">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-2.5 h-2.5 bg-cyan-500 dark:bg-cyan-400 shrink-0" />
                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.25em]">
                  08 Contact
                </span>
              </div>
              <h2 className="text-[clamp(2.4rem,6.5vw,5.25rem)] font-black leading-[0.98] tracking-tight max-w-3xl">
                Let&apos;s build something
                <br />
                worth testing.
              </h2>
              <div className="h-1.5 w-40 sm:w-56 bg-gradient-to-r from-cyan-500 to-indigo-500 mt-6 sm:mt-8" />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start mt-12 sm:mt-16">
              {/* Email + pitch */}
              <Reveal>
                <a
                  href="mailto:premlatha598@gmail.com"
                  className="group inline-flex items-baseline gap-3 text-xl sm:text-2xl lg:text-3xl font-mono border-b-2 border-slate-900 dark:border-slate-100 pb-2 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors break-all"
                >
                  premlatha598@gmail.com
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <p className="mt-5 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-sm">
                  Open to roles in Software Development, QA Automation
                  Engineering, and Data Analysis.
                </p>
              </Reveal>

              {/* Socials + location */}
              <Reveal
                delay={100}
                className="lg:justify-self-end lg:text-right w-full"
              >
                <div className="flex flex-wrap lg:justify-end gap-x-6 gap-y-2 font-mono text-sm">
                  <a
                    href="https://github.com/PremKumar-V23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                  Chennai, Tamil Nadu, India
                </p>
              </Reveal>
            </div>

            {/* Message form — secondary path alongside the direct email link above */}
            <Reveal delay={150} className="mt-14 sm:mt-16 max-w-2xl">
              <form
                onSubmit={handleFormSubmit}
                className="bg-white dark:bg-slate-900/60 p-5 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Or send a message directly
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Say hello, or ask about a project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white font-medium shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
                {formStatus === "sent" && (
                  <p className="text-emerald-500 dark:text-emerald-400 text-sm font-medium">
                    Message captured — connect this form to your email service
                    to receive it directly.
                  </p>
                )}
              </form>
            </Reveal>

            {/* Footer meta row, editorial-style credit line */}
            <div className="mt-16 sm:mt-20 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
              <span>V Premkumar, Chennai, India</span>
              <span>2026</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
