import { Composition, registerRoot } from 'remotion';
import React from 'react';
import { CycleFlowchart } from '../案例库/循环流程图/CycleFlowchart';
import { SkillsFlowchart } from '../案例库/莫兰迪卡片网格/SkillsFlowchart';
import { CuteFlowchart } from '../案例库/可爱流程图/CuteFlowchart';
import { StaticVsDynamic } from '../案例库/静态vs动画对比/StaticVsDynamic';
import { ThreeSteps } from '../案例库/三步流程/ThreeSteps';

const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="cycle-flowchart"
        durationInFrames={240}
        fps={30}
        width={800}
        height={600}
        component={CycleFlowchart}
      />
      <Composition
        id="morandi-grid"
        durationInFrames={210}
        fps={30}
        width={800}
        height={600}
        component={SkillsFlowchart}
      />
      <Composition
        id="cute-flowchart"
        durationInFrames={180}
        fps={30}
        width={800}
        height={600}
        component={CuteFlowchart}
      />
      <Composition
        id="static-vs-dynamic"
        durationInFrames={240}
        fps={30}
        width={800}
        height={600}
        component={StaticVsDynamic}
      />
      <Composition
        id="three-steps"
        durationInFrames={210}
        fps={30}
        width={800}
        height={600}
        component={ThreeSteps}
      />
    </>
  );
};

registerRoot(Root);
