# Vercel 部署指南

本项目已配置为使用 Vercel 部署 Next.js 前端应用。

## 部署步骤

### 1. 准备工作

首先需要部署后端服务（Python 服务），推荐使用以下平台：
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [AWS/Azure/GCP](https://aws.amazon.com/)

详见 [后端服务部署指南](./DEPLOY_BACKEND.md)

### 2. 部署到 Vercel

#### 方法一：通过 Vercel Dashboard（推荐）

1. 访问 [Vercel](https://vercel.com/) 并登录
2. 点击 "Add New Project"
3. 导入你的 Git 仓库
4. Vercel 会自动检测 Next.js 项目
5. 配置环境变量：
   - `PYTHON_SERVICE_URL`: Python 服务的 URL（例如：`https://your-python-service.railway.app`）
6. 点击 "Deploy"

#### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 添加环境变量
vercel env add PYTHON_SERVICE_URL
# 输入你的 Python 服务 URL

# 生产部署
vercel --prod
```

### 3. 配置环境变量

在 Vercel 项目设置中，添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `PYTHON_SERVICE_URL` | Python LangChain 服务地址 | `https://your-python-service.railway.app` |

### 4. 自动部署

Vercel 会自动为每次 Git push 创建预览部署，主分支的更新会自动部署到生产环境。

### 5. 自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 项目结构

```
langChain_Next.js/
├── nextjs-service/          # Next.js 应用（部署到 Vercel）
├── python-service/          # Python LangChain 服务（部署到其他平台）
└── vercel.json             # Vercel 配置文件
```

## 本地开发

```bash
# 进入 Next.js 服务目录
cd nextjs-service

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

确保本地运行了 Python 服务（端口 8000），或修改 `.env.local` 中的 `PYTHON_SERVICE_URL`。

## 故障排查

### 部署失败

- 检查 Vercel 构建日志
- 确认 `nextjs-service/package.json` 中的依赖版本正确
- 确认环境变量配置正确

### API 调用失败

- 检查 `PYTHON_SERVICE_URL` 环境变量是否正确配置
- 确认 Python 服务已成功部署并可访问
- 检查 CORS 配置（如果需要）

## 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [后端服务部署指南](./DEPLOY_BACKEND.md)
