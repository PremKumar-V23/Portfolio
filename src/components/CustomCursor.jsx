import React, { useEffect, useRef, useState } from "react";

/**
 * A dot-and-ring custom cursor: the dot tracks the pointer exactly,
 * the ring eases toward it and grows on interactive elements.
 * Automatically disables itself on touch/coarse-pointer devices,
 * so it never gets in the way on mobile.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const interactiveSelector = "a, button, input, textarea, select, [role='button'], .cursor-hover";
    const onOver = (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[200] w-1.5 h-1.5 rounded-full bg-cyan-400 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[200] rounded-full border transition-[width,height,border-color,opacity] duration-200 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${hovering ? "w-12 h-12 border-cyan-400/80" : "w-8 h-8 border-cyan-400/40"}`}
      />
    </>
  );
}
