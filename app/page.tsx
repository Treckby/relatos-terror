import Link from 'next/link'
import Image from 'next/image'
import { supabase } from './lib/supabase'
import HeroInmersivo from './components/HeroInmersivo'
import AdSlot from './components/AdSlot'
import RelatoDestacado from './components/RelatoDestacado'
import Estadisticas from './components/Estadisticas'

export default async function Home() {
  const { data: config } = await supabase
    .from('configuracion')
    .select('reto_mes')
    .eq('id', 1)
    .single()


    const { data: relatosRecientes } = await supabase
    .from('relatos')
    .select('id, titulo, slug, categoria, extracto, tiempo_lectura, portada_url')
    .eq('estado', 'publicado')
    .order('created_at', { ascending: false })
    .limit(6)

  const { data: destacado } = await supabase
    .from('relatos')
    .select('id, titulo, slug, extracto, categoria, tiempo_lectura')
    .eq('estado', 'publicado')
    .order('vistas', { ascending: false })
    .limit(1)
    .single()

  const { count: totalRelatos } = await supabase
    .from('relatos')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'publicado')

  const { count: totalAutores } = await supabase
    .from('perfiles')
    .select('*', { count: 'exact', head: true })

  const { data: vistasTotales } = await supabase.rpc('total_vistas')

  return (
    <main className="min-h-screen bg-[#080604] flex flex-col items-center pt-32 pb-20 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,#1a0505,transparent)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full">

        <HeroInmersivo retoMes={config?.reto_mes ?? null} />
                <div className="mt-14">
          <Estadisticas
            relatos={totalRelatos ?? 0}
            autores={totalAutores ?? 0}
            lecturas={vistasTotales ?? 0}
          />
        </div>

      </div>

      <section className="relative z-10 w-full max-w-3xl mt-20 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { nombre: 'Terror', emoji: '🕷️' },
            { nombre: 'Suspenso', emoji: '🗝️' },
            { nombre: 'Misterio', emoji: '🌫️' },
            { nombre: 'Terror gótico', emoji: '🦇' },
            { nombre: 'Folklore', emoji: '🕯️' },
          ].map((cat) => (
            <Link
              key={cat.nombre}
              href={`/relatos?categoria=${encodeURIComponent(cat.nombre)}`}
              className="group flex flex-col items-center justify-center gap-2 border border-[#1f1a12] py-8 hover:border-[#7a1515] hover:bg-[#0f0c08] transition-all"
            >
              <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{cat.emoji}</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] group-hover:text-[#b02020] transition-colors">
                {cat.nombre}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {relatosRecientes && relatosRecientes.length > 0 && (
        <section className="relative z-10 w-full max-w-3xl mt-20 px-6">
          <div className="flex items-center justify-between mb-8 border-b border-[#1f1a12] pb-4">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515]">
              Últimos relatos
            </p>
            <Link
              href="/relatos"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] hover:text-[#b8842a] transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          <div className="flex flex-col">
            {relatosRecientes.map((relato) => (
              <Link
                key={relato.id}
                href={`/relatos/${relato.slug}`}
                className="group flex gap-6 py-6 border-b border-[#1f1a12] hover:pl-2 transition-all"
              >
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
                    <p className="text-sm italic text-[#5c5040] leading-relaxed">{relato.extracto}</p>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#5c5040] pt-1 whitespace-nowrap">
                  {relato.tiempo_lectura ? `${relato.tiempo_lectura} min` : ''}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="w-full max-w-xl mx-auto mt-16 px-6 relative z-10">
        <AdSlot slot="4444444444" />
      </div>

    </main>
  )
}