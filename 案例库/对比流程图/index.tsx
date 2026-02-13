import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { CompareFlowchart } from './CompareFlowchart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="compare-flowchart"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={CompareFlowchart}
    />
  );
};

registerRoot(MainVideo);
