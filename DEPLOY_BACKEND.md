# 后端服务部署指南

本文档说明如何部署 Python LangChain 服务。

## Python LangChain 服务部署

### 推荐平台

#### 1. Railway（推荐）

**优点**：简单易用，自动部署，免费额度充足

**部署步骤**：

1. 访问 [Railway](https://railway.app/) 并登录
2. 创建新项目 → 选择 "Deploy from GitHub repo"
3. 选择你的仓库，设置根目录为 `python-service`
4. Railway 会自动检测 `requirements.txt` 并构建
5. 添加环境变量：
   ```
   OPENAI_API_KEY=your-api-key
   OPENAI_BASE_URL=https://yunwu.ai/v1
   PORT=8000
   ```
6. 部署完成后，复制服务 URL（例如：`https://your-app.railway.app`）

#### 2. Render

**部署步骤**：

1. 访问 [Render](https://render.com/) 并登录
2. 创建 "New Web Service"
3. 连接你的 Git 仓库
4. 配置：
   - **Root Directory**: `python-service`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. 添加环境变量（同上）

#### 3. Fly.io

```bash
# 安装 Fly CLI
curl -L https://fly.io/install.sh | sh

# 登录
fly auth login

# 在 python-service 目录下初始化
cd python-service
fly launch

# 配置环境变量
fly secrets set OPENAI_API_KEY=your-api-key
fly secrets set OPENAI_BASE_URL=https://yunwu.ai/v1

# 部署
fly deploy
```

## 连接服务

部署完成后，获取 Python 服务的 URL，并在 Vercel 中配置环境变量：

```bash
# 在 Vercel 项目设置中添加
PYTHON_SERVICE_URL=https://your-python-service-url
```

## 成本估算

### 免费额度（适合个人项目）

- **Vercel**:
  - 100GB 带宽/月
  - 无限部署

- **Railway**:
  - $5 免费额度/月
  - 约 500 小时运行时间

- **Render**:
  - 免费层：750 小时/月
  - 15 分钟无活动后休眠

### 建议

- 个人项目/学习：使用免费层完全足够
- 生产环境：考虑升级到付费计划以获得更好的性能和可用性

## 故障排查

### 服务无法访问

1. 检查服务是否成功启动（查看日志）
2. 确认端口配置正确
3. 检查防火墙/安全组设置

### 环境变量问题

1. 确认所有必需的环境变量都已设置
2. 检查环境变量值的格式是否正确
3. 某些平台需要重新部署才能使环境变量生效

### Python 服务依赖问题

1. 确认 `requirements.txt` 文件存在
2. 检查 Python 版本兼容性
3. 查看构建日志中的错误信息

## 监控和日志

- **Railway**: 内置日志查看器
- **Render**: Dashboard 中查看日志
- **Fly.io**: 使用 `fly logs` 命令

建议配置日志聚合服务（如 Datadog, Sentry）用于生产环境监控。
