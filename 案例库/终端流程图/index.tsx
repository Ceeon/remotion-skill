import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { TerminalFlowchart } from './TerminalFlowchart';

const MainVideo: React.FC = () => {
  return (
    <Composition
      id="terminal-flowchart"
      durationInFrames={300}
      fps={30}
      width={800}
      height={600}
      component={TerminalFlowchart}
    />
  );
};

registerRoot(MainVideo);
