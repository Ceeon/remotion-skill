import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from 'remotion';

const BOX_WIDTH = 140;
const BOX_HEIGHT = 140;
const GAP_X = 40;
const GAP_Y = 40;

// 3列布局，居中计算
const COLS = 3;
const TOTAL_WIDTH = COLS * BOX_WIDTH + (COLS - 1) * GAP_X;
const START_X = (800 - TOTAL_WIDTH) / 2 + 10;
const START_Y = 140;

interface FlowBoxProps {
  title: string;
  desc: string;
  index: number;
  frame: number;
  fps: number;
  total: number;
}

// 布局: 1→2→3→4→5
// 第1行: 1, 2, 3
// 第2行:    4, 5
const positions = [
  { row: 0, col: 0, next: 'right' },  // 1
  { row: 0, col: 1, next: 'right' },   // 2
  { row: 0, col: 2, next: 'down' },   // 3 → 4
  { row: 1, col: 2, next: 'left' },   // 4 → 5
  { row: 1, col: 1, next: 'none' },   // 5 结束
];

const FlowBox: React.FC<FlowBoxProps> = ({ title, desc, index, frame, fps, total }) => {
  // 开头1秒 + 5个格子(每个1秒) + 结尾1秒 = 7秒 @30fps = 210帧
  const loopFrames = 210;
  const frameInLoop = frame % loopFrames;
  const showFrame = index * 40;
  const delayFrame = Math.max(0, frameInLoop - showFrame);

  // 入场动画
  const scale = spring({ frame: delayFrame, fps, from: 0.5, to: 1, damping: 10 });
  const opacity = interpolate(delayFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = spring({ frame: delayFrame, fps, from: 30, to: 0 });

  const pos = positions[index];
  const x = START_X + pos.col * (BOX_WIDTH + GAP_X);
  const y = START_Y + pos.row * (BOX_HEIGHT + GAP_Y);

  const arrowOpacity = delayFrame > 20 ? 1 : 0;

  // 莫兰迪色系
  const colors = [
    { bg: '#e8c4c4', border: '#d4a5a5', accent: '#b89090' },
    { bg: '#b8d4e3', border: '#a3c4d4', accent: '#82a4b5' },
    { bg: '#c4e8c4', border: '#a8d4a8', accent: '#88b888' },
    { bg: '#e3d4b8', border: '#d4c4a3', accent: '#b4a483' },
    { bg: '#d4c4e3', border: '#c4a8d4', accent: '#a488b5' },
  ];
  const color = colors[index] || colors[0];

  // 箭头方向
  const arrowDir = pos.next;

  return (
    <div style={{ position: 'absolute', top: y, left: x }}>
      {/* 右箭头 */}
      {arrowDir === 'right' && (
        <div style={{
          position: 'absolute',
          top: BOX_HEIGHT / 2 - 10,
          left: BOX_WIDTH,
          width: GAP_X,
          height: 20,
          opacity: arrowOpacity,
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1, height: 2, background: '#666' }} />
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M5 9 L13 9 M13 9 L9 5 M13 9 L9 13" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 左箭头 */}
      {arrowDir === 'left' && (
        <div style={{
          position: 'absolute',
          top: BOX_HEIGHT / 2 - 10,
          left: -GAP_X,
          width: GAP_X,
          height: 20,
          opacity: arrowOpacity,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}>
          <div style={{ flex: 1, height: 2, background: '#666' }} />
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M13 9 L5 9 M5 9 L9 5 M5 9 L9 13" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 下箭头 */}
      {arrowDir === 'down' && (
        <div style={{
          position: 'absolute',
          top: BOX_HEIGHT,
          left: BOX_WIDTH / 2 - 1,
          width: 2,
          height: GAP_Y,
          opacity: arrowOpacity,
        }}>
          {/* 线条 */}
          <div style={{ width: '100%', height: '100%', background: '#666' }} />
          {/* 箭头 */}
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ position: 'absolute', bottom: -2, left: -9 }}>
            <path d="M10 3 L10 17 M10 17 L6 12 M10 17 L14 12" stroke="#666" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 卡片 */}
      <div style={{
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        backgroundColor: color.bg,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        boxShadow: `6px 6px 16px rgba(0,0,0,0.12), -3px -3px 10px rgba(255,255,255,0.1)`,
        border: `2px solid ${color.border}`,
        position: 'relative',
      }}>
        {/* 序号 */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 14,
          width: 26,
          height: 26,
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          color: color.accent,
          boxShadow: '2px 2px 5px rgba(0,0,0,0.08)',
        }}>
          {index + 1}
        </div>

        <span style={{
          color: '#4a4a4a',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
          textAlign: 'center',
          padding: '0 8px',
        }}>{title}</span>
        <span style={{
          color: '#7a7a7a',
          fontSize: 10,
          marginTop: 6,
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
          textAlign: 'center',
          padding: '0 8px',
        }}>{desc}</span>
      </div>
    </div>
  );
};

export const SkillsFlowchart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { title: '原理研究', desc: '根基（决定上限）' },
    { title: '热加载', desc: '基础条件（边用边改）' },
    { title: '过程反馈', desc: '用时给反馈' },
    { title: '数据反馈', desc: '发布后数据' },
    { title: '自更新机制', desc: 'AI帮你写skill' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#f5f0eb' }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(200,180,170,0.2) 0%, transparent 60%)',
      }} />

      {/* 标题 */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5a4a42',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        letterSpacing: 6,
      }}>
        Skills 自更新体系
      </div>

      {/* 流程图 */}
      {items.map((item, index) => (
        <FlowBox
          key={index}
          title={item.title}
          desc={item.desc}
          index={index}
          frame={frame}
          fps={fps}
          total={items.length}
        />
      ))}
    </AbsoluteFill>
  );
};
