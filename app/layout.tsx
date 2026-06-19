import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1793586690744453"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {/* Navbar y demás */}
        {children}
      </body>
    </html>
  )
}
