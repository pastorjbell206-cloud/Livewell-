import { useEffect, useRef, useState } from "react";

/**
 * True once the element comes within `margin` of the screen, and from then on.
 * The plates and Home's pieces mount only then, so a first visit spends its
 * first seconds on what is on screen. Without IntersectionObserver it is true
 * at once.
 */
export function useNear<T extends Element>(margin = "600px 0px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(() => typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, margin]);
  return [ref, near] as const;
}
