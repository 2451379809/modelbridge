# ⚡ ModelBridge

> AI 大模型聚合接入平台 · 支持 OpenAI / Claude / Gemini / 中转代理

一站式配置和管理多个 AI 模型供应商，内置对话界面与图片生成，支持 Vercel 一键部署。

---

## ✨ 功能特性

- **统一接入** — OpenAI、Anthropic Claude、Google Gemini、任意兼容 OpenAI 协议的中转服务
- **实时对话** — 流式输出、Markdown 渲染、代码高亮、多会话历史管理
- **图片生成** — 支持 DALL-E 3 等图像模型，多尺寸多风格
- **可视化管理** — 供应商 / 模型 / API Key 增删改查，一键启用禁用
- **安全鉴权** — iron-session JWT 保护，API Key 数据库存储
- **响应式布局** — PC 宽屏侧边栏 + 移动端抽屉菜单

---

## 🚀 快速部署（Vercel）

### 方法一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/modelbridge)

### 方法二：手动部署

1. **Fork 本项目** 到你的 GitHub

2. **在 Vercel 导入仓库**
   - 访问 [vercel.com](https://vercel.com) → New Project → 选择你 Fork 的仓库

3. **配置环境变量**（在 Vercel Project Settings → Environment Variables）：

   | 变量名 | 必填 | 说明 |
   |--------|------|------|
   | `SESSION_SECRET` | ✅ | 32位随机字符串，用于加密 Session |
   | `ADMIN_USERNAME` | ✅ | 管理员登录用户名 |
   | `ADMIN_PASSWORD` | ✅ | 管理员登录密码 |
   | `DATABASE_URL` | ✅ | 数据库连接字符串 |
   | `NEXT_PUBLIC_APP_NAME` | ❌ | 站点名称，默认 ModelBridge |

4. **数据库选择**：
   - **推荐：Neon Postgres（免费）**
     - 访问 [neon.tech](https://neon.tech) 创建免费数据库
     - 复制连接字符串填入 `DATABASE_URL`
   - **本地开发 SQLite**：`DATABASE_URL="file:./dev.db"`

5. **点击 Deploy** — 等待部署完成即可访问

---

## 💻 本地开发

```bash
# 克隆项目
git clone https://github.com/yourname/modelbridge
cd modelbridge

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填写必要配置

# 初始化数据库
pnpm db:push

# （可选）填充示例数据
pnpm db:seed

# 启动开发服务器
pnpm dev
# 访问 http://localhost:3000
```

---

## 📖 使用指南

### 第一步：添加供应商

1. 登录控制台（默认 `admin` / `admin123456`）
2. 前往 **供应商管理** → **添加供应商**
3. 选择预设（OpenAI / Claude / Gemini）或自定义
4. 填入 **API Base URL** 和 **API Key**

### 第二步：添加模型

1. 前往 **模型管理** → **添加模型**
2. 选择所属供应商
3. 填入模型 ID（如 `gpt-4o`）和显示名称
4. 选择模型类型（对话 / 图像 / 嵌入）

### 第三步：开始使用

- **对话**：进入 **💬 对话** 页，选择模型，开始聊天
- **图片生成**：进入 **🎨 图片生成** 页，输入描述词

---

## 🗂️ 项目结构

```
modelbridge/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # 首页（Landing Page）
│   │   ├── login/page.tsx           # 登录页
│   │   ├── dashboard/
│   │   │   ├── layout.tsx           # 后台布局（侧边栏）
│   │   │   ├── page.tsx             # 工作台概览
│   │   │   ├── chat/page.tsx        # 对话界面（流式输出）
│   │   │   ├── image/page.tsx       # 图片生成
│   │   │   ├── providers/page.tsx   # 供应商管理
│   │   │   ├── models/page.tsx      # 模型管理
│   │   │   └── settings/page.tsx    # 系统设置
│   │   └── api/
│   │       ├── auth/login/route.ts  # 登录
│   │       ├── auth/logout/route.ts # 登出
│   │       ├── providers/route.ts   # 供应商 CRUD
│   │       ├── models/route.ts      # 模型 CRUD
│   │       ├── chat/route.ts        # 聊天流式接口
│   │       ├── image/route.ts       # 图片生成接口
│   │       ├── sessions/route.ts    # 会话管理
│   │       └── settings/route.ts   # 站点设置
│   ├── lib/
│   │   ├── db.ts                    # Prisma 客户端
│   │   ├── session.ts               # iron-session 配置
│   │   └── ai.ts                    # AI 路由核心逻辑
│   └── middleware.ts                # 路由鉴权中间件
├── prisma/
│   ├── schema.prisma                # 数据库模型
│   └── seed.ts                      # 初始数据
├── .env.example                     # 环境变量模板
└── README.md
```

---

## 🔌 支持的供应商

| 供应商 | 类型 | 对话 | 图像 | 备注 |
|--------|------|------|------|------|
| OpenAI | openai | ✅ | ✅ | GPT-4o, DALL-E 3 |
| Anthropic | claude | ✅ | ❌ | Claude Sonnet/Opus |
| Google Gemini | gemini | ✅ | ❌ | 通过 OpenAI 兼容接口 |
| 中转代理 | proxy | ✅ | ✅ | 兼容 OpenAI 协议 |
| 自定义 | openai | ✅ | ✅ | 任意兼容接口 |

---

## 🛠 技术栈

- **框架**: Next.js 14 App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS（自定义 CSS 变量）
- **数据库**: Prisma + SQLite（开发）/ Neon Postgres（生产）
- **鉴权**: iron-session
- **AI SDK**: openai (npm)
- **部署**: Vercel

---

## 📄 License

MIT © 2025 ModelBridge
