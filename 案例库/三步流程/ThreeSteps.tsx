import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from 'remotion';

export const ThreeSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = 210;
  const loopFrame = frame % totalFrames;

  const appear = (delay: number) =>
    spring({ frame: loopFrame - delay, fps, config: { damping: 10 } });

  const steps = [
    { icon: '📦', title: '装 Skill', sub: '一次性', color: '#6c5ce7' },
    { icon: '💬', title: '画 ASCII', sub: 'Agent 画', color: '#0984e3' },
    { icon: '🎬', title: '/remotion', sub: '生成 GIF', color: '#00b894' },
  ];

  const arrow1 = interpolate(loopFrame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2 = interpolate(loopFrame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrows = [arrow1, arrow2];

  const numLabels = ['①', '②', '③'];
  const numAppear = [appear(90), appear(100), appear(110)];

  return (
    <AbsoluteFill style={{
      backgroundColor: '#f8f6f3',
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {steps.map((step, i) => {
          const scale = appear(i * 25 + 10);
          return (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${scale})`,
              }}>
                <div style={{
                  width: 180,
                  height: 180,
                  borderRadius: 20,
                  background: '#fff',
                  border: `3px solid ${step.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 6px 24px ${step.color}22`,
                  gap: 8,
                }}>
                  <div style={{ fontSize: 42 }}>{step.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#2d2d2d' }}>{step.title}</div>
                  <div style={{ fontSize: 15, color: '#888', marginTop: 2 }}>{step.sub}</div>
                </div>
                <div style={{
                  marginTop: 16,
                  fontSize: 20,
                  color: step.color,
                  fontWeight: 600,
                  opacity: numAppear[i],
                  transform: `scale(${numAppear[i]})`,
                }}>
                  {numLabels[i]}
                </div>
              </div>

              {i < 2 && (
                <div style={{
                  fontSize: 32,
                  color: '#bbb',
                  margin: '0 16px',
                  marginBottom: 40,
                  opacity: arrows[i],
                  transform: `translateX(${(1 - arrows[i]) * -10}px)`,
                }}>
                  ──▶
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
