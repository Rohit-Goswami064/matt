'use client';

import { useEffect } from 'react';

export default function HeroInteractions() {
  useEffect(() => {
    // -----------------------------------------------------------------
    // Scroll reveals — currently plain CSS transitions triggered by
    // IntersectionObserver. To upgrade to GSAP later:
    //   1. Add <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    //      and the ScrollTrigger plugin before this file in index.html
    //   2. Replace the observer block below with gsap.from('.reveal', {...})
    //      driven by ScrollTrigger, one trigger per section
    //   3. The .reveal class names and section structure are already set up
    //      so each section can become its own ScrollTrigger target
    // -----------------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));

    // -----------------------------------------------------------------
    // FAQ accordion
    // -----------------------------------------------------------------
    const faqButtons = document.querySelectorAll('.faq-q');
    const faqHandlers = [];

    faqButtons.forEach((btn) => {
      const handler = () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item.open').forEach((openItem) => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      };
      faqHandlers.push({ btn, handler });
      btn.addEventListener('click', handler);
    });

    return () => {
      observer.disconnect();
      faqHandlers.forEach(({ btn, handler }) => {
        btn.removeEventListener('click', handler);
      });
    };
  }, []);

  return null;
}
