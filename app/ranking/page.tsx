import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default async function Ranking() {
  const { data: masLeidos } = await supabase
    .from('relatos')
    .select('id, titulo, slug, categoria, vistas')
    .eq('estado', 'publicado')
    .order('vistas', { ascending: false })
    .limit(10)

  const { data: likesData } = await supabase
    .from('likes')
    .select('relato_id')

  const conteo: Record<string, number> = {}
  ;(likesData || []).forEach((l) => {
    conteo[l.relato_id] = (conteo[l.relato_id] || 0) + 1
  })

  const idsOrdenados = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id)

  const { data: relatosLikes } = idsOrdenados.length
    ? await supabase
        .from('relatos')
        .select('id, titulo, slug, categoria')
        .in('id', idsOrdenados)
        .eq('estado', 'publicado')
    : { data: [] }

  const mejorValorados = idsOrdenados
    .map((id) => relatosLikes?.find((r) => r.id === id))
    .filter(Boolean) as { id: string; titulo: string; slug: string; categoria: string | null }[]

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-3xl mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Lo que más resuena
      </p>
      <h1 className="text-5xl font-serif text-[#ede5d0] italic mb-14">
        Ranking
      </h1>

      <section className="mb-16">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#b02020] mb-6">
          Más leídos
        </p>
        <div className="flex flex-col">
          {(masLeidos || []).map((r, i) => (
            <Link
              key={r.id}
              href={`/relatos/${r.slug}`}
              className="group flex items-center gap-5 py-4 border-b border-[#1f1a12] hover:pl-2 transition-all"
            >
              <span className="font-serif text-2xl italic text-[#2e2518] w-8">{i + 1}</span>
              <div className="flex-1">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
                  {r.categoria || 'Terror'}
                </span>
                <h2 className="font-serif text-lg text-[#ede5d0] group-hover:text-[#b02020] transition-colors">
                  {r.titulo}
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#5c5040] whitespace-nowrap">
                {r.vistas} vistas
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#b8842a] mb-6">
          Mejor valorados
        </p>
        <div className="flex flex-col">
          {mejorValorados.length === 0 ? (
            <p className="text-[#5c5040] italic">Aún no hay suficientes likes para mostrar un ranking.</p>
          ) : (
            mejorValorados.map((r, i) => (
              <Link
                key={r.id}
                href={`/relatos/${r.slug}`}
                className="group flex items-center gap-5 py-4 border-b border-[#1f1a12] hover:pl-2 transition-all"
              >
                <span className="font-serif text-2xl italic text-[#2e2518] w-8">{i + 1}</span>
                <div className="flex-1">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
                    {r.categoria || 'Terror'}
                  </span>
                  <h2 className="font-serif text-lg text-[#ede5d0] group-hover:text-[#b02020] transition-colors">
                    {r.titulo}
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-[#5c5040] whitespace-nowrap">
                  ♥ {conteo[r.id]}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

    </main>
  )
}