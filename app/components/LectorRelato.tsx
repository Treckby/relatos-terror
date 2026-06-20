'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LikeButton from './LikeButton'
import Compartir from './Compartir'
import Comentarios from './Comentarios'
import AdSlot from './AdSlot'
import GuardarButton from './GuardarButton'

type Relato = {
  id: string
  titulo: string
  contenido: string
}

type Relacionado = {
  id: string
  titulo: string
  slug: string
  categoria: string | null
}

export default function LectorRelato({
  relato,
  relacionados,
}: {
  relato: Relato
  relacionados: Relacionado[]
}) {
  const [tamano, setTamano] = useState(18)
  const [fuente, setFuente] = useState<'serif' | 'sans'>('serif')
  const [inmersivo, setInmersivo] = useState(false)

  useEffect(() => {
    const guardado = localStorage.getItem('preferenciasLectura')
    if (guardado) {
      const prefs = JSON.parse(guardado)
      setTamano(prefs.tamano ?? 18)
      setFuente(prefs.fuente ?? 'serif')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('preferenciasLectura', JSON.stringify({ tamano, fuente }))
  }, [tamano, fuente])

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 font-mono text-[10px] tracking-[0.15em] uppercase text-[#5c5040] flex-wrap">
        <span>Texto:</span>
        <button onClick={() => setTamano((t) => Math.max(14, t - 2))} className="border border-[#2e2518] px-2 py-1 hover:border-[#7a1515] hover:text-[#b02020]">A-</button>
        <button onClick={() => setTamano((t) => Math.min(28, t + 2))} className="border border-[#2e2518] px-2 py-1 hover:border-[#7a1515] hover:text-[#b02020]">A+</button>
        <button
          onClick={() => setFuente((f) => (f === 'serif' ? 'sans' : 'serif'))}
          className="border border-[#2e2518] px-3 py-1 hover:border-[#7a1515] hover:text-[#b02020]"
        >
          {fuente === 'serif' ? 'Fuente: Serif' : 'Fuente: Sans'}
        </button>
        <button
          onClick={() => setInmersivo((i) => !i)}
          className={`border px-3 py-1 transition-colors ${
            inmersivo ? 'border-[#b02020] text-[#b02020]' : 'border-[#2e2518] hover:border-[#7a1515] hover:text-[#b02020]'
          }`}
        >
          {inmersivo ? 'Salir de modo lectura' : 'Modo lectura inmersivo'}
        </button>
      </div>

      {!inmersivo && (
        <div className="mb-8">
          <LikeButton relatoId={relato.id} />
          <GuardarButton relatoId={relato.id} />
        </div>
      )}

      {!inmersivo && <AdSlot slot="2222222222" />}

      <article
        className={`leading-relaxed whitespace-pre-line text-[#a89878] ${fuente === 'serif' ? 'font-serif' : 'font-sans'}`}
        style={{ fontSize: `${tamano}px` }}
      >
        {relato.contenido}
      </article>

      {!inmersivo && (
        <>
          <AdSlot slot="3333333333" />

          <div className="mt-8 mb-4">
            <Compartir titulo={relato.titulo} />
          </div>

          <Comentarios relatoId={relato.id} />

          {relacionados.length > 0 && (
            <section className="mt-16 pt-10 border-t border-[#1f1a12]">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-6">
                También podría interesarte
              </p>
              <div className="flex flex-col gap-5">
                {relacionados.map((r) => (
                  <Link
                    key={r.id}
                    href={`/relatos/${r.slug}`}
                    className="group block py-4 border-b border-[#1f1a12] hover:pl-2 transition-all"
                  >
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
                      {r.categoria || 'Terror'}
                    </span>
                    <h3 className="font-serif text-lg text-[#ede5d0] group-hover:text-[#b02020] transition-colors">
                      {r.titulo}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}