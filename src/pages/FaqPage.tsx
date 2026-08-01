import React from 'react';
import { Pricing } from '../components/Pricing';
import { CtaBanner } from '../components/CtaBanner';

interface FaqPageProps {
  onOpenAuth: (mode: 'login' | 'signup', planName?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="pb-12 space-y-8">
      <Pricing
        onOpenAuth={(planName) => onOpenAuth('signup', planName)}
      />
      <CtaBanner onOpenAuth={() => onOpenAuth('signup')} />
    </div>
  );
};
