import React from 'react';
import { Testimonials } from '../components/Testimonials';
import { CtaBanner } from '../components/CtaBanner';

interface TestimonialsPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="pb-12 space-y-8">
      <Testimonials />
      <CtaBanner onOpenAuth={() => onOpenAuth('signup')} />
    </div>
  );
};
