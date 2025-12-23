import './globals.css'

export const metadata = {
  title: 'AI翻译助手',
  description: '基于 Next.js + LangChain 构建的AI翻译应用',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
