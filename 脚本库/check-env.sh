#!/bin/bash
# Remotion Skill 环境自检 + 自动修复
# 用法: bash check-env.sh

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "🔍 检查 Remotion Skill 环境..."
echo ""

# 1. Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "   请先安装: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# 2. package.json
if [ ! -f "$SKILL_DIR/package.json" ]; then
    echo "❌ package.json 不存在"
    exit 1
fi
echo "✅ package.json"

# 3. node_modules（没有就自动装）
if [ ! -d "$SKILL_DIR/node_modules" ]; then
    echo "⚠️  node_modules 不存在，正在自动安装..."
    cd "$SKILL_DIR" && npm install --silent
    if [ $? -eq 0 ]; then
        echo "✅ 依赖安装完成"
    else
        echo "❌ 依赖安装失败"
        exit 1
    fi
else
    echo "✅ node_modules"
fi

# 4. src/index.tsx
if [ ! -f "$SKILL_DIR/src/index.tsx" ]; then
    echo "⚠️  src/index.tsx 不存在"
else
    echo "✅ src/index.tsx"
fi

# 5. 案例库
TEMPLATE_COUNT=$(ls -d "$SKILL_DIR/案例库"/*/ 2>/dev/null | wc -l | tr -d ' ')
echo "✅ 案例库: ${TEMPLATE_COUNT} 个模板"

echo ""
echo "🟢 环境就绪，可以直接渲染"
echo ""
echo "渲染命令示例:"
echo "  cd $SKILL_DIR"
echo "  npx remotion render src/index.tsx <composition-id> /输出路径/xxx.gif --codec=gif --every-nth-frame=2"
echo ""
echo "可用 composition-id:"
grep -o 'id="[^"]*"' "$SKILL_DIR/src/index.tsx" 2>/dev/null | sed 's/id="//;s/"//' | while read id; do
    echo "  - $id"
done
