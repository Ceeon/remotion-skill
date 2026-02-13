import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

// 代码内容
const CODE_LINES = [
  { type: 'keyword', text: 'import' },
  { type: 'text', text: ' { useState } ' },
  { type: 'keyword', text: 'from' },
  { type: 'string', text: "'react'" },
  { type: 'punctuation', text: ';' },
  { type: 'empty', text: '' },
  { type: 'keyword', text: 'function' },
  { type: 'function', text: ' Counter' },
  { type: 'punctuation', text: '()' },
  { type: 'punctuation', text: ' {' },
  { type: 'empty', text: '' },
  { type: 'keyword', text: 'const' },
  { type: 'variable', text: ' [count' },
  { type: 'punctuation', text: ',' },
  { type: 'function', text: ' setCount' },
  { type: 'variable', text: '] ' },
  { type: 'operator', text: '=' },
  { type: 'function', text: ' useState' },
  { type: 'punctuation', text: '(' },
  { type: 'number', text: '0' },
  { type: 'punctuation', text: ')' },
  { type: 'punctuation', text: ';' },
  { type: 'empty', text: '' },
  { type: 'keyword', text: ' return ' },
  { type: 'punctuation', text: '(' },
  { type: 'empty', text: '' },
  { type: 'punctuation', text: '<' },
  { type: 'tag', text: 'button' },
  { type: 'punctuation', text: '>' },
  { type: 'text', text: '点击次数: ' },
  { type: 'punctuation', text: '{' },
  { type: 'variable', text: 'count' },
  { type: 'punctuation', text: '}' },
  { type: 'punctuation', text: '</' },
  { type: 'tag', text: 'button' },
  { type: 'punctuation', text: '>' },
  { type: 'punctuation', text: ');' },
  { type: 'empty', text: '' },
  { type: 'punctuation', text: '}' },
];

// 颜色配置
const COLORS = {
  keyword: '#0000ff',
  string: '#a31515',
  function: '#795e26',
  variable: '#001080',
  number: '#098658',
  operator: '#000000',
  punctuation: '#000000',
  tag: '#800000',
  text: '#333333',
};

const CodeLine: React.FC<{ line: typeof CODE_LINES[0]; index: number; frame: number }> = ({ line, index, frame }) => {
  if (line.type === 'empty') {
    return <div style={{ height: 24 }} />;
  }

  const delay = index * 5;
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      opacity,
      fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
      fontSize: 15,
      lineHeight: 1.6,
    }}>
      <span style={{ color: COLORS[line.type as keyof typeof COLORS] || '#d4d4d4' }}>{line.text}</span>
    </div>
  );
};

const TitleBar: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      opacity,
    }}>
      <div style={{ display: 'flex', gap: 8, marginRight: 12 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
      </div>
      <div style={{
        flex: 1,
        textAlign: 'center',
        color: '#666',
        fontSize: 13,
      }}>
        App.tsx — React
      </div>
      <div style={{ width: 60 }} />
    </div>
  );
};

const LineNumbers: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: 30,
      top: 80,
      opacity,
      fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
      fontSize: 15,
      lineHeight: 1.6,
      color: '#858585',
      textAlign: 'right',
    }}>
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} style={{ height: 24 }}>{i + 1}</div>
      ))}
    </div>
  );
};

export const CodeShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const contentOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 边框容器 */}
      <div style={{
        position: 'absolute',
        top: 80,
        left: 30,
        right: 30,
        bottom: 30,
        backgroundColor: '#fafafa',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <TitleBar frame={frame} />
        <LineNumbers frame={frame} />

        <div style={{
          position: 'absolute',
          left: 70,
          top: 80,
          opacity: contentOpacity,
        }}>
          {CODE_LINES.map((line, i) => (
            <CodeLine key={i} line={line} index={i} frame={frame} />
          ))}
        </div>
      </div>

    </AbsoluteFill>
  );
};
