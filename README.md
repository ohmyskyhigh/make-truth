# MakeTruth - 川普风格Truth Social截图生成器

这是一个创新的社交媒体内容生成工具，专门用于生成川普风格的Truth Social截图。用户可以自定义帖子内容，并通过AI优化功能让内容更贴近川普的独特表达风格。

## 功能特性

- ✍️ 自定义内容编辑
- 🤖 AI内容优化（川普风格转换）
- 👁️ 实时预览
- 📸 截图生成

## 环境要求

- Node.js 18+
- pnpm 8+
- OpenAI API密钥

## 安装与设置

1. 克隆项目后，安装依赖：

```bash
pnpm install
```

2. 配置环境变量：

创建 `.env.local` 文件并添加你的Doubao API密钥：

```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. 运行开发服务器：

```bash
pnpm dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 使用说明

1. 在左侧文本框中输入你想要转换为川普风格的内容
2. 点击"🤖 AI优化为川普风格"按钮，AI将自动优化内容
3. 在右侧预览区域查看效果
4. 点击"📸 生成Truth截图"按钮下载截图

> 注意：AI优化功能通过安全的API路由实现，不会在前端暴露API密钥。

## 技术栈

- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI SDK
- html2canvas-pro

## 部署

可以使用Vercel平台轻松部署此应用。确保在部署时设置环境变量。
