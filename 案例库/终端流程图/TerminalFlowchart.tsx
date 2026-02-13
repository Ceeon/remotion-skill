import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

// ============ 终端内容 ============

const TERMINAL_LINES = [
  { prefix: '➜', color: '#28a745', text: '~/projects/aios' },
  { prefix: '➜', color: '#28a745', text: 'git status' },
  { prefix: '', color: '#dc3545', text: 'On branch main' },
  { prefix: '', color: '#dc3545', text: 'Your branch is up to date with \'origin/main\'.' },
  { prefix: '➜', color: '#28a745', text: 'git add .' },
  { prefix: '➜', color: '#28a745', text: 'git commit -m "添加新功能"' },
  { prefix: '', color: '#ffc107', text: '[main a1b2c3d] 添加新功能' },
  { prefix: '', color: '#ffc107', text: ' 2 files changed, 50 insertions(+)' },
  { prefix: '➜', color: '#28a745', text: 'git push' },
  { prefix: '', color: '#6f42c1', text: 'Enumerating objects: 5, done.' },
  { prefix: '', color: '#6f42c1', text: 'Writing objects: 100% (5/5), 420 bytes | 420.00 KiB/s, done.' },
  { prefix: '', color: '#6f42c1', text: 'To github.com:user/aios.git' },
  { prefix: '', color: '#6f42c1', text: '   a1b2c3d..d4e5f6g  main -> main' },
  { prefix: '➜', color: '#28a745', text: '~' },
];

// 计算每行需要的帧数
const getLineDuration = (text: string) => {
  return Math.ceil(text.length * 1.5) + 8;
};

interface TerminalLineProps {
  line: { prefix: string; color: string; text: string };
  index: number;
  frame: number;
  currentLineIndex: number;
  currentLineProgress: number;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ line, index, frame, currentLineIndex, currentLineProgress }) => {
  if (index > currentLineIndex) return null;

  const totalChars = line.prefix.length + line.text.length;
  let charsToShow: number;
  if (index === currentLineIndex) {
    charsToShow = Math.min(totalChars, Math.floor(currentLineProgress * totalChars));
  } else {
    charsToShow = totalChars;
  }

  let displayPrefix = line.prefix;
  let displayText = '';

  if (charsToShow <= line.prefix.length) {
    displayPrefix = line.prefix.slice(0, charsToShow);
  } else {
    displayPrefix = line.prefix;
    displayText = line.text.slice(0, charsToShow - line.prefix.length);
  }

  const cursorOpacity = index === currentLineIndex ? (Math.sin(frame * 0.3) > 0 ? 1 : 0.3) : 0;

  return (
    <div style={{
      position: 'absolute',
      left: 40,
      top: 80 + index * 28,
      fontFamily: "'SF Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      fontSize: 16,
      lineHeight: 1.5,
      display: 'flex',
      alignItems: 'center',
    }}>
      <span style={{ color: line.color, marginRight: 8 }}>{displayPrefix}</span>
      <span style={{ color: '#333' }}>{displayText}</span>
      {index === currentLineIndex && charsToShow < totalChars && (
        <span style={{
          display: 'inline-block',
          width: 8,
          height: 16,
          backgroundColor: '#333',
          marginLeft: 2,
          opacity: cursorOpacity,
        }} />
      )}
    </div>
  );
};

const TitleBar: React.FC<{ frame: number }> = ({ frame }) => {
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      opacity: titleOpacity,
    }}>
      <div style={{ display: 'flex', gap: 8, marginRight: 12 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
      </div>
      <div style={{
        flex: 1,
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
      }}>
        Terminal — zsh
      </div>
      <div style={{ width: 60 }} />
    </div>
  );
};

export const TerminalFlowchart: React.FC = () => {
  const frame = useCurrentFrame();

  const lineDurations = TERMINAL_LINES.map(line => getLineDuration(line.text));
  const loopFrames = 300;
  const frameInLoop = frame % loopFrames;

  let elapsedFrames = 0;
  let currentLineIndex = -1;
  let currentLineProgress = 0;

  for (let i = 0; i < TERMINAL_LINES.length; i++) {
    if (frameInLoop < elapsedFrames + lineDurations[i]) {
      currentLineIndex = i;
      currentLineProgress = (frameInLoop - elapsedFrames) / lineDurations[i];
      break;
    }
    elapsedFrames += lineDurations[i];
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 边框效果 */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        border: '1px solid #eee',
        borderRadius: 12,
        backgroundColor: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }} />

      <TitleBar frame={frame} />

      {TERMINAL_LINES.map((line, i) => (
        <TerminalLine
          key={i}
          line={line}
          index={i}
          frame={frame}
          currentLineIndex={currentLineIndex}
          currentLineProgress={currentLineProgress}
        />
      ))}
    </AbsoluteFill>
  );
};
