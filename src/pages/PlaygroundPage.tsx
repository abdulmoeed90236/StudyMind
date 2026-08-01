import React from 'react';
import { InteractivePlayground } from '../components/InteractivePlayground';
import { CtaBanner } from '../components/CtaBanner';

interface PlaygroundPageProps {
  onOpenAuth: (mode: 'login' | 'signup', planName?: string) => void;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="pb-12 space-y-8">
      <InteractivePlayground
        onOpenAuth={() => onOpenAuth('signup', 'Pro Learner')}
      />
      <CtaBanner onOpenAuth={() => onOpenAuth('signup')} />
    </div>
  );
};
