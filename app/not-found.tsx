import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080604] flex flex-col items-center justify-center text-center px-6">

      <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#7a1515] mb-6">
        Página perdida en la niebla
      </p>

      <h1 className="font-serif text-[clamp(4rem,12vw,8rem)] leading-none italic text-[#ede5d0] mb-6">
        404
      </h1>

      <p className="text-lg italic text-[#a89878] max-w-md mb-10 leading-relaxed">
        Lo que buscabas se desvaneció en la oscuridad,
        o quizás nunca existió.
      </p>

      <div className="flex items-center gap-4 mb-10 text-[#5c5040]">
        <div className="w-16 h-px bg-[#2e2518]" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Regresa si puedes</span>
        <div className="w-16 h-px bg-[#2e2518]" />
      </div>

      <Link
        href="/"
        className="font-mono text-[11px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-9 py-4 hover:bg-[#b02020] transition-colors"
      >
        Volver al inicio
      </Link>

    </main>
  )
}