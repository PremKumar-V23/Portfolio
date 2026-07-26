import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectsSlider({ projects }) {
  return (
    <div className="relative py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="
                w-full
  h-full
  flex
  flex-col
  rounded-3xl
  border
 border-slate-200 dark:border-slate-800
bg-white dark:bg-slate-900/70  backdrop-blur-xl
  p-7
  transition-all
  hover:-translate-y-2
  hover:border-cyan-400
  hover:shadow-[0_0_40px_rgba(34,211,238,.25)]
  shadow-lg
dark:shadow-cyan-900/20
"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>

                  <span
                    className="rounded-fullbg-cyan-100 dark:bg-cyan-500/10
text-cyan-700 dark:text-cyan-300"
                  >
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
                      className="
                        rounded-full
                       bg-slate-100 dark:bg-slate-800
text-cyan-700 dark:text-cyan-300
                      "
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
                    className="
                      flex-1
                      rounded-xl
                      bg-cyan-500
                      py-3
                      text-center
                      font-medium
                      transition
                      hover:bg-cyan-400
                    "
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
                    className="
                      flex-1
                      rounded-xl
                      border
                      border-slate-300 dark:border-slate-700
                      text-slate-700 dark:text-white
hover:bg-slate-100 dark:hover:bg-slate-800
                      py-3
                      text-center
                      transition
                      hover:border-cyan-400
                    "
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
    </div>
  );
}
