import Link from 'next/link'
import { supabase } from '../lib/supabase'
import AdSlot from '../components/AdSlot'
import Image from 'next/image'

const categorias = ['Todos', 'Terror', 'Suspenso', 'Misterio', 'Terror gótico', 'Folklore']

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo de relatos | Relatos Oscuros',
  description: 'Explora relatos de terror, suspenso y misterio escritos por nuestra comunidad.',
}


export default async function Relatos({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string; etiqueta?: string }>
}) {
  const { categoria, q, etiqueta } = await searchParams
  const filtroActivo = categoria || 'Todos'
  const busqueda = q || ''

  let query = supabase
    .from('relatos')
    .select('*')
    .eq('estado', 'publicado')
    .order('created_at', { ascending: false })

  if (filtroActivo !== 'Todos') {
    query = query.eq('categoria', filtroActivo)
  }

  if (busqueda) {
    query = query.ilike('titulo', `%${busqueda}%`)
  }
 if (etiqueta) {
    query = query.contains('etiquetas', [etiqueta])
  }
  const { data: relatos } = await query

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-3xl mx-auto">

      <div className="mb-10 border-b border-[#1f1a12] pb-8">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
          Archivo de relatos
        </p>
        <h1 className="text-5xl font-serif text-[#ede5d0] italic">
          {etiqueta ? `#${etiqueta}` : 'Todos los relatos'}
        </h1>
      </div>
      <form action="/relatos" className="mb-6">
        {categoria && <input type="hidden" name="categoria" value={categoria} />}
        <input
          type="text"
          name="q"
          defaultValue={busqueda}
          placeholder="Buscar relatos por título..."
          className="w-full bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif"
        />
      </form>
      <div className="flex flex-wrap gap-2 mb-10">
        {categorias.map((cat) => (
          <Link
            key={cat}
            href={cat === 'Todos' ? '/relatos' : `/relatos?categoria=${encodeURIComponent(cat)}`}
            className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
              filtroActivo === cat
                ? 'border-[#b02020] text-[#b02020] bg-[#7a1515]/10'
                : 'border-[#2e2518] text-[#5c5040] hover:border-[#7a1515] hover:text-[#b02020]'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="flex flex-col">
        {relatos && relatos.length > 0 ? (
          relatos.map((relato, i) => (
            <div key={relato.id}>
              <Link
                href={`/relatos/${relato.slug}`}
                className="group flex gap-6 py-6 border-b border-[#1f1a12] hover:pl-2 transition-all"
              >
                <span className="font-mono text-[10px] text-[#2e2518] pt-1 min-w-[2rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                                {relato.portada_url && (
                  <div className="relative w-20 h-20 flex-shrink-0 border border-[#2e2518] overflow-hidden">
                    <Image src={relato.portada_url} alt={relato.titulo} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-2">
                    {relato.categoria || 'Terror'}
                  </span>
                  <h2 className="font-serif text-xl text-[#ede5d0] group-hover:text-[#b02020] transition-colors mb-2">
                    {relato.titulo}
                  </h2>
                  {relato.extracto && (
                    <p className="text-sm italic text-[#5c5040] leading-relaxed">
                      {relato.extracto}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#5c5040] pt-1 whitespace-nowrap">
                  {relato.tiempo_lectura ? `${relato.tiempo_lectura} min` : ''}
                </span>
              </Link>
              {(i + 1) % 4 === 0 && <AdSlot slot="1111111111" />}
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl italic text-[#5c5040] mb-6">
              No hay relatos en esta categoría
            </p>
            <Link
              href="/relatos"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#b02020] border border-[#7a1515] px-6 py-3 hover:bg-[#7a1515] hover:text-[#ede5d0] transition-colors inline-block"
            >
              Ver todos los relatos
            </Link>
          </div>
        )}
      </div>

    </main>
  )
}