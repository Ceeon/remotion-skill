import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { CuteFlowchart } from './CuteFlowchart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="cute-flowchart"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={CuteFlowchart}
    />
  );
};

registerRoot(MainVideo);
