import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

// 数据配置
const DATA = [
  { label: 'AI生成', value: 65, color: '#3498db' },
  { label: '人工优化', value: 25, color: '#2ecc71' },
  { label: '其他', value: 10, color: '#95a5a6' },
];

const CIRCLE_RADIUS = 90;
const STROKE_WIDTH = 28;
const CENTER_X = 200;
const CENTER_Y = 220;

// 计算弧形路径
const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
  const startRad = (startAngle - 90) * Math.PI / 180;
  const endRad = (endAngle - 90) * Math.PI / 180;
  const x1 = CENTER_X + radius * Math.cos(startRad);
  const y1 = CENTER_Y + radius * Math.sin(startRad);
  const x2 = CENTER_X + radius * Math.cos(endRad);
  const y2 = CENTER_Y + radius * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
};

const PieSegment: React.FC<{ data: typeof DATA[0]; startAngle: number; frame: number; index: number }> = ({ data, startAngle, frame, index }) => {
  const endAngle = startAngle + data.value * 3.6;
  const animFrame = index * 30;
  const progress = interpolate(frame, [animFrame, animFrame + 30], [0, 1], { extrapolateRight: 'clamp' });
  const currentEndAngle = startAngle + (endAngle - startAngle) * progress;

  if (progress <= 0) return null;

  const path = getArcPath(startAngle, currentEndAngle, CIRCLE_RADIUS);

  return (
    <svg width="500" height="400" style={{ position: 'absolute', top: 0, left: 0 }}>
      <path
        d={path}
        fill="none"
        stroke={data.color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </svg>
  );
};

const LegendItem: React.FC<{ data: typeof DATA[0]; index: number; frame: number }> = ({ data, index, frame }) => {
  const animFrame = 40 + index * 20;
  const opacity = interpolate(frame, [animFrame, animFrame + 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateX = interpolate(frame, [animFrame, animFrame + 15], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      opacity,
      transform: `translateX(${translateX}px)`,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      lineHeight: 1,
      height: 40,
      marginBottom: 30,
    }}>
      <div style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: data.color,
      }} />
      <div style={{
        fontSize: 18,
        color: '#333',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      }}>
        {data.label}
      </div>
      <div style={{
        fontSize: 18,
        color: '#666',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      }}>
        {data.value}%
      </div>
    </div>
  );
};

const CenterText: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [60, 80], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: CENTER_X,
      top: CENTER_Y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
      }}>
        65%
      </div>
      <div style={{
        fontSize: 16,
        color: '#666',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      }}>
        AI生成占比
      </div>
    </div>
  );
};

export const PieChart: React.FC = () => {
  const frame = useCurrentFrame();

  // 计算起始角度
  let currentAngle = 0;
  const segments = DATA.map(d => {
    const start = currentAngle;
    currentAngle += d.value * 3.6;
    return { data: d, startAngle: start };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 环形图 - 居左 */}
      <div style={{
        position: 'absolute',
        left: 100,
        top: 100,
        width: 400,
        height: 440,
      }}>
        {segments.map((seg, i) => (
          <PieSegment
            key={i}
            data={seg.data}
            startAngle={seg.startAngle}
            frame={frame}
            index={i}
          />
        ))}
        <CenterText frame={frame} />
      </div>

      {/* 图例 - 居右，垂直居中 */}
      <div style={{
        position: 'absolute',
        left: 520,
        top: 300,
      }}>
        {DATA.map((d, i) => (
          <LegendItem key={i} data={d} index={i} frame={frame} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
