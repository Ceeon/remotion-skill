import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

// 卡片数据
const LEFT_CARD = {
  title: '传统开发',
  color: '#e74c3c',
  items: [
    '📝 手动编写代码',
    '🔄 需重启服务',
    '⏰ 周期长',
    '🐛 调试困难',
  ],
};

const RIGHT_CARD = {
  title: 'AI辅助开发',
  color: '#27ae60',
  items: [
    '🤖 AI生成代码',
    '⚡ 热加载生效',
    '🚀 快速迭代',
    '✨ 智能调试',
  ],
};

const ItemLine: React.FC<{ text: string; index: number; baseFrame: number; color: string }> = ({ text, index, baseFrame, color }) => {
  const animFrame = baseFrame + index * 15;
  const opacity = interpolate(animFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const translateX = interpolate(animFrame, [0, 12], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      opacity,
      transform: `translateX(${translateX}px)`,
      fontSize: 18,
      color: '#333',
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
    }}>
      {text}
    </div>
  );
};

const CompareFlowchart: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFrames = 240;
  const frameInLoop = frame % loopFrames;

  // 左侧卡片入场
  const leftOpacity = interpolate(frameInLoop, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const leftX = interpolate(frameInLoop, [0, 20], [-60, 0], { extrapolateRight: 'clamp' });

  // 右侧卡片入场
  const rightOpacity = interpolate(frameInLoop, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const rightX = interpolate(frameInLoop, [15, 35], [60, 0], { extrapolateRight: 'clamp' });

  // VS 出现
  const vsOpacity = interpolate(frameInLoop, [40, 55], [0, 1], { extrapolateRight: 'clamp' });
  const vsScale = interpolate(frameInLoop, [40, 55], [0.3, 1], { extrapolateRight: 'clamp' });

  // 底部结论
  const resultOpacity = interpolate(frameInLoop, [70, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 左侧卡片 */}
      <div style={{
        position: 'absolute',
        left: 60,
        top: 130,
        width: 280,
        opacity: leftOpacity,
        transform: `translateX(${leftX}px)`,
      }}>
        <div style={{
          backgroundColor: LEFT_CARD.color,
          padding: '16px 24px',
          borderRadius: '20px 20px 0 0',
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}>
          {LEFT_CARD.title}
        </div>
        <div style={{
          backgroundColor: '#fff',
          border: `2px solid ${LEFT_CARD.color}`,
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          {LEFT_CARD.items.map((item, i) => (
            <ItemLine key={i} text={item} index={i} baseFrame={25} color={LEFT_CARD.color} />
          ))}
        </div>
      </div>

      {/* 右侧卡片 */}
      <div style={{
        position: 'absolute',
        right: 60,
        top: 130,
        width: 280,
        opacity: rightOpacity,
        transform: `translateX(${rightX}px)`,
      }}>
        <div style={{
          backgroundColor: RIGHT_CARD.color,
          padding: '16px 24px',
          borderRadius: '20px 20px 0 0',
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}>
          {RIGHT_CARD.title}
        </div>
        <div style={{
          backgroundColor: '#fff',
          border: `2px solid ${RIGHT_CARD.color}`,
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          {RIGHT_CARD.items.map((item, i) => (
            <ItemLine key={i} text={item} index={i} baseFrame={40} color={RIGHT_CARD.color} />
          ))}
        </div>
      </div>

      {/* VS */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 220,
        transform: 'translateX(-50%)',
        opacity: vsOpacity,
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          transform: `scale(${vsScale})`,
        }}>
          VS
        </div>
      </div>

      {/* 底部结论 */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        textAlign: 'center',
        opacity: resultOpacity,
      }}>
        <div style={{
          display: 'inline-block',
          padding: '16px 40px',
          backgroundColor: '#fff',
          border: '2px solid #27ae60',
          borderRadius: 30,
          fontSize: 22,
          color: '#27ae60',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(39,174,96,0.2)',
        }}>
          AI 辅助开发效率提升 10x
        </div>
      </div>
    </AbsoluteFill>
  );
};

export { CompareFlowchart };
