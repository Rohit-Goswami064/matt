'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextAnimate } from '@/components/ui/text-animate';
import GetStartedButton from '@/components/ui/get-started-button';

gsap.registerPlugin(useGSAP);

function restRotation(tile, isDesktop) {
  if (!isDesktop) return 0;
  const raw = getComputedStyle(tile).getPropertyValue('--r').trim();
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
}

function floatDistance(slot) {
  const raw = getComputedStyle(slot).getPropertyValue('--float-y').trim();
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : -7;
}

function floatDuration(slot) {
  const raw = getComputedStyle(slot).getPropertyValue('--float-dur').trim();
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : 5.4;
}

const TILE_SHADOW = '0 18px 40px rgba(0,0,0,0.52), 0 2px 8px rgba(0,0,0,0.32)';
const TILE_SHADOW_LIFT = '0 32px 64px rgba(0,0,0,0.66), 0 8px 20px rgba(0,0,0,0.4)';

export default function HeroSection() {
  const container = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const root = container.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          isHoverable: '(hover: hover) and (pointer: fine)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isDesktop, isHoverable, reduceMotion } = ctx.conditions;
          const beforeSlots = gsap.utils.toArray('.hero-tiles-before .tile-slot');
          const afterSlots = gsap.utils.toArray('.hero-tiles-after .tile-slot');
          const slots = [...beforeSlots, ...afterSlots];
          const tiles = gsap.utils.toArray('.tile');
          const images = gsap.utils.toArray('.tile img');
          const tags = gsap.utils.toArray('.tile-tag');
          const floats = gsap.utils.toArray('.tile-float');

          gsap.set(tiles, {
            rotation: (i, el) => restRotation(el, isDesktop),
            transformOrigin: '50% 50%',
          });
          gsap.set(images, { transformOrigin: '50% 42%', scale: 1 });

          if (reduceMotion) {
            gsap.set(slots, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
            gsap.set(images, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)' });
            gsap.set(tags, { autoAlpha: 1, y: 0 });
            return;
          }

          const enterX = isDesktop ? 88 : 0;
          const enterY = isDesktop ? 42 : 36;

          gsap.set(beforeSlots, { autoAlpha: 0, x: -enterX, y: enterY, scale: 0.88 });
          gsap.set(afterSlots, { autoAlpha: 0, x: enterX, y: enterY, scale: 0.88 });
          gsap.set(images, {
            scale: 1.24,
            filter: 'blur(10px)',
            clipPath: 'inset(16% 12% 24% 12%)',
          });
          gsap.set(tags, { autoAlpha: 0, y: 10 });
          gsap.set(tiles, {
            rotation: (i, el) => {
              const rest = restRotation(el, isDesktop);
              return rest + (rest >= 0 ? 16 : -16);
            },
          });

          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay: 0.08,
          });

          tl.to(
            beforeSlots,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.92,
              stagger: 0.13,
            },
            0
          );

          tl.to(
            afterSlots,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.92,
              stagger: 0.13,
            },
            0.18
          );

          tl.to(
            tiles,
            {
              rotation: (i, el) => restRotation(el, isDesktop),
              duration: 1.05,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0
          );

          tl.to(
            images,
            {
              scale: 1,
              filter: 'blur(0px)',
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.15,
              stagger: 0.1,
              ease: 'power2.out',
            },
            0.08
          );

          tl.to(
            tags,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.08,
              ease: 'power2.out',
            },
            0.52
          );

          const floatTweens = [];
          const startFloat = contextSafe(() => {
            floats.forEach((el, i) => {
              const slot = slots[i];
              const tween = gsap.to(el, {
                y: slot ? floatDistance(slot) * 1.6 : -11,
                duration: slot ? floatDuration(slot) : 5.4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: i * 0.16,
              });
              floatTweens.push({ el, tween });
            });
          });

          tl.add(startFloat, '+=0.04');

          const listeners = [];
          if (isHoverable) {
            tiles.forEach((tile) => {
              const slot = tile.closest('.tile-slot');
              const float = tile.closest('.tile-float');
              const rest = restRotation(tile, isDesktop);

              const grow = contextSafe(() => {
                if (slot) slot.classList.add('is-hovered');
                const pair = floatTweens.find((item) => item.el === float);
                pair?.tween.pause();
                gsap.to(tile, {
                  scale: 1.1,
                  y: -14,
                  rotation: 0,
                  boxShadow: TILE_SHADOW_LIFT,
                  duration: 0.34,
                  ease: 'power3.out',
                  overwrite: 'auto',
                });
              });

              const shrink = contextSafe(() => {
                if (slot) slot.classList.remove('is-hovered');
                const pair = floatTweens.find((item) => item.el === float);
                pair?.tween.resume();
                gsap.to(tile, {
                  scale: 1,
                  y: 0,
                  rotation: rest,
                  boxShadow: TILE_SHADOW,
                  duration: 0.42,
                  ease: 'power3.out',
                  overwrite: 'auto',
                });
              });

              tile.addEventListener('pointerenter', grow);
              tile.addEventListener('pointerleave', shrink);
              tile.addEventListener('focus', grow);
              tile.addEventListener('blur', shrink);
              listeners.push({ tile, grow, shrink });
            });
          }

          return () => {
            listeners.forEach(({ tile, grow, shrink }) => {
              tile.removeEventListener('pointerenter', grow);
              tile.removeEventListener('pointerleave', shrink);
              tile.removeEventListener('focus', grow);
              tile.removeEventListener('blur', shrink);
            });
            floatTweens.forEach(({ tween }) => tween.kill());
          };
        },
        root
      );

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section className="hero reveal" ref={container}>
      <div className="hero-collage">
        <div className="hero-tiles hero-tiles-before">
          <div className="tile-slot tile-1" style={{ '--i': 0, '--float-dur': '5.2s', '--float-y': '-7px' }}>
            <div className="tile-float">
              <div className="tile" style={{ '--r': '-6deg' }} tabIndex={0}>
                <img src="/mattImage/oldmatt04.jpg" alt="Matt before transformation, 134 lbs" />
                <span className="tile-tag">M0</span>
              </div>
            </div>
          </div>
          <div className="tile-slot tile-2" style={{ '--i': 1, '--float-dur': '5.8s', '--float-y': '-9px' }}>
            <div className="tile-float">
              <div className="tile tile-lg" style={{ '--r': '3deg' }} tabIndex={0}>
                <img src="/mattImage/oldmatt.jpg" alt="Matt before transformation, 140 lbs" />
                <span className="tile-tag">Before</span>
              </div>
            </div>
          </div>
          <div className="tile-slot tile-3" style={{ '--i': 2, '--float-dur': '4.9s', '--float-y': '-6px' }}>
            <div className="tile-float">
              <div className="tile" style={{ '--r': '-4deg' }} tabIndex={0}>
                <img src="/mattImage/oldmattfat.jpg" alt="Matt before transformation" />
                <span className="tile-tag">M1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow-pill">For skinny-fat men, 3-6 months</p>
          <TextAnimate
            animation="blurIn"
            as="h1"
            className="display"
            by="word"
            once
            duration={2.4}
            delay={0.25}
            variants={{
              hidden: { opacity: 0, filter: 'blur(12px)' },
              show: {
                opacity: 1,
                filter: 'blur(0px)',
                transition: { duration: 0.9 },
              },
            }}
          >
            {`Become lean,\nconfident, and\nunrecognizable`}
          </TextAnimate>
          <p className="subhead">The exact system I used to change my own body and mindset at 24 — now I coach men through it, one on one.</p>
          <GetStartedButton
            text="Book a free call"
            href="https://calendly.com/mattng189/call"
            target="_blank"
            rel="noopener"
            className="hero-cta"
          />
          <p className="stat">Watched by 65,000+ men every week on YouTube</p>
        </div>

        <div className="hero-tiles hero-tiles-after">
          <div className="tile-slot tile-4" style={{ '--i': 3, '--float-dur': '5.5s', '--float-y': '-8px' }}>
            <div className="tile-float">
              <div className="tile" style={{ '--r': '5deg' }} tabIndex={0}>
                <img src="/mattImage/newmattherotop.jpg" alt="Matt after transformation" />
                <span className="tile-tag">M5</span>
              </div>
            </div>
          </div>
          <div className="tile-slot tile-5" style={{ '--i': 4, '--float-dur': '6.1s', '--float-y': '-9px' }}>
            <div className="tile-float">
              <div className="tile tile-lg" style={{ '--r': '-3deg' }} tabIndex={0}>
                <img src="/mattImage/newmathhbaki.jpg" alt="Matt after transformation" />
                <span className="tile-tag">After</span>
              </div>
            </div>
          </div>
          <div className="tile-slot tile-6" style={{ '--i': 5, '--float-dur': '5.0s', '--float-y': '-6px' }}>
            <div className="tile-float">
              <div className="tile" style={{ '--r': '4deg' }} tabIndex={0}>
                <img src="/mattImage/15.jpg" alt="Matt after transformation" />
                <span className="tile-tag">M6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
