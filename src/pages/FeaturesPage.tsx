import React from 'react';
import { Features } from '../components/Features';
import { CtaBanner } from '../components/CtaBanner';
import { Feature } from '../types';

interface FeaturesPageProps {
  onSelectFeature: (feature: Feature) => void;
  onOpenAuth: (mode: 'login' | 'signup', planName?: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onSelectFeature,
  onOpenAuth,
}) => {
  return (
    <div className="pb-12 space-y-8">
      <Features
        onSelectFeature={onSelectFeature}
        onOpenAuth={() => onOpenAuth('signup', 'Pro Learner')}
      />
      <CtaBanner onOpenAuth={() => onOpenAuth('signup')} />
    </div>
  );
};
