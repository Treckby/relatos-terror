import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import AdSlot from '../../components/AdSlot'
import Comentarios from '../../components/Comentarios'
import type { Metadata } from 'next'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const { data: relato } = await supabase
    .from('relatos')
    .select('titulo, extracto, categoria')
    .eq('slug', slug)
    .single()

  if (!relato) return { title: 'Relato no encontrado' }

  return {
    title: `${relato.titulo} | Relatos Oscuros`,
    description: relato.extracto || `Un relato de ${relato.categoria || 'terror'} en Relatos Oscuros.`,
    openGraph: {
      title: relato.titulo,
      description: relato.extracto || '',
      type: 'article',
    },
  }
}

export default async function Relato({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: relato } = await supabase
    .from('relatos')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!relato) notFound()

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-2xl mx-auto">

      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-4">
        {relato.categoria || 'Terror'}
      </span>

      <h1 className="font-serif text-4xl md:text-5xl italic text-[#ede5d0] mb-6 leading-tight">
        {relato.titulo}
      </h1>

      <div className="flex items-center gap-4 mb-6 font-mono text-[10px] tracking-[0.15em] text-[#5c5040]">
        <span>{relato.tiempo_lectura ? `${relato.tiempo_lectura} min de lectura` : ''}</span>
      </div>

      <AdSlot slot="2222222222" />

      <article className="text-lg text-[#a89878] leading-relaxed whitespace-pre-line font-serif">
        {relato.contenido}
      </article>

      <AdSlot slot="3333333333" />

      <Comentarios relatoId={relato.id} />

    </main>
  )
}