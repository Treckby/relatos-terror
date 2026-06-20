import Link from 'next/link'
import { supabase } from '../lib/supabase'
import AdSlot from '../components/AdSlot'

export default async function Relatos() {
  const { data: relatos } = await supabase
    .from('relatos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-3xl mx-auto">

      <div className="mb-10 border-b border-[#1f1a12] pb-8">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
          Archivo de relatos
        </p>
        <h1 className="text-5xl font-serif text-[#ede5d0] italic">
          Todos los relatos
        </h1>
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
              Aún no hay relatos
            </p>
            <Link
              href="/publicar"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#b02020] border border-[#7a1515] px-6 py-3 hover:bg-[#7a1515] hover:text-[#ede5d0] transition-colors inline-block"
            >
              Sé el primero en publicar
            </Link>
          </div>
        )}
      </div>

    </main>
  )
}