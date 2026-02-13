import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from 'remotion';

// ============ 配置 ============

const CANVAS_W = 800;
const CANVAS_H = 600;
const CENTER_X = CANVAS_W / 2;
const CENTER_Y = CANVAS_H / 2 + 10;
const RADIUS = 180; // 三个节点围绕中心的半径
const NODE_SIZE = 120; // 节点圆的直径

// 三个节点的角度位置（从顶部左开始，顺时针）
// -150° = 左上, -30° = 右上, 90° = 下方
const ANGLES = [-150, -30, 90];

const getNodePos = (angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS * Math.cos(rad),
    y: CENTER_Y + RADIUS * Math.sin(rad),
  };
};

// ============ 圆形节点 ============

interface CycleNodeProps {
  emoji: string;
  label: string;
  angleDeg: number;
  index: number;
  frame: number;
  fps: number;
}

const CycleNode: React.FC<CycleNodeProps> = ({ emoji, label, angleDeg, index, frame, fps }) => {
  const loopFrames = 240;
  const frameInLoop = frame % loopFrames;
  const showFrame = 20 + index * 35;
  const delayFrame = Math.max(0, frameInLoop - showFrame);

  const scale = spring({ frame: delayFrame, fps, from: 0.2, to: 1, config: { damping: 8 } });
  const opacity = interpolate(delayFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 呼吸浮动
  const breathFrame = Math.max(0, delayFrame - 30);
  const float = Math.sin(breathFrame * 0.06 + index * 2) * 3;

  const pos = getNodePos(angleDeg);

  return (
    <div style={{
      position: 'absolute',
      left: pos.x - NODE_SIZE / 2,
      top: pos.y - NODE_SIZE / 2,
      width: NODE_SIZE,
      height: NODE_SIZE,
      opacity,
      transform: `translateY(${float}px) scale(${scale})`,
    }}>
      {/* 外圈 */}
      <div style={{
        width: NODE_SIZE,
        height: NODE_SIZE,
        borderRadius: '50%',
        background: '#fff',
        border: '3px solid #3498db',
        boxShadow: '0 4px 16px rgba(52,152,219,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}>
        <div style={{ fontSize: 42, lineHeight: 1 }}>{emoji}</div>
        <div style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
          letterSpacing: 1,
        }}>{label}</div>
      </div>
    </div>
  );
};

// ============ 弧形箭头（SVG） ============

interface CurvedArrowProps {
  fromAngle: number;
  toAngle: number;
  frame: number;
  index: number;
}

const CurvedArrow: React.FC<CurvedArrowProps> = ({ fromAngle, toAngle, frame, index }) => {
  const loopFrames = 240;
  const frameInLoop = frame % loopFrames;
  const showFrame = 55 + index * 35;
  const opacity = interpolate(frameInLoop, [showFrame, showFrame + 20], [0, 1], { extrapolateRight: 'clamp' });

  // 箭头起止点：从节点边缘出发，偏移一点留间隙
  const gap = NODE_SIZE / 2 + 14; // 节点半径 + 间距
  const arrowOffset = 22; // 箭头从节点边缘偏移的角度

  const startAngleDeg = fromAngle + arrowOffset;
  const endAngleDeg = toAngle - arrowOffset;

  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;

  // 起点和终点
  const sx = CENTER_X + RADIUS * Math.cos(startRad);
  const sy = CENTER_Y + RADIUS * Math.sin(startRad);
  const ex = CENTER_X + RADIUS * Math.cos(endRad);
  const ey = CENTER_Y + RADIUS * Math.sin(endRad);

  // 控制点：向外弯曲（顺时针方向，处理角度跨越问题）
  let adjustedEnd = endAngleDeg;
  if (adjustedEnd < startAngleDeg) adjustedEnd += 360;
  const midAngle = (startAngleDeg + adjustedEnd) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const bulge = RADIUS + 55;
  const cx1 = CENTER_X + bulge * Math.cos(midRad);
  const cy1 = CENTER_Y + bulge * Math.sin(midRad);

  // 箭头方向（终点处的切线方向）
  const arrowLen = 18;
  const dx = ex - cx1;
  const dy = ey - cy1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  // 垂直方向
  const px = -uy;
  const py = ux;

  const tip1x = ex - ux * arrowLen + px * 9;
  const tip1y = ey - uy * arrowLen + py * 9;
  const tip2x = ex - ux * arrowLen - px * 9;
  const tip2y = ey - uy * arrowLen - py * 9;

  return (
    <svg
      width={CANVAS_W}
      height={CANVAS_H}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      style={{ position: 'absolute', top: 0, left: 0, opacity }}
    >
      {/* 弧线 */}
      <path
        d={`M${sx},${sy} Q${cx1},${cy1} ${ex},${ey}`}
        stroke="#3498db"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* 箭头 */}
      <polygon
        points={`${ex},${ey} ${tip1x},${tip1y} ${tip2x},${tip2y}`}
        fill="#3498db"
      />
    </svg>
  );
};

