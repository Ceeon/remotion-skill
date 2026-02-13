import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from 'remotion';

// ============ Emoji 图标组件 ============

const EmojiIcon: React.FC<{ emoji: string; size: number }> = ({ emoji, size }) => (
  <div style={{
    fontSize: size,
    lineHeight: 1,
    textAlign: 'center',
  }}>
    {emoji}
  </div>
);

// ============ 箭头组件 ============

const CuteArrow: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    opacity,
    marginLeft: -8,
    marginRight: -8,
  }}>
    <svg width="60" height="30" viewBox="0 0 60 30">
      <line x1="4" y1="15" x2="48" y2="15" stroke="#8a7a6a" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 8 L52 15 L42 22" stroke="#8a7a6a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// ============ 单个流程节点 ============

interface FlowNodeProps {
  icon: React.ReactNode;
  label: string;
  index: number;
  frame: number;
  fps: number;
}

const FlowNode: React.FC<FlowNodeProps> = ({ icon, label, index, frame, fps }) => {
  const loopFrames = 180; // 6秒循环
  const frameInLoop = frame % loopFrames;
  const showFrame = 30 + index * 40; // 1秒后开始，每个间隔40帧
  const delayFrame = Math.max(0, frameInLoop - showFrame);

  // 入场动画
  const scale = spring({ frame: delayFrame, fps, from: 0.3, to: 1, config: { damping: 8 } });
  const opacity = interpolate(delayFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = spring({ frame: delayFrame, fps, from: 40, to: 0, config: { damping: 10 } });

  // 浮动呼吸动画（入场后）
  const breathFrame = Math.max(0, delayFrame - 25);
  const float = Math.sin(breathFrame * 0.08) * 3;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity,
      transform: `translateY(${translateY + float}px) scale(${scale})`,
    }}>
      {/* 图标 */}
      <div style={{
        width: 130,
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
      }}>
        {icon}
      </div>
      {/* 标签 */}
      <div style={{
        marginTop: 14,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5a4a3a',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        letterSpacing: 2,
      }}>
        {label}
      </div>
    </div>
  );
};

// ============ 主组件 ============

export const CuteFlowchart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const loopFrames = 180;
  const frameInLoop = frame % loopFrames;

  // 标题动画
  const titleOpacity = interpolate(frameInLoop, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = spring({ frame: frameInLoop, fps, from: -20, to: 0, config: { damping: 12 } });

  // 箭头出现时机
  const arrow1Opacity = interpolate(frameInLoop, [75, 85], [0, 1], { extrapolateRight: 'clamp' });
  const arrow2Opacity = interpolate(frameInLoop, [115, 125], [0, 1], { extrapolateRight: 'clamp' });

  const nodes = [
    { icon: <EmojiIcon emoji="🎙️" size={90} />, label: '硬件采集' },
    { icon: <EmojiIcon emoji="🧠" size={90} />, label: 'AI理解' },
    { icon: <EmojiIcon emoji="🤖" size={90} />, label: 'Agent交互' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 背景装饰圆 */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        // background: 'radial-gradient(ellipse, rgba(220,200,180,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* 流程图主体 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>
          <FlowNode icon={nodes[0].icon} label={nodes[0].label} index={0} frame={frame} fps={fps} />
          <CuteArrow opacity={arrow1Opacity} />
          <FlowNode icon={nodes[1].icon} label={nodes[1].label} index={1} frame={frame} fps={fps} />
          <CuteArrow opacity={arrow2Opacity} />
          <FlowNode icon={nodes[2].icon} label={nodes[2].label} index={2} frame={frame} fps={fps} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
