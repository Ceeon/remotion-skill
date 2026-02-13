import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { PieChart } from './PieChart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="pie-chart"
      durationInFrames={180}
      fps={30}
      width={800}
      height={600}
      component={PieChart}
    />
  );
};

registerRoot(MainVideo);
