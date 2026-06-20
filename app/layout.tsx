import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Relatos Oscuros',
  description: 'Terror y suspenso',
  other: {
    'google-adsense-account': 'ca-pub-1793586690744453',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1793586690744453"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}