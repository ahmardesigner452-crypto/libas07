import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Women', image: '/images/category_women.jpg', href: '/shop?category=women' },
  { name: 'Men', image: '/images/category_men.jpg', href: '/shop?category=men' },
  { name: 'Kids', image: '/images/category_kids.jpg', href: '/shop?category=kids' },
];

export function CategoryTriptych() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);
    const labels = labelsRef.current.filter(Boolean);

    if (!section || panels.length === 0) return;

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
      // Panels rise up with stagger
      panels.forEach((panel, i) => {
        scrollTl.fromTo(
          panel,
          { y: '100vh' },
          { y: 0, ease: 'none' },
          i * 0.06
        );
      });

      // Labels fade in
      labels.forEach((label, i) => {
        scrollTl.fromTo(
          label,
          { opacity: 0, y: '6vh' },
          { opacity: 1, y: 0, ease: 'none' },
          0.1 + i * 0.03
        );
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%) - Smoother easing
      // All panels scale and fade
      panels.forEach((panel) => {
        scrollTl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0, ease: 'power1.in' },
          0.7
        );
      });

      // Labels fade
      labels.forEach((label) => {
        scrollTl.fromTo(
          label,
          { opacity: 1 },
          { opacity: 0, ease: 'power1.in' },
          0.72
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-50"
    >
      {/* Three Vertical Panels */}
      {categories.map((category, index) => (
        <div
          key={category.name}
          ref={(el) => { panelsRef.current[index] = el; }}
          className="absolute top-0 h-full will-change-transform"
          style={{
            left: `${index * 34}vw`,
            width: index === 0 ? '34vw' : '33vw',
          }}
        >
          <Link to={category.href} className="block w-full h-full group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/28 transition-colors duration-300 group-hover:bg-black/20" />
            </div>

            {/* Label */}
            <div
              ref={(el) => { labelsRef.current[index] = el; }}
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
            >
              <h3
                className="text-4xl lg:text-5xl font-semibold text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {category.name}
              </h3>
              <span className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-[0.12em] font-medium">
                Shop
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
