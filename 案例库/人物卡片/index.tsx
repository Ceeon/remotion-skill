import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { PersonCard } from './PersonCard';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="person-card"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={PersonCard}
    />
  );
};

registerRoot(MainVideo);
