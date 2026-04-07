import { Suspense, lazy, useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SearchModule } from '@/components/SearchModule';
import { LoadingScreen } from '@/components/common/LoadingScreen';

const FeaturedListings = lazy(() => import('@/components/FeaturedListings').then(module => ({ default: module.FeaturedListings })));
const LocationTiles = lazy(() => import('@/components/LocationTiles').then(module => ({ default: module.LocationTiles })));
const HowItWorks = lazy(() => import('@/components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const AgentTrust = lazy(() => import('@/components/AgentTrust').then(module => ({ default: module.AgentTrust })));
const Footer = lazy(() => import('@/components/Footer').then(module => ({ default: module.Footer })));

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleHeroLoad = () => {
    // Add a tiny delay so the transition feels intentional even if it loads instantly
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <LoadingScreen isLoading={isLoading} />
      <Header />
      <main>
        <HeroCarousel isAppLoaded={!isLoading} onLoadComplete={handleHeroLoad} />
        <div className="pt-8 relative z-30 mb-16">
          <SearchModule />
        </div>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturedListings />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <LocationTiles />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AgentTrust />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
