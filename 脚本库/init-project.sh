#!/bin/bash
# Remotion 项目初始化脚本

echo "检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js 已安装: $(node --version)"
echo "✅ npm 已安装: $(npm --version)"

# 创建项目目录
PROJECT_NAME=${1:-my-remotion}
echo ""
echo "创建项目: $PROJECT_NAME"

mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# 创建 package.json
cat > package.json << 'EOF'
{
  "name": "remotion-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "remotion dev src/index.tsx",
    "build": "remotion render src/index.tsx main out.gif"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
EOF

# 创建 src 目录和入口文件
mkdir -p src
cat > src/index.tsx << 'EOF'
import { Composition, registerRoot } from 'remotion';
import React from 'react';

const MyVideo: React.FC = () => {
  return (
    <Composition
      id="main"
      durationInFrames={150}
      fps={30}
      width={800}
      height={600}
      component={({}) => null}
    />
  );
};

registerRoot(MyVideo);
EOF

# 创建 tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  },
  "include": ["src"]
}
EOF

echo ""
echo "✅ 项目结构已创建"
echo ""
echo "下一步:"
echo "1. cd $PROJECT_NAME"
echo "2. npm install"
echo "3. npm run dev"
