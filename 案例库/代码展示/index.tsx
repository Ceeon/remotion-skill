import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { CodeShowcase } from './CodeShowcase';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="code-showcase"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={CodeShowcase}
    />
  );
};

registerRoot(MainVideo);
