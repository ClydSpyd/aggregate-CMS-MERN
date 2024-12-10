import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utilities";

interface StickyWrapperProps {
  children: React.ReactNode;
  className?: string; // Optional for custom styling
}

const StickyWrapper: React.FC<StickyWrapperProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.boundingClientRect.y < 0 && !entry.isIntersecting); // Becomes sticky when the container is scrolled out of view
      },
      { root: null, threshold: 0, rootMargin: "0px" }
    );

    const container = containerRef.current;

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-fit w-full flex justify-center border-4 border-red-600",
        className ?? ""
      )}
    >
      <div className={isSticky ? "fixed top-16 z-50" : ""}>{children}</div>
      <div
        className={cn(
          "opacity-0 pointer-events-none",
          !isSticky ? "absolute" : "relative"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyWrapper;
