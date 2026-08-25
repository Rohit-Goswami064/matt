"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export interface ClientResult {
  id: number;
  duration: string;
  videoSrc: string;
}

/** @deprecated Use ClientResult */
export type Testimonial = ClientResult;

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: ClientResult[];
  className?: string;
  /** When false, skip built-in title block (use page eyebrow/heading instead) */
  showHeader?: boolean;
}

const CARD_HOVER_SCALE = 1.24;
const VIDEO_REST_SCALE = 1.14;

function ResultVideoCard({
  result,
  dupKey,
}: {
  result: ClientResult;
  dupKey: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTweenRef = useRef<gsap.core.Tween | null>(null);
  const isDesktopHoverRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    gsap.set(video, { scale: VIDEO_REST_SCALE, transformOrigin: "center center" });
    gsap.set(card, { scale: 1, transformOrigin: "center center" });

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncDesktop = () => {
      isDesktopHoverRef.current = mq.matches;
    };
    syncDesktop();
    mq.addEventListener("change", syncDesktop);

    return () => {
      mq.removeEventListener("change", syncDesktop);
      hoverTweenRef.current?.kill();
    };
  }, []);

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handlePointerEnter = () => {
    play();

    if (!isDesktopHoverRef.current) return;

    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    card.classList.add("is-hovered");
    hoverTweenRef.current?.kill();
    gsap.to(card, {
      scale: CARD_HOVER_SCALE,
      duration: 0.38,
      ease: "power2.out",
      overwrite: "auto",
    });
    hoverTweenRef.current = gsap.to(video, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePointerLeave = () => {
    stop();

    if (!isDesktopHoverRef.current) return;

    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    card.classList.remove("is-hovered");
    hoverTweenRef.current?.kill();
    gsap.to(card, {
      scale: 1,
      duration: 0.38,
      ease: "power2.out",
      overwrite: "auto",
    });
    hoverTweenRef.current = gsap.to(video, {
      scale: VIDEO_REST_SCALE,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      ref={cardRef}
      key={dupKey}
      className="group/result results-slide-card"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
    >
      <div className="results-slide-media">
        <video
          ref={videoRef}
          className="results-slide-video"
          src={result.videoSrc}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={`Client ${result.duration}`}
        />
        <p className="results-slide-hint" aria-hidden="true">
          Hover to play
        </p>
      </div>
      <div className="results-slide-caption">
        <span>Real client — shared with permission</span>
        <span>{result.duration}</span>
      </div>
    </article>
  );
}

/**
 * Client results marquee — slides right → left; hover a card to pause + play video.
 */
export function TestimonialSection({
  title,
  subtitle,
  testimonials,
  className,
  showHeader = true,
}: TestimonialSectionProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const track = [...testimonials, ...testimonials];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const trackEl = trackRef.current;
    if (!marquee || !trackEl) return;

    const ctx = gsap.context(() => {
      gsap.set(trackEl, { x: 0, force3D: true });

      const tween = gsap.to(trackEl, {
        xPercent: -50,
        ease: "none",
        duration: 36,
        repeat: -1,
      });

      const pause = () => tween.pause();
      const resume = () => tween.play();

      const cards = trackEl.querySelectorAll(".results-slide-card");

      const onCardEnter = () => pause();

      const onCardLeave = (event: Event) => {
        const related = (event as PointerEvent).relatedTarget as Element | null;
        if (!related?.closest?.(".results-slide-card")) {
          resume();
        }
      };

      cards.forEach((card) => {
        card.addEventListener("pointerenter", onCardEnter);
        card.addEventListener("pointerleave", onCardLeave);
      });

      const onResize = () => {
        gsap.set(trackEl, { x: 0 });
        tween.invalidate().restart();
      };

      window.addEventListener("resize", onResize);

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("pointerenter", onCardEnter);
          card.removeEventListener("pointerleave", onCardLeave);
        });
        window.removeEventListener("resize", onResize);
        tween.kill();
      };
    }, marqueeRef);

    return () => ctx.revert();
  }, [testimonials]);

  return (
    <div className={cn("w-full", className)}>
      {showHeader && (title || subtitle) ? (
        <div className="mb-10 text-left">
          {title ? <h2 className="display display-sm">{title}</h2> : null}
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      <div
        ref={marqueeRef}
        className="results-marquee"
        aria-label="Client transformation results"
      >
        <div ref={trackRef} className="results-marquee-track">
          {track.map((result, i) => (
            <ResultVideoCard
              key={`${result.id}-${i}`}
              dupKey={`${result.id}-${i}`}
              result={result}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
