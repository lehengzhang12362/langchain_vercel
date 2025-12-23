import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    // 检查 Python 服务健康状态
    const response = await fetch(`${pythonServiceUrl}/health`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Python服务不健康')
    }

    const pythonHealth = await response.json()

    return NextResponse.json({
      status: 'healthy',
      service: 'nextjs-translate-service',
      pythonService: pythonHealth,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        service: 'nextjs-translate-service',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
