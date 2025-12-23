'use client'

import { useState } from 'react'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('请输入要翻译的文本')
      return
    }

    setLoading(true)
    setError(null)
    setResult('')

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error(`HTTP错误! 状态: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setResult(data.result)
      } else {
        setError('翻译失败: ' + data.error)
      }
    } catch (err) {
      console.error('请求错误:', err)
      setError('服务调用失败,请检查网络连接或后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setInputText('')
    setResult('')
    setError(null)
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      translateText()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          🤖 AI翻译助手
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          基于 Next.js + LangChain 构建
        </p>

        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">
            请输入英文文本:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="5"
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-base resize-y focus:outline-none focus:border-primary transition-colors"
            placeholder="例如: I love coding with LangChain!"
          />
        </div>

        <div className="flex gap-3 mb-5">
          <button
            onClick={translateText}
            disabled={loading}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold text-base cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? '翻译中...' : '开始翻译'}
          </button>
          <button
            onClick={clearAll}
            className="flex-1 py-4 px-6 bg-gray-100 text-gray-800 rounded-xl font-semibold text-base cursor-pointer transition-all hover:bg-gray-200"
          >
            清空
          </button>
        </div>

        {loading && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 text-center">
            <div className="inline-block w-5 h-5 border-3 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
            <span className="text-primary">正在调用AI服务...</span>
          </div>
        )}

        {result && !loading && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
            <div className="font-semibold mb-2 text-gray-800">翻译结果:</div>
            <div className="text-gray-700 leading-relaxed">{result}</div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="text-center mt-5 text-gray-400 text-sm">
          Powered by Next.js + LangChain + Docker
        </div>
      </div>
    </div>
  )
}
