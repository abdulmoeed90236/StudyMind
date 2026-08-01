import React from 'react';
import { HowItWorks } from '../components/HowItWorks';
import { CtaBanner } from '../components/CtaBanner';

interface HowItWorksPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="pb-12 space-y-8">
      <HowItWorks onOpenAuth={() => onOpenAuth('signup')} />
      <CtaBanner onOpenAuth={() => onOpenAuth('signup')} />
    </div>
  );
};
