import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandSignature() {
  const sectionRef = useRef<HTMLElement>(null);
  const libasRef = useRef<HTMLSpanElement>(null);
  const fashionRef = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const libas = libasRef.current;
    const fashion = fashionRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;

    if (!section || !libas || !fashion || !subline || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // ENTRANCE (0-30%)
      // "Libas" slides in from left
      scrollTl.fromTo(
        libas,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // "Fashion" slides in from right
      scrollTl.fromTo(
        fashion,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Subline fades in
      scrollTl.fromTo(
        subline,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // CTA fades in
      scrollTl.fromTo(
        cta,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.22
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // "Libas" exits left
      scrollTl.fromTo(
        libas,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // "Fashion" exits right
      scrollTl.fromTo(
        fashion,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Subline exits
      scrollTl.fromTo(
        subline,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power1.in' },
        0.75
      );

      // CTA exits
      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power1.in' },
        0.77
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F5F3EE] z-[80] flex flex-col items-center justify-center"
    >
      {/* Typography Lockup */}
      <div className="text-center">
        <span
          ref={libasRef}
          className="block heading-1 text-[#111111] will-change-transform"
        >
          Libas
        </span>
        <span
          ref={fashionRef}
          className="block heading-1 will-change-transform"
          style={{ color: '#BFA67A' }}
        >
          Fashion
        </span>
      </div>

      {/* Subline */}
      <p
        ref={sublineRef}
        className="mt-8 text-lg lg:text-xl text-[#6E6E6E] will-change-transform"
      >
        Modern classics for everyday life.
      </p>

      {/* CTA */}
      <div ref={ctaRef} className="mt-10 will-change-transform">
        <Link to="/shop" className="btn-pill">
          Shop New Arrivals
        </Link>
      </div>
    </section>
  );
}
