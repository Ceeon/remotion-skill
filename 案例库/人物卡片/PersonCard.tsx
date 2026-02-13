import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

// 人物数据
const PEOPLE = [
  {
    name: '张三',
    role: '技术负责人',
    desc: '10年开发经验，擅长架构设计',
    avatar: '👨‍💻',
    color: '#3498db',
  },
  {
    name: '李四',
    role: '产品经理',
    desc: '深耕AI产品多年，用户思维强',
    avatar: '👩‍💼',
    color: '#e74c3c',
  },
  {
    name: '王五',
    role: '算法工程师',
    desc: '专注大模型应用与优化',
    avatar: '🧑‍🔬',
    color: '#2ecc71',
  },
];

const PersonCardItem: React.FC<{ person: typeof PEOPLE[0]; index: number; frame: number }> = ({ person, index, frame }) => {
  const animDelay = index * 25;
  const opacity = interpolate(frame, [animDelay, animDelay + 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [animDelay, animDelay + 20], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: 60 + index * 240,
      top: 150,
      width: 200,
      opacity,
      transform: `translateY(${translateY}px)`,
      textAlign: 'center',
    }}>
      {/* 头像 */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        border: `4px solid ${person.color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50,
        margin: '0 auto',
        boxShadow: `0 4px 12px ${person.color}30`,
      }}>
        {person.avatar}
      </div>

      {/* 名字 */}
      <div style={{
        marginTop: 16,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      }}>
        {person.name}
      </div>

      {/* 职位 */}
      <div style={{
        marginTop: 4,
        fontSize: 14,
        color: person.color,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        fontWeight: 500,
      }}>
        {person.role}
      </div>

      {/* 描述 */}
      <div style={{
        marginTop: 12,
        fontSize: 13,
        color: '#666',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        lineHeight: 1.5,
      }}>
        {person.desc}
      </div>
    </div>
  );
};

export const PersonCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {PEOPLE.map((person, i) => (
        <PersonCardItem key={i} person={person} index={i} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};
