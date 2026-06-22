import Link from 'next/link'
import AdSlot from './components/AdSlot'
import { supabase } from './lib/supabase'
import Image from 'next/image'

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

  return (
    <main className="min-h-screen bg-[#080604] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,#1a0505,transparent)]" />

      <div className="relative z-10 flex flex-col items-center">

        <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#7a1515] mb-8">
          Vol. I · Est. 2026 · Terror & Suspenso
        </p>

        <h1 className="font-serif text-[clamp(5rem,14vw,10rem)] leading-none tracking-tight text-[#ede5d0]">
          Relatos
          <span className="block italic text-[#b02020]">Oscuros</span>
        </h1>

        <p className="mt-8 text-lg italic font-light text-[#a89878] max-w-md leading-relaxed">
          Un refugio para las historias que no deberían ser contadas.
          Terror, suspenso y los rincones más sombríos de la imaginación.
        </p>

        <div className="flex items-center gap-4 mt-6 text-[#5c5040]">
          <div className="w-20 h-px bg-[#2e2518]" />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase">Entra si te atreves</span>
          <div className="w-20 h-px bg-[#2e2518]" />
        </div>
                {config?.reto_mes && (
          <a
            href="/publicar"
            className="mt-8 border border-[#3d3020] px-6 py-3 hover:border-[#b8842a] transition-colors group"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
              Reto del mes
            </span>
            <span className="font-serif italic text-[#ede5d0] group-hover:text-[#b8842a] transition-colors">
              {config.reto_mes}
            </span>
          </a>
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
         {relatosRecientes && relatosRecientes.length > 0 && (
        <section className="relative z-10 w-full max-w-3xl mt-24 px-2">
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

        <div className="mt-16 w-full max-w-xl">
          <AdSlot slot="4444444444" />
        </div>

      </div>
    </main>
  )
}