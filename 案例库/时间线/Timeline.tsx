import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

// 时间线数据
const TIMELINE = [
  { time: '2024 Q1', title: '项目启动', desc: '完成需求分析和架构设计', color: '#3498db' },
  { time: '2024 Q2', title: 'MVP发布', desc: '核心功能上线，开始内测', color: '#2ecc71' },
  { time: '2024 Q3', title: '功能迭代', desc: '新增AI分析和自动化功能', color: '#9b59b6' },
  { time: '2024 Q4', title: '正式发布', desc: '全面上线，用户突破10万', color: '#e67e22' },
];

const TimelineItem: React.FC<{ item: typeof TIMELINE[0]; index: number; frame: number }> = ({ item, index, frame }) => {
  const animDelay = index * 30;
  const opacity = interpolate(frame, [animDelay, animDelay + 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [animDelay, animDelay + 20], [30, 0], { extrapolateRight: 'clamp' });

  const isLeft = index % 2 === 0;
  // 画布宽800，中心线在400，时间点宽16（中心8），左右时间点要对齐到400
  // 左边: left + (-30) + 8 = 400 → left = 422
  // 右边: left + 174 + 8 = 400 → left = 218
  const cardLeft = isLeft ? 422 : 218;

  return (
    <div style={{
      position: 'absolute',
      top: 70 + index * 95,
      left: cardLeft,
      width: 160,
      height: 80,
      opacity,
      transform: `translateY(${translateY}px)`,
    }}>
      {/* 时间点 */}
      <div style={{
        position: 'absolute',
        left: isLeft ? -30 : 174,
        top: 32,
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: item.color,
        border: '3px solid #fff',
        boxShadow: `0 2px 8px ${item.color}40`,
      }} />

      {/* 内容卡片 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: isLeft ? 0 : 20,
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '12px 14px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        border: `1px solid ${item.color}30`,
      }}>
        <div style={{
          fontSize: 12,
          color: item.color,
          fontWeight: 'bold',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}>
          {item.time}
        </div>
        <div style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#333',
          marginTop: 4,
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}>
          {item.title}
        </div>
        <div style={{
          fontSize: 12,
          color: '#666',
          marginTop: 4,
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}>
          {item.desc}
        </div>
      </div>
    </div>
  );
};

const CenterLine: React.FC<{ frame: number }> = ({ frame }) => {
  // 4个节点，间距95，从70开始，总高度约400
  const height = interpolate(frame, [10, 40], [0, 400], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: 95,
      width: 4,
      height,
      backgroundColor: '#ddd',
      transform: 'translateX(-50%)',
      opacity,
      borderRadius: 2,
    }} />
  );
};

export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 中心线 */}
      <CenterLine frame={frame} />

      {/* 时间线节点 */}
      {TIMELINE.map((item, i) => (
        <TimelineItem key={i} item={item} index={i} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};
