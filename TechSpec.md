# Libas Fashion — Technical Specification

## 1. Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, actions | Pill shape (rounded-full), accent color |
| Dialog | Cart drawer, mobile menu | Slide-in from right |
| Sheet | Side panels (cart, menu) | Custom width, dark overlay |
| Input | Form fields | Dark variant for footer |
| Label | Form labels | - |
| Separator | Visual dividers | Hairline style |
| Badge | Filter chips, tags | Minimal style |
| ScrollArea | Cart items scroll | Hidden scrollbar |

### Custom Components

#### Layout Components
| Component | Props | Purpose |
|-----------|-------|---------|
| `Header` | - | Fixed header with logo, menu, cart |
| `Footer` | - | Dark footer with newsletter |
| `CartDrawer` | `isOpen, onClose` | Slide-in cart with items |
| `MobileMenu` | `isOpen, onClose` | Full-screen mobile navigation |

#### Section Components (Homepage)
| Component | Props | Purpose |
|-----------|-------|---------|
| `HeroSection` | - | Split-screen hero with auto-play animation |
| `CollectionShowcase` | - | 3-panel design philosophy section |
| `EditorialStatement` | - | Full-bleed "STYLE IS" section |
| `ProductSpotlight` | - | Featured product with quick-add |
| `CategoryTriptych` | - | Women/Men/Kids browse panels |
| `NewArrivalsGrid` | - | Product grid with filters |
| `AtmosphereGallery` | - | 3-band lifestyle section |
| `BrandSignature` | - | Big typographic lockup |
| `ContactSection` | - | Newsletter + footer links |

#### Product Components
| Component | Props | Purpose |
|-----------|-------|---------|
| `ProductCard` | `product` | Grid product card with hover |
| `ProductDetail` | `product` | Full product detail view |
| `SizeSelector` | `sizes, selected, onSelect` | Size toggle buttons |
| `ColorSwatch` | `colors, selected, onSelect` | Color dot selectors |
| `QuickAddButton` | `product` | One-click add to cart |

#### Animation Components
| Component | Props | Purpose |
|-----------|-------|---------|
| `PinnedSection` | `children, triggerConfig` | Wrapper for pinned scroll sections |
| `ScrollReveal` | `children, direction` | Flowing section reveal |
| `GrainOverlay` | - | Global film grain texture |

### Custom Hooks
| Hook | Purpose |
|------|---------|
| `useCart` | Cart state management (add, remove, update qty) |
| `useScrollProgress` | Track scroll progress for animations |
| `useMediaQuery` | Responsive breakpoint detection |
| `useReducedMotion` | Respect prefers-reduced-motion |

---

## 2. Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero auto-play entrance | GSAP | Timeline on mount, staggered reveals | Medium |
| Hero scroll exit | GSAP ScrollTrigger | Pinned section with scrub, fromTo states | High |
| Split panel slide-in | GSAP ScrollTrigger | x: ±50vw transforms, 3-phase timeline | High |
| Headline stagger reveal | GSAP | Staggered fromTo with y/x transforms | Medium |
| Image parallax scale | GSAP ScrollTrigger | scale: 1.06→1.00 on entrance | Medium |
| Right panel door slide | GSAP ScrollTrigger | x: +38vw exit animation | Medium |
| Triptych panel rise | GSAP ScrollTrigger | y: +100vh staggered entrance | High |
| Category hover scale | CSS/Framer | transform: scale(1.02) on hover | Low |
| Product card reveal | GSAP ScrollTrigger | y: +40px, opacity flow reveal | Medium |
| Card image hover zoom | CSS | transform: scale(1.03) | Low |
| Quick-add fade-in | CSS | opacity transition on hover | Low |
| Brand signature slide | GSAP ScrollTrigger | x: ±60vw opposing entrances | High |
| Footer reveal | GSAP ScrollTrigger | y: +24px flow reveal | Low |
| Button hover lift | CSS | translateY(-2px) + scale(1.02) | Low |
| Global scroll snap | GSAP ScrollTrigger | Custom snap derived from pinned ranges | High |

---

## 3. Animation Library Choices

### Primary: GSAP + ScrollTrigger
**Rationale**: 
- Best-in-class scroll-linked animations with `scrub`
- Precise control over 3-phase pinned sections
- `fromTo()` ensures reverse scroll correctness
- Excellent performance with transform-only animations

### Secondary: CSS Transitions
**Use for**:
- Hover states (buttons, cards)
- Simple opacity/scale transitions
- Reduced motion fallbacks

### Not Using:
- Framer Motion (overkill for scroll-driven, GSAP is superior for pinned sections)
- CSS Scroll-Timeline (limited browser support)

---

## 4. Project File Structure

```
app/
├── public/
│   └── images/           # Product & lifestyle images
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn components
│   │   ├── layout/       # Header, Footer, CartDrawer
│   │   ├── product/      # ProductCard, SizeSelector, etc.
│   │   └── sections/     # Homepage sections
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useScrollProgress.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── data.ts       # Product data
│   ├── store/
│   │   └── cartStore.ts  # Zustand cart state
│   ├── types/
│   │   └── index.ts      # TypeScript types
│   ├── pages/
│   │   ├── Home.tsx      # Landing with all sections
│   │   ├── Shop.tsx      # Product listing
│   │   ├── Product.tsx   # Product detail
│   │   ├── Cart.tsx      # Cart page
│   │   ├── Checkout.tsx  # Checkout flow
│   │   └── Account.tsx   # User account
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Dependencies

### Core
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
```

### Animation
```json
{
  "gsap": "^3.12.0",
  "@gsap/react": "^2.1.0"
}
```

### State Management
```json
{
  "zustand": "^4.4.0"
}
```

### UI Components
```json
{
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-slot": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Fonts
- Google Fonts: `Cormorant Garamond` (serif), `Inter` (sans)

---

## 6. Key Implementation Notes

### Pinned Section Pattern
```typescript
// Each pinned section follows this structure
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=130%",
      pin: true,
      scrub: 0.6,
    }
  });

  // ENTRANCE (0-30%)
  tl.fromTo(element, { x: "-50vw", opacity: 0 }, { x: 0, opacity: 1 }, 0);
  
  // SETTLE (30-70%) - implicit hold
  
  // EXIT (70-100%)
  tl.to(element, { x: "-20vw", opacity: 0 }, 0.7);
}, []);
```

### Scroll Snap Implementation
```typescript
// Global snap derived from pinned ScrollTriggers
ScrollTrigger.create({
  snap: {
    snapTo: (progress) => {
      // Calculate nearest pinned section center
      // Return snap target with distance-aware duration
    },
    duration: { min: 0.15, max: 0.35 },
    delay: 0,
    ease: "power2.out"
  }
});
```

### Cart State (Zustand)
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
}
```

### Responsive Breakpoints
- Desktop: > 1024px (full pinned sections)
- Tablet: 768px - 1024px (reduced motion distances)
- Mobile: < 768px (stacked layouts, optional disable pin)

---

## 7. Performance Considerations

1. **Transform-only animations** (no blur, no backdrop-filter)
2. **will-change** on animated elements
3. **Image optimization**: WebP format, lazy loading
4. **Code splitting**: Route-based lazy loading
5. **Reduced motion**: Full fallback experience
