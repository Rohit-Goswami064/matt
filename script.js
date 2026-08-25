// -----------------------------------------------------------------
// Scroll reveals — CSS transitions + IntersectionObserver
// -----------------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.classList.contains('hero')) {
        animateHeroHeadline(entry.target);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => observer.observe(el));

// -----------------------------------------------------------------
// Hero headline letter stagger (Motion/AnimatedText equivalent via GSAP)
// -----------------------------------------------------------------
function splitHeadline(el, animationType = 'letters') {
  const nodes = [...el.childNodes];
  el.textContent = '';

  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
      el.appendChild(document.createElement('br'));
      return;
    }

    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent || '';

    if (animationType === 'words') {
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          el.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        el.appendChild(span);
        el.appendChild(document.createTextNode(' '));
      });
      return;
    }

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = char === ' ' ? 'char char-space' : 'char';
      span.textContent = char === ' ' ? ' ' : char;
      el.appendChild(span);
    });
  });
}

function animateHeroHeadline(hero) {
  const heading = hero.querySelector('.hero-copy .display');
  if (!heading || heading.dataset.animated === 'true') return;
  heading.dataset.animated = 'true';

  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  splitHeadline(heading, 'letters');
  const chars = heading.querySelectorAll('.char, .word');

  if (!chars.length || typeof gsap === 'undefined' || prefersReduced) {
    chars.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.set(chars, { y: 14, opacity: 0 });
  gsap.to(chars, {
    y: 0,
    opacity: 1,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.035,
    delay: 0.12,
  });
}

// -----------------------------------------------------------------
// Hero tile hover grow (GSAP) — scale + lift on pointer devices only
// -----------------------------------------------------------------
if (typeof gsap !== 'undefined') {
  gsap.defaults({ overwrite: 'auto' });

  const mm = gsap.matchMedia();

  mm.add(
    {
      isHoverable: '(hover: hover) and (pointer: fine)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isHoverable, reduceMotion } = context.conditions;
      if (!isHoverable || reduceMotion) return;

      const tiles = gsap.utils.toArray('.hero .tile');

      tiles.forEach((tile) => {
        const slot = tile.closest('.tile-slot');

        const grow = () => {
          if (slot) slot.classList.add('is-hovered');
          gsap.to(tile, {
            scale: 1.08,
            y: -10,
            boxShadow: '0 28px 56px rgba(0,0,0,0.62), 0 6px 16px rgba(0,0,0,0.38)',
            duration: 0.28,
            ease: 'power2.out',
          });
        };

        const shrink = () => {
          if (slot) slot.classList.remove('is-hovered');
          gsap.to(tile, {
            scale: 1,
            y: 0,
            boxShadow: '0 18px 40px rgba(0,0,0,0.52), 0 2px 8px rgba(0,0,0,0.32)',
            duration: 0.32,
            ease: 'power2.out',
          });
        };

        tile.addEventListener('pointerenter', grow);
        tile.addEventListener('pointerleave', shrink);
        tile.addEventListener('focus', grow);
        tile.addEventListener('blur', shrink);
      });
    }
  );
}

// -----------------------------------------------------------------
// FAQ accordion
// -----------------------------------------------------------------
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
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
  });
});
