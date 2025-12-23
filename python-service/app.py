#!/usr/bin/env python
import os
from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langserve import add_routes
from fastapi.middleware.cors import CORSMiddleware

# 从环境变量读取配置
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-5icsTu6Ryb9mkJvK7B253rfgN7JWT36zt2Yv0fDITMQF9b7S")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://yunwu.ai/v1")

# 配置OpenAI
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
os.environ["OPENAI_BASE_URL"] = OPENAI_BASE_URL

# 定义LangChain逻辑
# 禁用stream_usage来避免与兼容API的token计数问题
model = ChatOpenAI(
    model="gpt-4o-mini",
    stream_usage=False  # 禁用流式响应中的usage统计
)
prompt = ChatPromptTemplate.from_template("请把下面这句话翻译成中文: {text}")
parser = StrOutputParser()

# 创建翻译链
chain = prompt | model | parser

# 创建FastAPI应用
app = FastAPI(
    title="LangChain翻译服务",
    version="1.0",
    description="纯LangChain翻译API服务",
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载LangServe路由
add_routes(
    app,
    chain,
    path="/translate",
)

# 健康检查接口
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "langchain-translate"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
