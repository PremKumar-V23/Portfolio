import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport ambient background that sits behind all page content.
 *
 * Dark mode  -> canvas starfield: small stars twinkle and drift slowly,
 *               with occasional soft shooting stars.
 * Light mode -> CSS-driven layer of soft, blurred clouds drifting sideways.
 *
 * - GPU-friendly: clouds animate via `transform` only; the star canvas is
 *   the only per-frame JS work, and it's skipped entirely in light mode.
 * - Respects `prefers-reduced-motion`: motion is disabled, a static frame
 *   remains.
 * - Pauses the canvas loop when the tab is hidden.
 * - `pointer-events-none` + `aria-hidden` so it never intercepts input or
 *   gets announced to assistive tech.
 */
export default function SkyBackground({ isDark }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const buildStars = () => {
      const area = width * height;
      // Roughly one star per ~9000px^2 of viewport, capped for perf.
      const count = Math.min(160, Math.max(50, Math.floor(area / 9000)));
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        r: Math.random() * 1.3 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.006,
        driftX: (Math.random() - 0.5) * 0.06,
        driftY: Math.random() * 0.012 + 0.004,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    resize();
    window.addEventListener("resize", resize);

    // Light mode: nothing to animate on canvas, just keep resize wired up
    // for whenever the theme flips back to dark.
    if (!isDark) {
      ctx.clearRect(0, 0, width, height);
      return () => window.removeEventListener("resize", resize);
    }

    let last = performance.now();
    let shootingTimer = Math.random() * 6000 + 4000;

    const maybeSpawnShootingStar = (dt) => {
      shootingTimer -= dt;
      if (shootingTimer <= 0) {
        shootingTimer = Math.random() * 9000 + 6000;
        if (shootingRef.current.length < 2) {
          shootingRef.current.push({
            x: Math.random() * width * 0.6 + width * 0.2,
            y: Math.random() * height * 0.25,
            len: Math.random() * 90 + 70,
            angle: Math.PI / 5 + Math.random() * 0.2,
            speed: Math.random() * 6 + 7,
            life: 1,
          });
        }
      }
    };

    const draw = (now) => {
      const dt = now - last;
      last = now;

      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reduced) {
          s.phase += s.speed;
          s.x += s.driftX;
          s.y += s.driftY;
          if (s.x < -5) s.x = width + 5;
          if (s.x > width + 5) s.x = -5;
          if (s.y > height + 5) {
            s.y = -5;
            s.x = Math.random() * width;
          }
        }
        const twinkle = reduced
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(s.phase) * 0.28;
        ctx.beginPath();
        ctx.fillStyle = `rgba(226, 232, 255, ${Math.max(0.08, twinkle)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        maybeSpawnShootingStar(dt);
        const shooters = shootingRef.current;
        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          sh.x += Math.cos(sh.angle) * sh.speed;
          sh.y += Math.sin(sh.angle) * sh.speed;
          sh.life -= 0.014;

          const tailX = sh.x - Math.cos(sh.angle) * sh.len;
          const tailY = sh.y - Math.sin(sh.angle) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${Math.max(0, sh.life)})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          if (sh.life <= 0 || sh.x > width + 100 || sh.y > height + 100) {
            shooters.splice(i, 1);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDark]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* base sky gradients, cross-fade smoothly between themes */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out bg-gradient-to-b from-[#050914] via-[#0b1226] to-[#101a34] ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out bg-gradient-to-b from-[#bfe3fb] via-[#dcf0fc] to-[#f4fbff] ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* starfield, canvas-driven, dark mode only */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* drifting clouds, CSS-driven, light mode only */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <CloudLayer />
      </div>
    </div>
  );
}

/*
 * Three depth bands for a parallax feel:
 *  - far:  slow, small, faint  (reads as distant background)
 *  - mid:  medium speed/size/opacity
 *  - near: fastest, largest, most visible (reads as closest to the viewer)
 * Every cloud drifts strictly left -> right, at a different pace per band,
 * so layers visibly slide past each other rather than moving in lockstep.
 */
const CLOUD_LAYERS = [
  {
    band: "far",
    blur: "blur-3xl",
    clouds: [
      { top: "6%", scale: 0.55, duration: 200, delay: -40, opacity: 0.18 },
      { top: "34%", scale: 0.7, duration: 230, delay: -140, opacity: 0.16 },
      { top: "64%", scale: 0.6, duration: 210, delay: -90, opacity: 0.15 },
      { top: "86%", scale: 0.5, duration: 240, delay: -10, opacity: 0.14 },
    ],
  },
  {
    band: "mid",
    blur: "blur-2xl",
    clouds: [
      { top: "16%", scale: 0.95, duration: 130, delay: -30, opacity: 0.3 },
      { top: "46%", scale: 0.8, duration: 150, delay: -80, opacity: 0.26 },
      { top: "72%", scale: 1.05, duration: 140, delay: -110, opacity: 0.24 },
    ],
  },
  {
    band: "near",
    blur: "blur-xl",
    clouds: [
      { top: "10%", scale: 1.35, duration: 80, delay: -15, opacity: 0.5 },
      { top: "38%", scale: 1.15, duration: 95, delay: -55, opacity: 0.42 },
      { top: "60%", scale: 1.5, duration: 75, delay: -35, opacity: 0.46 },
      { top: "82%", scale: 1.2, duration: 90, delay: -65, opacity: 0.4 },
    ],
  },
];

function CloudLayer() {
  return (
    <>
      <style>{`
        @keyframes sky-drift {
          from { transform: translate3d(-25vw, 0, 0); }
          to { transform: translate3d(125vw, 0, 0); }
        }
        .sky-cloud {
          animation-name: sky-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .sky-cloud { animation: none; left: 15%; }
        }
      `}</style>
      {CLOUD_LAYERS.map((layer) =>
        layer.clouds.map((c, i) => (
          <div
            key={`${layer.band}-${i}`}
            className="sky-cloud absolute"
            style={{
              top: c.top,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <Cloud scale={c.scale} opacity={c.opacity} blur={layer.blur} />
          </div>
        )),
      )}
    </>
  );
}

/* A handful of overlapping, blurred white blobs at varied sizes reads as a
 * soft, fluffy cloud silhouette rather than a single flat oval. */
function Cloud({ scale = 1, opacity = 0.4, blur = "blur-2xl" }) {
  return (
    <div
      style={{ transform: `scale(${scale})`, opacity }}
      className="relative w-44 h-14 sm:w-64 sm:h-20"
    >
      <div
        className={`absolute inset-x-0 bottom-0 h-3/4 rounded-full bg-white ${blur}`}
      />
      <div
        className={`absolute left-2 -top-2 w-20 h-14 sm:w-28 sm:h-20 rounded-full bg-white ${blur}`}
      />
      <div
        className={`absolute left-1/3 -top-5 w-24 h-16 sm:w-36 sm:h-24 rounded-full bg-white ${blur}`}
      />
      <div
        className={`absolute right-3 -top-3 w-24 h-16 sm:w-32 sm:h-20 rounded-full bg-white ${blur}`}
      />
      <div
        className={`absolute right-8 top-1 w-16 h-12 sm:w-24 sm:h-16 rounded-full bg-white ${blur}`}
      />
    </div>
  );
}