// ============ 背景光点 ============

const GlowDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [
    { x: 80, y: 80, size: 12, speed: 0.04 },
    { x: 720, y: 100, size: 10, speed: 0.05 },
    { x: 650, y: 480, size: 14, speed: 0.035 },
    { x: 120, y: 500, size: 8, speed: 0.06 },
    { x: 400, y: 50, size: 10, speed: 0.045 },
    { x: 700, y: 300, size: 11, speed: 0.038 },
    { x: 60, y: 300, size: 9, speed: 0.055 },
  ];

  return (
    <>
      {dots.map((dot, i) => {
        const pulse = interpolate(
          Math.sin(frame * dot.speed + i * 1.5),
          [-1, 1],
          [0.2, 0.6]
        );
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dot.x - dot.size,
              top: dot.y - dot.size,
              width: dot.size * 2,
              height: dot.size * 2,
              borderRadius: '50%',
              // background: 'radial-gradient(circle, rgba(52,152,219,0.6), transparent 70%)',
              opacity: pulse,
            }}
          />
        );
      })}
    </>
  );
};

// ============ 主组件 ============

export const CycleFlowchart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const loopFrames = 240;
  const frameInLoop = frame % loopFrames;

  // 中心标题动画
  const titleDelay = Math.max(0, frameInLoop - 80);
  const titleScale = spring({ frame: titleDelay, fps, from: 0.5, to: 1, config: { damping: 10 } });
  const titleOpacity = interpolate(frameInLoop, [80, 100], [0, 1], { extrapolateRight: 'clamp' });

  const nodes = [
    { emoji: '🤖', label: 'AI识别', angle: ANGLES[0] },
    { emoji: '👤', label: '你审核', angle: ANGLES[1] },
    { emoji: '📋', label: '反馈学习', angle: ANGLES[2] },
  ];

  // 箭头：0→1, 1→2, 2→0
  const arrows = [
    { from: ANGLES[0], to: ANGLES[1] },
    { from: ANGLES[1], to: ANGLES[2] },
    { from: ANGLES[2], to: ANGLES[0] },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: '#fff',
    }}>
      {/* 背景光点 */}
      {/* <GlowDots frame={frame} /> */}

      {/* 弧形箭头 */}
      {arrows.map((arrow, i) => (
        <CurvedArrow
          key={i}
          fromAngle={arrow.from}
          toAngle={arrow.to}
          frame={frame}
          index={i}
        />
      ))}

      {/* 节点 */}
      {nodes.map((node, i) => (
        <CycleNode
          key={i}
          emoji={node.emoji}
          label={node.label}
          angleDeg={node.angle}
          index={i}
          frame={frame}
          fps={fps}
        />
      ))}
    </AbsoluteFill>
  );
};
