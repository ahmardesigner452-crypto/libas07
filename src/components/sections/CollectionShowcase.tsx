import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CollectionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const imageStack = imageStackRef.current;

    if (!section || !headline || !body || !imageStack) return;

    const ctx = gsap.context(() => {
      const headlineLines = headline.querySelectorAll('.headline-line');

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
      // Image stack slides in from right
      scrollTl.fromTo(
        imageStack,
        { x: '50vw', opacity: 1 },
        { x: 0, ease: 'none' },
        0
      );

      // Headline lines stagger in from left
      scrollTl.fromTo(
        headlineLines,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, ease: 'none' },
        0
      );

      // Body copy fades in
      scrollTl.fromTo(
        body,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // Image stack slides out to right
      scrollTl.fromTo(
        imageStack,
        { x: 0 },
        { x: '50vw', ease: 'power1.in' },
        0.7
      );

      // Headline exits
      scrollTl.fromTo(
        headlineLines,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, stagger: 0.02, ease: 'power1.in' },
        0.7
      );

      // Body exits
      scrollTl.fromTo(
        body,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power1.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F5F3EE] z-20"
    >
      {/* Left Typography Column */}
      <div className="absolute left-0 top-0 w-[55vw] h-full flex flex-col justify-center px-[5vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <h2 className="heading-1">
            <span className="headline-line block">DESIGNED</span>
            <span className="headline-line block">TO BE</span>
            <span className="headline-line block">WORN</span>
          </h2>
        </div>

        {/* Body + CTA */}
        <div ref={bodyRef}>
          <p className="body-text text-[#6E6E6E] max-w-[38vw] mb-10">
            We build collections around a single idea: clothes should feel as good as they look.
            Clean lines, honest materials, and fits that move with you.
          </p>
          <Link to="/shop" className="btn-pill inline-block">
            Explore the collection
          </Link>
        </div>
      </div>

      {/* Right Image Stack */}
      <div
        ref={imageStackRef}
        className="absolute right-0 top-0 w-[45vw] h-full flex flex-col will-change-transform"
      >
        <div className="h-[34vh] w-full">
          <img
            src="/images/collection_stack_01.jpg"
            alt="Fabric texture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[33vh] w-full">
          <img
            src="/images/collection_stack_02.jpg"
            alt="Accessories"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[33vh] w-full">
          <img
            src="/images/collection_stack_03.jpg"
            alt="Silhouette"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
