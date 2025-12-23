import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: '请提供要翻译的文本' },
        { status: 400 }
      )
    }

    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    // 调用 Python LangChain 服务
    const response = await fetch(`${pythonServiceUrl}/translate/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
      }),
    })

    if (!response.ok) {
      throw new Error(`Python服务响应错误: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      result: data.output,
      error: null,
    })
  } catch (error) {
    console.error('翻译API错误:', error)
    return NextResponse.json(
      {
        success: false,
        result: null,
        error: error.message || '翻译服务调用失败',
      },
      { status: 500 }
    )
  }
}
