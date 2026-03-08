import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EditorialStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLSpanElement>(null);
  const isRef = useRef<HTMLSpanElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const style = styleRef.current;
    const is = isRef.current;
    const micro = microRef.current;

    if (!section || !image || !style || !is || !micro) return;

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
      // Background image scales and moves
      scrollTl.fromTo(
        image,
        { scale: 1.1, x: '-6vw' },
        { scale: 1, x: 0, ease: 'none' },
        0
      );

      // "STYLE" slides in
      scrollTl.fromTo(
        style,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // "IS" slides in (slightly delayed)
      scrollTl.fromTo(
        is,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Micro line fades in
      scrollTl.fromTo(
        micro,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // Background image exits
      scrollTl.fromTo(
        image,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.06, x: '6vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // "STYLE" exits
      scrollTl.fromTo(
        style,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // "IS" exits
      scrollTl.fromTo(
        is,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power1.in' },
        0.72
      );

      // Micro line exits
      scrollTl.fromTo(
        micro,
        { y: 0, opacity: 1 },
        { y: '4vh', opacity: 0, ease: 'power1.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/images/style_is_background.jpg"
          alt="Style"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
      </div>

      {/* Typography */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]">
        <span
          ref={styleRef}
          className="heading-1 text-white/95 block will-change-transform"
          style={{ marginTop: '-15vh' }}
        >
          STYLE
        </span>
        <span
          ref={isRef}
          className="heading-1 block will-change-transform"
          style={{ color: '#BFA67A', marginTop: '2vh' }}
        >
          IS
        </span>
        <p
          ref={microRef}
          className="text-white/90 text-lg lg:text-xl max-w-[34vw] mt-12 will-change-transform"
        >
          A point of view—not a trend.
        </p>
      </div>
    </section>
  );
}
