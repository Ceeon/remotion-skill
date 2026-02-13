import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { Timeline } from './Timeline';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="timeline"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={Timeline}
    />
  );
};

registerRoot(MainVideo);
