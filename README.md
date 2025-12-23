# AI翻译助手 (Next.js 版本)

基于 **Vercel** 部署的现代化翻译应用,使用 **Next.js + LangChain** 构建。

## 项目架构

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   浏览器    │ ───> │  Next.js Service │ ───> │ Python Service  │
│  (用户界面)  │      │  (Next.js 15)    │      │   (LangChain)   │
│             │ <─── │  - Web前端       │ <─── │  - AI翻译引擎   │
│             │      │  - API Routes    │      │                 │
└─────────────┘      └──────────────────┘      └─────────────────┘
     :3000                  :3000                      :8000
```

### 技术栈

| 服务 | 技术 | 部署平台 |
|------|------|---------|
| **Next.js Service** | Next.js 15 + React 19 + Tailwind CSS | Vercel (推荐) |
| **Python Service** | FastAPI + LangChain + LangServe | Railway / Render / Fly.io |

### 框架特性

- **Next.js App Router**: 使用最新的 App Router 模式
- **React Server Components**: 服务器端渲染优化
- **Tailwind CSS**: 现代化的 UI 样式
- **API Routes**: 内置 API 端点处理
- **Vercel 部署**: 一键部署,自动 CI/CD

## 目录结构

```
.
├── vercel.json                 # Vercel部署配置
├── .env                        # 环境变量
├── .gitignore                  # Git忽略规则
├── DEPLOY_VERCEL.md            # Vercel部署指南
├── DEPLOY_BACKEND.md           # 后端服务部署指南
│
├── python-service/             # Python LangChain服务
│   ├── app.py                  # FastAPI应用(纯LangChain逻辑)
│   └── requirements.txt        # Python依赖
│
└── nextjs-service/             # Next.js Web服务
    ├── package.json            # Node.js依赖
    ├── next.config.js          # Next.js配置
    ├── tailwind.config.js      # Tailwind CSS配置
    ├── postcss.config.js       # PostCSS配置
    ├── .env.local              # 本地环境变量
    ├── .env.example            # 环境变量示例
    └── app/
        ├── layout.js           # 根布局组件
        ├── page.js             # 主页面(翻译界面)
        ├── globals.css         # 全局样式
        └── api/
            ├── translate/
            │   └── route.js    # 翻译API路由
            └── health/
                └── route.js    # 健康检查API路由
```

## 快速开始

### 部署到 Vercel (推荐)

详细步骤请查看 **[Vercel 部署指南](./DEPLOY_VERCEL.md)**

**快速步骤:**
1. 先部署 Python 服务到 Railway/Render ([后端部署指南](./DEPLOY_BACKEND.md))
2. 在 Vercel 导入此仓库
3. 配置环境变量 `PYTHON_SERVICE_URL`
4. 点击部署

### 本地开发

#### 前置要求

- Node.js 20+
- Python 3.11+

#### 1. 启动 Python 服务

```bash
cd python-service
pip install -r requirements.txt

# 设置环境变量
export OPENAI_API_KEY="your-api-key"
export OPENAI_BASE_URL="https://yunwu.ai/v1"

# 启动服务
python app.py
# 服务运行在 http://localhost:8000
```

#### 2. 启动 Next.js 服务

```bash
cd nextjs-service
npm install

# 配置环境变量 (已有 .env.local 文件)
# PYTHON_SERVICE_URL=http://localhost:8000

# 启动开发服务器
npm run dev
```

#### 3. 访问应用

打开浏览器访问: **http://localhost:3000**

## 服务端口 (本地开发)

| 服务 | 端口 | 说明 |
|------|------|------|
| Next.js Service | 3000 | Web界面 + API |
| Python Service | 8000 | LangChain API |

## API接口

### Next.js Service APIs

#### 1. 翻译接口
```http
POST http://localhost:3000/api/translate
Content-Type: application/json

{
  "text": "I love coding with LangChain!"
}
```

**响应示例:**
```json
{
  "result": "我喜欢用LangChain编程!",
  "success": true,
  "error": null
}
```

#### 2. 健康检查
```http
GET http://localhost:3000/api/health
```

**响应示例:**
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

### Python Service APIs(内部调用)

#### LangServe接口
```http
POST http://python-service:8000/translate/invoke
Content-Type: application/json

