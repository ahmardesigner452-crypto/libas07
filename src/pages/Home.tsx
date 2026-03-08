import { HeroSection } from '@/components/sections/HeroSection';
import { CollectionShowcase } from '@/components/sections/CollectionShowcase';
import { EditorialStatement } from '@/components/sections/EditorialStatement';
import { ProductSpotlight } from '@/components/sections/ProductSpotlight';
import { CategoryTriptych } from '@/components/sections/CategoryTriptych';
import { NewArrivalsGrid } from '@/components/sections/NewArrivalsGrid';
import { AtmosphereGallery } from '@/components/sections/AtmosphereGallery';
import { BrandSignature } from '@/components/sections/BrandSignature';

export function Home() {
  return (
    <div className="relative">
      {/* Section 1: Split Hero */}
      <HeroSection />

      {/* Section 2: Collection Showcase */}
      <CollectionShowcase />

      {/* Section 3: Editorial Statement */}
      <EditorialStatement />

      {/* Section 4: Product Spotlight */}
      <ProductSpotlight />

      {/* Section 5: Category Triptych */}
      <CategoryTriptych />

      {/* Section 6: New Arrivals Grid (flowing) */}
      <NewArrivalsGrid />

      {/* Section 7: Atmosphere Gallery */}
      <AtmosphereGallery />

      {/* Section 8: Brand Signature */}
      <BrandSignature />
    </div>
  );
}
