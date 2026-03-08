import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bands = [
  { word: 'TEXTURES', image: '/images/atmosphere_textures.jpg' },
  { word: 'LIGHT', image: '/images/atmosphere_light.jpg' },
  { word: 'EASE', image: '/images/atmosphere_ease.jpg' },
];

export function AtmosphereGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const words = wordsRef.current.filter(Boolean);

    if (!section || !container || words.length === 0) return;

    const ctx = gsap.context(() => {
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
        },
      });

      // ENTRANCE (0-30%)
      // Container slides in from right
      scrollTl.fromTo(
        container,
        { x: '60vw', opacity: 1 },
        { x: 0, ease: 'none' },
        0
      );

      // Words slide in from left with stagger
      words.forEach((word, i) => {
        scrollTl.fromTo(
          word,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          i * 0.08
        );
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // Container exits to left
      scrollTl.fromTo(
        container,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Words exit to right
      words.forEach((word) => {
        scrollTl.fromTo(
          word,
          { x: 0, opacity: 1 },
          { x: '20vw', opacity: 0, ease: 'power1.in' },
          0.72
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-[70]"
    >
      {/* Bands Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col will-change-transform"
      >
        {bands.map((band, index) => (
          <div
            key={band.word}
            className="relative flex-1 w-full overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={band.image}
              alt={band.word}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Word */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                ref={(el) => { wordsRef.current[index] = el; }}
                className="text-5xl lg:text-7xl font-semibold text-white/95 will-change-transform"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {band.word}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
