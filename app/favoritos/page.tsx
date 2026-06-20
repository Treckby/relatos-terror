'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

type Relato = {
  id: string
  titulo: string
  slug: string
  categoria: string | null
  extracto: string | null
  tiempo_lectura: number | null
}

export default function Favoritos() {
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [cargando, setCargando] = useState(true)
  const router = useRouter()

  useEffect(() => {
    cargarFavoritos()
  }, [])

  async function cargarFavoritos() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      router.push('/login')
      return
    }

    const { data } = await supabase
      .from('favoritos')
      .select('relatos(id, titulo, slug, categoria, extracto, tiempo_lectura)')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false })

    const lista = (data || [])
      .map((f) => f.relatos)
      .filter(Boolean) as unknown as Relato[]

    setRelatos(lista)
    setCargando(false)
  }

  if (cargando) return null

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-3xl mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Tu rincón guardado
      </p>
      <h1 className="text-5xl font-serif text-[#ede5d0] italic mb-10">
        Favoritos
      </h1>

      {relatos.length === 0 ? (
        <p className="text-[#5c5040] italic">
          Aún no has guardado ningún relato.{' '}
          <Link href="/relatos" className="text-[#b8842a] hover:text-[#d4a848] underline">
            Explora el catálogo
          </Link>
        </p>
      ) : (
        <div className="flex flex-col">
          {relatos.map((r) => (
            <Link
              key={r.id}
              href={`/relatos/${r.slug}`}
              className="group flex gap-6 py-6 border-b border-[#1f1a12] hover:pl-2 transition-all"
            >
              <div className="flex-1">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-2">
                  {r.categoria || 'Terror'}
                </span>
                <h2 className="font-serif text-xl text-[#ede5d0] group-hover:text-[#b02020] transition-colors mb-2">
                  {r.titulo}
                </h2>
                {r.extracto && (
                  <p className="text-sm italic text-[#5c5040] leading-relaxed">{r.extracto}</p>
                )}
              </div>
              <span className="font-mono text-[10px] text-[#5c5040] pt-1 whitespace-nowrap">
                {r.tiempo_lectura ? `${r.tiempo_lectura} min` : ''}
              </span>
            </Link>
          ))}
        </div>
      )}

    </main>
  )
}