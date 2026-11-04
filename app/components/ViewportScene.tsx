"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Only mounts WebGL near the viewport. When the visitor leaves the section,
 * the Canvas unmounts and its rendering loop stops; this prevents competing
 * WebGL contexts from running simultaneously on long pages.
 */
export default function ViewportScene({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "240px 0px 240px 0px", threshold: 0.001 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="viewport-scene" ref={ref}>
      {near ? children : (
        <div className="viewport-scene-idle">
          <span className="viewport-scene-emblem">◎</span>
          <strong>{title}</strong>
          <span>Səhnəyə yaxınlaşdıqda 3D baxış yüklənir.</span>
        </div>
      )}
    </div>
  );
}
