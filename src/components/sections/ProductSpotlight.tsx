import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCartStore } from '@/store/cartStore';
import { featuredProduct } from '@/lib/data';
import { SizeSelector } from '@/components/product/SizeSelector';
import { ColorSwatch } from '@/components/product/ColorSwatch';

gsap.registerPlugin(ScrollTrigger);

export function ProductSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [selectedSize, setSelectedSize] = useState(featuredProduct.sizes[1]);
  const [selectedColor, setSelectedColor] = useState(featuredProduct.colors[0].name);
  const addItem = useCartStore((state) => state.addItem);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const panel = panelRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const controls = controlsRef.current;

    if (!section || !image || !panel || !title || !details || !controls) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // ENTRANCE (0-30%)
      // Left image slides in
      scrollTl.fromTo(
        image,
        { x: '-60vw', opacity: 1 },
        { x: 0, ease: 'none' },
        0
      );

      // Right panel slides in
      scrollTl.fromTo(
        panel,
        { x: '40vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Title drops in
      scrollTl.fromTo(
        title,
        { y: '-30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Details slide in
      scrollTl.fromTo(
        details,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Controls fade in
      scrollTl.fromTo(
        controls,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // Image exits
      scrollTl.fromTo(
        image,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-20vw', scale: 1.05, opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Panel exits
      scrollTl.fromTo(
        panel,
        { x: 0 },
        { x: '40vw', ease: 'power1.in' },
        0.7
      );

      // Title exits
      scrollTl.fromTo(
        title,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power1.in' },
        0.7
      );

      // Details exit
      scrollTl.fromTo(
        details,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power1.in' },
        0.72
      );

      // Controls exit
      scrollTl.fromTo(
        controls,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power1.in' },
        0.74
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    addItem(featuredProduct, selectedSize, selectedColor);
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F5F3EE] z-40"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[65vw] h-full will-change-transform"
      >
        <img
          src="/images/product_blazer.jpg"
          alt={featuredProduct.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Details Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-[35vw] h-full bg-[#F5F3EE] flex flex-col justify-center px-[3vw] will-change-transform"
      >
        {/* Title */}
        <h2
          ref={titleRef}
          className="heading-2 mb-4 will-change-transform"
        >
          {featuredProduct.name}
        </h2>

        {/* Details */}
        <div ref={detailsRef} className="will-change-transform">
          <p className="text-2xl text-[#6E6E6E] font-medium mb-6">
            ${featuredProduct.price}
          </p>
          <p className="body-text text-[#6E6E6E] mb-8 max-w-[28vw]">
            {featuredProduct.description}
          </p>
        </div>

        {/* Controls */}
        <div ref={controlsRef} className="space-y-6 will-change-transform">
          {/* Color Swatches */}
          <div>
            <p className="caption text-[#6E6E6E] mb-3">Color</p>
            <ColorSwatch
              colors={featuredProduct.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          {/* Size Selector */}
          <div>
            <p className="caption text-[#6E6E6E] mb-3">Size</p>
            <SizeSelector
              sizes={featuredProduct.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          {/* CTAs */}
          <div className="space-y-4 pt-4">
            <button onClick={handleAddToCart} className="btn-pill w-full">
              Add to Cart
            </button>
            <Link
              to={`/product/${featuredProduct.id}`}
              className="text-sm uppercase tracking-[0.12em] font-medium link-underline inline-block"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
