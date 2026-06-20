'use client'

import { useState } from 'react'

export default function Compartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false)

  function copiarLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const texto = encodeURIComponent(`"${titulo}" — Relatos Oscuros`)

  return (
    <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] uppercase">
      <span className="text-[#5c5040]">Compartir:</span>

      <a
        href={`https://wa.me/?text=${texto}%20${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5c5040] hover:text-[#b02020] transition-colors"
      >
        WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${texto}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5c5040] hover:text-[#b02020] transition-colors"
      >
        X
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5c5040] hover:text-[#b02020] transition-colors"
      >
        Facebook
      </a>

      <button
        onClick={copiarLink}
        className="text-[#5c5040] hover:text-[#b8842a] transition-colors"
      >
        {copiado ? '¡Copiado!' : 'Copiar link'}
      </button>
    </div>
  )
}