'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeroInmersivo({ retoMes }: { retoMes: string | null }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="relative flex flex-col items-center px-6">

      {/* Cita atmosférica flotante */}
      <div className="hidden xl:block fixed left-10 top-1/2 -translate-y-1/2 max-w-[160px] z-10">
        <div
          className="transition-transform duration-300"
          style={{ transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)` }}
        >
          <blockquote className="text-xs italic text-[#5c5040] leading-relaxed border-l border-[#7a1515] pl-4">
            "No existe el miedo al desconocido. Solo el miedo a lo que ya sabes que está ahí."
          </blockquote>
          <cite className="block mt-2 font-mono text-[8px] tracking-[0.2em] text-[#3d3020] pl-4">
            — Anónimo
          </cite>
        </div>
      </div>

      <p
        className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#7a1515] mb-8 transition-transform duration-300"
        style={{ transform: `translate(${mouse.x * 4}px, ${mouse.y * 4}px)` }}
      >
        Vol. I · Est. 2026 · Terror & Suspenso
      </p>

      <h1
        className="font-serif text-[clamp(5rem,14vw,10rem)] leading-none tracking-tight text-[#ede5d0] text-center transition-transform duration-300"
        style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}
      >
        Relatos
        <span className="block italic text-[#b02020]">Oscuros</span>
      </h1>

      <p className="mt-8 text-lg italic font-light text-[#a89878] max-w-md leading-relaxed text-center">
        Un refugio para las historias que no deberían ser contadas.
        Terror, suspenso y los rincones más sombríos de la imaginación.
      </p>

      <div className="flex items-center gap-4 mt-6 text-[#5c5040]">
        <div className="w-20 h-px bg-[#2e2518]" />
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase">Entra si te atreves</span>
        <div className="w-20 h-px bg-[#2e2518]" />
      </div>

      {retoMes && (
        <Link
          href="/publicar"
          className="mt-8 border border-[#3d3020] px-6 py-3 hover:border-[#b8842a] transition-colors group"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
            Reto del mes
          </span>
          <span className="font-serif italic text-[#ede5d0] group-hover:text-[#b8842a] transition-colors">
            {retoMes}
          </span>
        </Link>
      )}

      <div className="flex gap-4 mt-8">
        <Link
          href="/relatos"
          className="font-mono text-[11px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-9 py-4 hover:bg-[#b02020] transition-colors"
        >
          Explorar relatos
        </Link>
        <Link
          href="/publicar"
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#a89878] hover:text-[#b8842a] transition-colors flex items-center gap-2"
        >
          Publicar el tuyo →
        </Link>
      </div>

    </div>
  )
}