import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from 'remotion';

export const StaticVsDynamic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = 240;
  const loopFrame = frame % totalFrames;

  const appear = (delay: number) =>
    spring({ frame: loopFrame - delay, fps, config: { damping: 10 } });

  const fadeIn = (delay: number) =>
    interpolate(loopFrame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Title
  const titleScale = appear(0);

  // Left box (static)
  const leftAppear = appear(20);
  // Right box (dynamic)
  const rightAppear = appear(40);

  // Comparison rows
  const row1 = appear(70);
  const row2 = appear(90);
  const row3 = appear(110);

  // Right side animation: arrows animate
  const arrowProgress = interpolate(loopFrame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Highlight pulse on right side
  const pulse = interpolate(loopFrame, [130, 150, 170], [1, 1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#f8f6f3', fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif', padding: 40 }}>
      {/* Title */}
      <div style={{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 700,
        color: '#2d2d2d',
        marginBottom: 30,
        transform: `scale(${titleScale})`,
      }}>
        动画比静态图多了什么？
      </div>

      <div style={{ display: 'flex', gap: 30, flex: 1, alignItems: 'flex-start' }}>
        {/* Left - Static */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          opacity: leftAppear,
          transform: `translateY(${(1 - leftAppear) * 20}px)`,
          border: '2px solid #e0dbd5',
        }}>
          <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 600, color: '#999', marginBottom: 20 }}>
            静态图 📊
          </div>
          <div style={{
            background: '#f5f3f0',
            borderRadius: 10,
            padding: 20,
            textAlign: 'center',
            fontSize: 20,
            color: '#aaa',
            marginBottom: 16,
          }}>
            A ── B ── C
            <div style={{ fontSize: 14, marginTop: 8, color: '#bbb' }}>（关系靠猜）</div>
          </div>

          {/* Comparison points - left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            <div style={{ opacity: row1, fontSize: 16, color: '#c0392b', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>❌</span> <span>逻辑：谁连谁？</span>
            </div>
            <div style={{ opacity: row2, fontSize: 16, color: '#c0392b', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>❌</span> <span>顺序：从哪看起？</span>
            </div>
            <div style={{ opacity: row3, fontSize: 16, color: '#c0392b', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>❌</span> <span>重点：全都一样大</span>
            </div>
          </div>
        </div>

        {/* Right - Dynamic */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          opacity: rightAppear,
          transform: `scale(${pulse}) translateY(${(1 - rightAppear) * 20}px)`,
          border: '2px solid #27ae60',
          boxShadow: '0 4px 20px rgba(39,174,96,0.1)',
        }}>
          <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 600, color: '#2d2d2d', marginBottom: 20 }}>
            动画 🎬
          </div>
          <div style={{
            background: '#f0f9f4',
            borderRadius: 10,
            padding: 20,
            textAlign: 'center',
            fontSize: 20,
            color: '#2d2d2d',
            marginBottom: 16,
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ opacity: interpolate(arrowProgress, [0, 0.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>A</span>
              <span style={{ opacity: interpolate(arrowProgress, [0.15, 0.4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), color: '#27ae60', fontWeight: 700 }}> ─▶ </span>
              <span style={{ opacity: interpolate(arrowProgress, [0.3, 0.55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>B</span>
              <span style={{ opacity: interpolate(arrowProgress, [0.5, 0.75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), color: '#27ae60', fontWeight: 700 }}> ─▶ </span>
              <span style={{ opacity: interpolate(arrowProgress, [0.7, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>C</span>
            </div>
            <div style={{ fontSize: 14, marginTop: 8, color: '#27ae60' }}>（演给你看）</div>
          </div>

          {/* Comparison points - right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            <div style={{ opacity: row1, fontSize: 16, color: '#27ae60', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✅</span> <span>逻辑：箭头直接演</span>
            </div>
            <div style={{ opacity: row2, fontSize: 16, color: '#27ae60', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✅</span> <span>顺序：依次弹入</span>
            </div>
            <div style={{ opacity: row3, fontSize: 16, color: '#27ae60', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✅</span> <span>重点：高亮+放大</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
