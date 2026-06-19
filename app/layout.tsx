import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1793586690744453"></meta>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}