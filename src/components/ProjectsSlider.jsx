import { useEffect, useRef, useState } from "react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiPause,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AUTOPLAY_OPTIONS = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};

function isUsableUrl(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

export default function ProjectsSlider({ projects = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  // Start automatically only when the visitor has not requested reduced motion.
  // Visitors can still explicitly turn autoplay on or off using the control.
  useEffect(() => {
    if (prefersReducedMotion !== null) {
      setAutoplayEnabled(!prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;

    if (autoplayEnabled) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [autoplayEnabled]);

  return (
    <section
      aria-label="Featured projects"
      className="relative px-2 py-8 sm:px-14 sm:py-10"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Browse projects using the arrows, keyboard, or swipe gestures.
        </p>
        <button
          type="button"
          aria-pressed={autoplayEnabled}
          onClick={() => setAutoplayEnabled((enabled) => !enabled)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950"
        >
          {autoplayEnabled ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
          Autoplay {autoplayEnabled ? "on" : "off"}
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (autoplayEnabled) swiper.autoplay.start();
          else swiper.autoplay.stop();
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        autoplay={{ ...AUTOPLAY_OPTIONS, enabled: autoplayEnabled }}
        loop={projects.length > 3}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="pb-14"
      >
        {projects.map((project, index) => {
          const Icon = project.badgeIcon;

          return (
            <SwiperSlide key={project.id ?? project.title ?? index} className="flex h-auto">
              <motion.article
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : Math.min(index * 0.06, 0.24),
                }}
                viewport={{ once: true }}
                className={`flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors hover:border-cyan-400 hover:shadow-[0_0_32px_rgba(34,211,238,.16)] dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-cyan-900/10 sm:p-7 ${prefersReducedMotion ? "" : "hover:-translate-y-1"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="shrink-0 rounded-2xl bg-cyan-500/10 p-3">
                    {Icon ? (
                      <Icon aria-hidden="true" className="h-8 w-8 text-cyan-500" />
                    ) : (
                      <FiExternalLink aria-hidden="true" className="h-8 w-8 text-cyan-500" />
                    )}
                  </div>
                  {project.category && (
                    <span className="max-w-[65%] whitespace-normal rounded-full bg-cyan-100 px-3 py-1 text-right text-xs font-semibold text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300">
                      {project.category}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 break-words leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                {Array.isArray(project.stack) && project.stack.length > 0 && (
                  <ul
                    aria-label={`Technologies used in ${project.title}`}
                    className="mt-6 flex flex-wrap content-start gap-2"
                  >
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-cyan-800 dark:bg-slate-800 dark:text-cyan-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  {isUsableUrl(project.github) && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-center font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                    >
                      <FiGithub aria-hidden="true" />
                      GitHub
                    </a>
                  )}

                  {isUsableUrl(project.demo) && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-center font-medium text-slate-700 transition-colors hover:border-cyan-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
                    >
                      <FiExternalLink aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        ref={prevRef}
        type="button"
        aria-label="Previous project"
        className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-colors hover:border-cyan-400 hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-cyan-400 sm:flex"
      >
        <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Next project"
        className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-colors hover:border-cyan-400 hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-cyan-400 sm:flex"
      >
        <FiChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  );
}
