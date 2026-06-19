import Link from 'next/link'

export default async function Home() {

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

      </div>
    </main>
  )
}