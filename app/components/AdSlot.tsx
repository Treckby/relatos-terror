'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSlot({ slot }: { slot: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense aún no aprobado o script no cargado
    }
  }, [])

  return (
    <div className="my-10 flex flex-col items-center">
      <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#3d3020] mb-2">
        Publicidad
      </span>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: 'block', minHeight: '100px', backgroundColor: '#0f0c08', border: '1px dashed #2e2518' }}
        data-ad-client="ca-pub-1793586690744453"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}