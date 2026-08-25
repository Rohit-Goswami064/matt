import HeroInteractions from './HeroInteractions';
import OfferAnimation from './OfferAnimation';
import HeroSection from '@/components/hero-section';
import ImageRevealSlider from '@/components/ui/image-reveal-slider';
import { TestimonialSection } from '@/components/ui/testimonials';
import { clientResultsData } from '@/lib/client-results';

export default function Page() {
  return (
    <>
      <header className="nav">
        <a className="nav-brand" href="/" aria-label="Matt Nguyen home">
          <span className="site-logo" aria-hidden="true">
            <img src="/logo_matt_face.jpg" alt="" width="80" height="80" />
          </span>
          <span className="nav-logo">MATT NGUYEN</span>
        </a>
        <a className="btn btn-small" href="https://calendly.com/mattng189/call" target="_blank" rel="noopener">Book a call</a>
      </header>

      <main>

        <HeroSection />

        {/* STORY */}
        <section className="story reveal">
          <div className="story-grid">
            <div className="story-copy">
              <p className="eyebrow">His story</p>
              <blockquote className="pullquote">One limiting belief kept me stuck for twenty-one years. Changing it changed everything — my body, my confidence, my life.</blockquote>
              <p className="story-body">I spent most of my life feeling like the guy in the room nobody noticed — not overweight, not fit, just stuck in between. At 24 I found the one shift that actually moved the needle, and rebuilt my body and my mindset from there. Now I help other men skip the years I wasted and get there faster.</p>
              <p className="draft-note"></p>
            </div>
            <div className="story-portrait">
              <ImageRevealSlider
                beforeSrc="/mattImage/oldmatt02.jpg"
                afterSrc="/mattImage/25.jpg"
                beforeAlt="Matt before transformation"
                afterAlt="Matt after transformation"
              />
              <span className="story-portrait-tag">Matt Nguyen</span>
            </div>
          </div>
        </section>

        {/* CLIENT RESULTS */}
        <section className="results reveal">
          <p className="eyebrow">Client results</p>
          <h2 className="display display-sm">Real men. Real change.</h2>
          <TestimonialSection
            showHeader={false}
            testimonials={clientResultsData}
          />
        </section>

        {/* OFFER */}
        <section className="offer">
          <div className="offer-grid">
            <div className="offer-content">
              <p className="eyebrow">1-on-1 coaching</p>
              <h2 className="display display-sm">What you get</h2>
              <ul className="offer-list">
                <li style={{ '--i': 0 }}>
                  <span className="offer-mark">01</span>
                  <span className="offer-copy">Custom training and nutrition plan built around your life</span>
                  <span className="offer-line" aria-hidden="true" />
                </li>
                <li style={{ '--i': 1 }}>
                  <span className="offer-mark">02</span>
                  <span className="offer-copy">Weekly check-ins directly with Matt</span>
                  <span className="offer-line" aria-hidden="true" />
                </li>
                <li style={{ '--i': 2 }}>
                  <span className="offer-mark">03</span>
                  <span className="offer-copy">Mindset and confidence coaching, not just workouts</span>
                  <span className="offer-line" aria-hidden="true" />
                </li>
                <li style={{ '--i': 3 }}>
                  <span className="offer-mark">04</span>
                  <span className="offer-copy">Direct message access when you need it</span>
                </li>
              </ul>
              <p className="offer-note">Pricing shared after a short call — every plan is built around your starting point.</p>
              <a className="btn btn-primary" href="https://calendly.com/mattng189/call" target="_blank" rel="noopener">Book a free call</a>
            </div>
            <div className="offer-media">
              <img
                src="/mattImage/whatyouget.jpg"
                alt="Matt Nguyen after transformation"
                width={800}
                height={1000}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq reveal">
          <p className="eyebrow">Questions</p>
          <div className="faq-list">
            <div className="faq-item" style={{ '--i': 0 }}>
              <button className="faq-q" aria-expanded="false">
                How long until I see results?
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>Most guys notice a shift in the first few weeks, with visible change by month two or three. Full transformations run 3-6 months depending on your starting point.</p>
                </div>
              </div>
            </div>
            <div className="faq-item" style={{ '--i': 1 }}>
              <button className="faq-q" aria-expanded="false">
                Do I need a gym membership?
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>A gym helps, but your plan is built around what you actually have access to — gym, home, or minimal equipment.</p>
                </div>
              </div>
            </div>
            <div className="faq-item" style={{ '--i': 2 }}>
              <button className="faq-q" aria-expanded="false">
                {"I've tried coaching before and it didn't stick. Why is this different?"}
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>Most programs only handle the training side. This works on the mindset piece too — the part that actually decides whether it sticks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        {/* swap glow background for a real photo of Matt (dimmed, dark overlay) once available */}
        <section className="final reveal">
          <div className="final-glow" aria-hidden="true" />
          <div className="final-inner">
            <h2 className="display final-headline" style={{ '--i': 0 }}>Ready to become unrecognizable?</h2>
            <p className="subhead final-subhead" style={{ '--i': 1 }}>One call. No pressure. Just a plan.</p>
            <a className="btn btn-primary btn-large final-cta" style={{ '--i': 2 }} href="https://calendly.com/mattng189/call" target="_blank" rel="noopener">Book a free call</a>
          </div>
        </section>

      </main>

      <footer className="footer">
        <a className="footer-brand" href="/" aria-label="Matt Nguyen home">
          <span className="site-logo site-logo--sm" aria-hidden="true">
            <img src="/logo_matt_face.jpg" alt="" width="64" height="64" />
          </span>
          <span>© Matt Nguyen</span>
        </a>
        <div className="footer-links">
          <a href="https://instagram.com/real_mattnguyen" target="_blank" rel="noopener">Instagram</a>
          <span className="footer-dot" aria-hidden="true" />
          <a href="https://www.youtube.com/@real_mattnguyen" target="_blank" rel="noopener">YouTube</a>
        </div>
      </footer>

      <OfferAnimation />
      <HeroInteractions />
    </>
  );
}
