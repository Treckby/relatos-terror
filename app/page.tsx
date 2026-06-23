import Link from 'next/link'
import AdSlot from './components/AdSlot'
import { supabase } from './lib/supabase'
import Image from 'next/image'
import HeroInmersivo from './components/HeroInmersivo'

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

        <HeroInmersivo retoMes={config?.reto_mes ?? null} />

        <div className="mt-16 w-full max-w-xl">
          <AdSlot slot="4444444444" />
        </div>

      </div>
    </main>
  )
}