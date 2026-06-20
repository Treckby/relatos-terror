import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import LectorRelato from '../../components/LectorRelato'

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
    .eq('estado', 'publicado')
    .single()

  if (!relato) notFound()

  let nombreAutor = relato.autor_nombre || 'Anónimo'
  let usernameAutor: string | null = null

  if (relato.autor_id) {
    const { data: perfilAutor } = await supabase
      .from('perfiles')
      .select('username')
      .eq('id', relato.autor_id)
      .single()

    if (perfilAutor) {
      nombreAutor = perfilAutor.username
      usernameAutor = perfilAutor.username
    }
  }

  const { data: relacionados } = await supabase
    .from('relatos')
    .select('id, titulo, slug, categoria')
    .eq('categoria', relato.categoria)
    .eq('estado', 'publicado')
    .neq('id', relato.id)
    .limit(3)

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-2xl mx-auto">

      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-4">
        {relato.categoria || 'Terror'}
      </span>

      <h1 className="font-serif text-4xl md:text-5xl italic text-[#ede5d0] mb-6 leading-tight">
        {relato.titulo}
      </h1>

      <div className="flex items-center gap-4 mb-10 font-mono text-[10px] tracking-[0.15em] text-[#5c5040]">
        {usernameAutor ? (
          <a href={`/perfil/${usernameAutor}`} className="text-[#b8842a] hover:text-[#d4a848]">
            Por {nombreAutor}
          </a>
        ) : (
          <span>Por {nombreAutor}</span>
        )}
        <span>·</span>
        <span>{relato.tiempo_lectura ? `${relato.tiempo_lectura} min de lectura` : ''}</span>
      </div>

      <LectorRelato relato={relato} relacionados={relacionados || []} />

    </main>
  )
}