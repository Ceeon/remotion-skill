import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { CycleFlowchart } from './CycleFlowchart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="cycle-flowchart"
      durationInFrames={240}
      fps={30}
      width={800}
      height={600}
      component={CycleFlowchart}
    />
  );
};

registerRoot(MainVideo);
