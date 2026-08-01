import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { InteractivePlayground } from '../components/InteractivePlayground';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { CtaBanner } from '../components/CtaBanner';
import { Feature } from '../types';

interface HomePageProps {
  onOpenAuth: (mode: 'login' | 'signup', planName?: string) => void;
  onOpenDemo: () => void;
  onSelectFeature: (feature: Feature) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAuth,
  onOpenDemo,
  onSelectFeature,
}) => {
  return (
    <div className="space-y-0">
      <Hero
        onOpenAuth={(mode) => onOpenAuth(mode)}
        onOpenDemo={onOpenDemo}
      />
      <Features
        onSelectFeature={onSelectFeature}
        onOpenAuth={() => onOpenAuth('signup', 'Pro Learner')}
      />
      <InteractivePlayground
        onOpenAuth={() => onOpenAuth('signup', 'Pro Learner')}
      />
      <HowItWorks
        onOpenAuth={() => onOpenAuth('signup')}
      />
      <Testimonials />
      <Pricing
        onOpenAuth={(planName) => onOpenAuth('signup', planName)}
      />
      <CtaBanner
        onOpenAuth={() => onOpenAuth('signup')}
      />
    </div>
  );
};
