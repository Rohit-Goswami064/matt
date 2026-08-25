'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OfferAnimation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = document.querySelector('section.offer');
    if (!section) return;

    sectionRef.current = section;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showAll = () => {
      gsap.set('.offer-mark', { scale: 1, autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.offer-copy', { x: 0, autoAlpha: 1 });
      gsap.set('.offer-line', { scaleY: 1 });
      gsap.set('.offer-note', { y: 0, autoAlpha: 1 });
      gsap.set('.offer-content .btn', { y: 0, autoAlpha: 1 });
      gsap.set('.offer-media', { autoAlpha: 1, y: 0, scale: 1 });
    };

    if (reduceMotion) {
      const ctx = gsap.context(showAll, section);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      const marks = gsap.utils.toArray('.offer-mark');
      const copies = gsap.utils.toArray('.offer-copy');
      const lines = gsap.utils.toArray('.offer-line');
      const note = section.querySelector('.offer-note');
      const button = section.querySelector('.offer-content .btn');
      const media = section.querySelector('.offer-media');

      gsap.set(marks, { scale: 0.6, autoAlpha: 0, transformOrigin: '50% 50%' });
      gsap.set(copies, { x: -12, autoAlpha: 0 });
      gsap.set(lines, { scaleY: 0, transformOrigin: 'top center' });
      if (note) gsap.set(note, { y: 20, autoAlpha: 0 });
      if (button) gsap.set(button, { y: 20, autoAlpha: 0 });
      if (media) gsap.set(media, { autoAlpha: 0, y: 24, scale: 0.96 });

      const rowStagger = 0.28;
      const badgeDur = 0.22;
      const copyDur = 0.24;
      const copyDelay = 0.1;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 14%',
          end: '+=1100',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      marks.forEach((mark, i) => {
        const at = i * rowStagger;
        tl.to(mark, { scale: 1, autoAlpha: 1, duration: badgeDur }, at);

        if (copies[i]) {
          tl.to(copies[i], { x: 0, autoAlpha: 1, duration: copyDur }, at + copyDelay);
        }

        if (lines[i]) {
          tl.to(lines[i], { scaleY: 1, duration: rowStagger, ease: 'none' }, at);
        }
      });

      const afterRows = (marks.length - 1) * rowStagger + copyDelay + copyDur;

      if (media) {
        tl.to(media, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, 0.08);
      }

      if (note) {
        tl.to(note, { y: 0, autoAlpha: 1, duration: 0.32 }, afterRows);
      }

      if (button) {
        tl.to(button, { y: 0, autoAlpha: 1, duration: 0.32 }, afterRows + 0.14);
      }
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener('load', refresh);
    document.fonts?.ready?.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
