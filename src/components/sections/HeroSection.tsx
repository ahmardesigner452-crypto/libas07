import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const caption = captionRef.current;
    const rightPanel = rightPanelRef.current;

    if (!section || !image || !headline || !subhead || !cta || !caption || !rightPanel) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Image entrance
      loadTl.fromTo(
        image,
        { opacity: 0, scale: 1.06, x: '-6vw' },
        { opacity: 1, scale: 1, x: 0, duration: 1 }
      );

      // Headline lines stagger
      const headlineLines = headline.querySelectorAll('.headline-line');
      loadTl.fromTo(
        headlineLines,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        '-=0.6'
      );

      // Subheadline + CTA + micro-link
      loadTl.fromTo(
        [subhead, cta.children],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );

      // Caption
      loadTl.fromTo(
        caption,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Scroll-driven exit animation (pinned) - SMOOTH SETTINGS
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([image, headline, subhead, cta, caption, rightPanel], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): Hold state (already visible from load animation)
      // SETTLE (30-70%): Static

      // EXIT (70-100%) - Smoother easing
      // Headline group exits
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Right panel slides out like a door
      scrollTl.fromTo(
        rightPanel,
        { x: 0 },
        { x: '38vw', ease: 'power1.in' },
        0.7
      );

      // Left image scales and moves
      scrollTl.fromTo(
        image,
        { scale: 1, x: 0 },
        { scale: 1.08, x: '-6vw', ease: 'power1.in' },
        0.7
      );

      // CTA exits
      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Caption fades
      scrollTl.fromTo(
        caption,
        { opacity: 1 },
        { opacity: 0, ease: 'power1.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F5F3EE] z-10"
    >
      {/* Left Photo Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[62vw] h-full will-change-transform"
      >
        <img
          src="/images/hero_modern_classics.jpg"
          alt="Modern Classics"
          className="w-full h-full object-cover"
        />
        {/* Caption */}
        <span
          ref={captionRef}
          className="absolute bottom-[4vh] left-[2.5vw] caption text-white/85"
        >
          SS26 Collection — Look 01
        </span>
      </div>

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-[38vw] h-full bg-[#F5F3EE] flex flex-col justify-center px-[4vw] will-change-transform"
      >
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1 className="heading-1">
            <span className="headline-line block">MODERN</span>
            <span className="headline-line block">CLASSICS</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="body-text text-[#6E6E6E] max-w-[28vw] mb-10"
        >
          A capsule of essentials designed for real life—tailored, timeless, effortless.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="space-y-4">
          <Link to="/shop" className="btn-pill inline-block">
            Shop the Capsule
          </Link>
          <div>
            <Link
              to="/shop"
              className="text-sm uppercase tracking-[0.12em] font-medium link-underline"
            >
              View lookbook
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
