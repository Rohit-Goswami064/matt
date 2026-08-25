"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImageRevealSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number;
}

export default function ImageRevealSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
  initialPosition = 50,
}: ImageRevealSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className={cn("story-slider", className)}
      onPointerDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setPosition((p) => Math.max(0, p - 2));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setPosition((p) => Math.min(100, p + 2));
        }
      }}
    >
      <img
        className="story-slider-img story-slider-after"
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
      />
      <div
        className="story-slider-before-clip"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          className="story-slider-img story-slider-before"
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
        />
      </div>

      <span className="story-slider-label story-slider-label-before">Before</span>
      <span className="story-slider-label story-slider-label-after">After</span>

      <div
        className="story-slider-divider"
        style={{ left: `${position}%` }}
      >
        <div className="story-slider-handle" aria-hidden>
          <ArrowLeftRight size={16} strokeWidth={2.25} />
        </div>
      </div>
    </div>
  );
}
