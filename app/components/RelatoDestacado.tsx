import Link from 'next/link'

type Relato = {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  categoria: string | null
  tiempo_lectura: number | null
}

export default function RelatoDestacado({ relato }: { relato: Relato }) {
  return (
    <section className="relative z-10 w-full max-w-3xl mt-20 px-6">
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-6">
        Relato destacado
      </p>

      <div className="grid md:grid-cols-2 border border-[#2e2518]">

        <div className="relative bg-[#0d0505] min-h-[280px] overflow-hidden">
          <svg viewBox="0 0 600 520" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="520" fill="#0d0505" />
            <radialGradient id="rg" cx="50%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#3a0808" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d0505" stopOpacity="0" />
            </radialGradient>
            <rect width="600" height="520" fill="url(#rg)" />
            <g opacity="0.6">
              <line x1="300" y1="520" x2="300" y2="240" stroke="#1a0a0a" strokeWidth="18" />
              <line x1="300" y1="380" x2="200" y2="280" stroke="#1a0a0a" strokeWidth="10" />
              <line x1="300" y1="360" x2="400" y2="260" stroke="#1a0a0a" strokeWidth="10" />
              <line x1="300" y1="330" x2="180" y2="220" stroke="#1a0a0a" strokeWidth="7" />
              <line x1="300" y1="320" x2="420" y2="220" stroke="#1a0a0a" strokeWidth="7" />
              <line x1="300" y1="300" x2="240" y2="200" stroke="#1a0a0a" strokeWidth="5" />
              <line x1="300" y1="290" x2="360" y2="200" stroke="#1a0a0a" strokeWidth="5" />
            </g>
            <circle cx="300" cy="120" r="55" fill="#f5e8c0" opacity="0.12" />
            <circle cx="300" cy="120" r="48" fill="#f5e8c0" opacity="0.08" />
            <rect x="0" y="460" width="600" height="60" fill="#1a0808" opacity="0.7" />
            <ellipse cx="300" cy="520" rx="400" ry="80" fill="#1a0808" opacity="0.5" />
            <g fill="#0d0505" opacity="0.7">
              <path d="M140 180 q4-8 10-6 q-2-6 6-4 l-8 12z" />
              <path d="M450 200 q4-8 10-6 q-2-6 6-4 l-8 12z" />
              <path d="M230 140 q3-6 8-4 q-1-5 5-3 l-6 9z" />
            </g>
          </svg>
        </div>

        <div className="p-8 flex flex-col justify-between bg-[#0f0c08]">
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] border border-[#7a1515] px-2 py-1 inline-block mb-4">
              {relato.categoria || 'Terror'}
            </span>
            <h2 className="font-serif text-2xl italic text-[#ede5d0] mb-4 leading-tight">
              {relato.titulo}
            </h2>
            {relato.extracto && (
              <p className="text-sm italic text-[#a89878] leading-relaxed border-l-2 border-[#7a1515] pl-4 mb-6">
                {relato.extracto}
              </p>
            )}
          </div>
          <Link
            href={`/relatos/${relato.slug}`}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b8842a] hover:text-[#d4a848] transition-colors flex items-center gap-2 pt-4 border-t border-[#1f1a12]"
          >
            Leer relato completo →
          </Link>
        </div>

      </div>
    </section>
  )
}