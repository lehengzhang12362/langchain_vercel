# Next.js 翻译服务

基于 Next.js 15 + React 19 + Tailwind CSS 构建的现代化翻译前端服务。

## 特性

- ✅ Next.js 15 App Router
- ✅ React 19 Server Components
- ✅ Tailwind CSS 样式
- ✅ API Routes (替代传统后端)
- ✅ Docker 多阶段构建优化
- ✅ 环境变量配置管理
- ✅ 健康检查端点

## 目录结构

```
nextjs-service/
├── app/
│   ├── layout.js              # 根布局
│   ├── page.js                # 主页(翻译界面)
│   ├── globals.css            # 全局样式
│   └── api/
│       ├── translate/
│       │   └── route.js       # 翻译API
│       └── health/
│           └── route.js       # 健康检查API
├── package.json               # 依赖配置
├── next.config.js             # Next.js配置
├── tailwind.config.js         # Tailwind配置
├── postcss.config.js          # PostCSS配置
├── Dockerfile                 # Docker构建
├── .dockerignore              # Docker忽略文件
├── .env.local                 # 本地环境变量
└── .gitignore                 # Git忽略文件
```

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件:

```bash
PYTHON_SERVICE_URL=http://localhost:8000
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## Docker 部署

### 构建镜像

```bash
docker build -t nextjs-translator .
```

### 运行容器

```bash
docker run -p 3000:3000 \
  -e PYTHON_SERVICE_URL=http://python-service:8000 \
  nextjs-translator
```

## API 端点

### POST /api/translate

翻译文本

**请求:**
```json
{
  "text": "I love coding with LangChain!"
}
```

**响应:**
```json
{
  "success": true,
  "result": "我喜欢用LangChain编程!",
  "error": null
}
```

### GET /api/health

健康检查

**响应:**
```json
{
  "status": "healthy",
  "service": "nextjs-translate-service",
  "pythonService": {
    "status": "healthy",
    "service": "langchain-translate"
  },
  "timestamp": "2025-12-18T10:30:00.000Z"
}
```

## 技术栈

- **Next.js 15**: React 框架
- **React 19**: UI 库
- **Tailwind CSS**: 样式框架
- **Node.js 20**: 运行时环境

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| PYTHON_SERVICE_URL | Python LangChain 服务地址 | http://localhost:8000 |
| PORT | 服务端口 | 3000 |
| NODE_ENV | 运行环境 | production |

## 许可证

MIT
