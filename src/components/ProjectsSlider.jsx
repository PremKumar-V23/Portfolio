import { useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectsSlider({ projects }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative px-2 sm:px-14 py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Attach the custom refs before Swiper initializes navigation
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={30}
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
            <SwiperSlide key={project.id} className="h-auto flex">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="w-full h-full flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-xl p-7 transition-all hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,.25)] shadow-lg dark:shadow-cyan-900/20"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>

                  <span className="rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 px-3 py-1 text-xs font-semibold whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold">{project.title}</h3>

                <p className="mt-4 min-h-[200px] leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                <div className="mt-6 min-h-[72px] flex flex-wrap content-start gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8 flex gap-3">
                  <a
                    href={project.github || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl bg-cyan-500 py-3 text-center font-medium transition hover:bg-cyan-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FiGithub />
                      GitHub
                    </div>
                  </a>

                  <a
                    href={project.demo || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 py-3 text-center transition hover:border-cyan-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FiExternalLink />
                      Live Demo
                    </div>
                  </a>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom nav arrows — replace Swiper's default buttons so they
          sit outside the card row with proper spacing and match the
          site's design system instead of floating bare chevrons */}
      <button
        ref={prevRef}
        aria-label="Previous project"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-lg hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next project"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-lg hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