{
  "input": {
    "text": "Hello world"
  }
}
```

## 开发指南

### 构建生产版本 (本地测试)

```bash
cd nextjs-service
npm run build
npm start
```

### 环境变量配置

#### Next.js 服务 (.env.local)
```bash
# Python 服务地址
PYTHON_SERVICE_URL=http://localhost:8000  # 本地开发
# PYTHON_SERVICE_URL=https://your-python-service.railway.app  # 生产环境
```

#### Python 服务
```bash
# OpenAI 配置
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=https://yunwu.ai/v1
```

## 技术亮点

### Next.js 特性

1. **App Router**: 使用最新的 App Router 架构
2. **Server Components**: 默认服务器组件,优化性能
3. **API Routes**: 内置 API 处理,无需额外后端
4. **Tailwind CSS**: 实用优先的 CSS 框架
5. **Vercel 优化**: 自动 CI/CD,边缘网络加速

### 部署优势

1. **Vercel 平台**
   - 零配置部署
   - 自动 HTTPS
   - 全球 CDN 加速
   - 自动预览部署

2. **微服务架构**
   - 独立部署和扩展
   - 技术栈灵活选择
   - 服务间松耦合

3. **开发体验**
   - 热重载开发模式
   - TypeScript 可选支持
   - ESLint 代码质量检查
   - 快速迭代部署

## 故障排查

### 1. Vercel 部署失败

**检查:**
- 查看 Vercel 部署日志
- 确认 `nextjs-service` 目录结构正确
- 检查 `package.json` 依赖版本

**解决:**
- 在 Vercel 项目设置中配置正确的根目录
- 确保所有环境变量已配置

### 2. API 调用失败

**错误:** 翻译接口返回 500 错误

**检查:**
- Vercel 环境变量 `PYTHON_SERVICE_URL` 是否正确
- Python 服务是否正常运行
- 网络连接是否正常

**解决:**
```bash
# 测试 Python 服务
curl https://your-python-service-url/health

# 检查 Vercel 日志
vercel logs
```

### 3. 本地开发连接问题

**错误:** Next.js 无法连接 Python 服务

**检查:**
- Python 服务是否在端口 8000 运行
- `.env.local` 文件是否正确配置

**解决:**
```bash
# 确认 Python 服务运行
cd python-service
python app.py

# 确认 Next.js 环境变量
cd nextjs-service
cat .env.local
```

### 4. CORS 错误

如果遇到跨域问题,需要在 Python 服务中配置 CORS:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制具体域名
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 部署架构变更

本项目已从 **Docker Compose** 部署方式迁移至 **Vercel + 云服务** 部署:

### 主要变更:
- ✅ Next.js 服务部署到 Vercel (原 Docker)
- ✅ Python 服务部署到 Railway/Render (原 Docker Compose)
- ✅ 移除所有 Dockerfile 和 docker-compose.yml
- ✅ 添加 vercel.json 配置文件
- ✅ 更新环境变量配置方式
- ✅ 添加详细的部署文档

### 优势对比:
| 特性 | Docker Compose | Vercel 部署 |
|------|---------------|------------|
| 部署复杂度 | 需要服务器 + Docker | 零配置,一键部署 |
| CI/CD | 手动配置 | 自动部署 |
| 扩展性 | 手动扩展 | 自动扩展 |
| CDN | 需要额外配置 | 内置全球 CDN |
| HTTPS | 需要配置证书 | 自动 HTTPS |
| 成本 | 服务器费用 | 免费层足够个人项目 |
| 启动时间 | ~30s | ~5s |

### 迁移指南:
如果你之前使用 Docker 部署,请参考:
1. [Vercel 部署指南](./DEPLOY_VERCEL.md)
2. [后端服务部署指南](./DEPLOY_BACKEND.md)

## 后续优化建议

- [ ] 添加 Redis 缓存翻译结果
- [ ] 支持更多翻译语言对
- [ ] 添加用户认证功能
- [ ] 集成 Vercel Analytics 和 Web Vitals
- [ ] 添加单元测试和 E2E 测试
- [ ] 支持批量翻译
- [ ] 添加翻译历史记录
- [ ] 支持 SSR/SSG 优化
- [ ] 添加速率限制和 API 安全
- [ ] 集成 Sentry 错误监控

## 相关文档

- [Vercel 部署指南](./DEPLOY_VERCEL.md) - Next.js 服务部署详细步骤
- [后端服务部署指南](./DEPLOY_BACKEND.md) - Python/Java 服务部署教程
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 文档](https://vercel.com/docs)
- [LangChain 文档](https://python.langchain.com/)

## 许可证

MIT License
