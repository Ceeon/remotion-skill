import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { SkillsFlowchart } from './SkillsFlowchart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="skills-flowchart"
      durationInFrames={210}
      fps={30}
      width={800}
      height={600}
      component={SkillsFlowchart}
    />
  );
};

registerRoot(MainVideo);
