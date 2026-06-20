import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1a12] px-8 md:px-14 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-serif italic text-[#5c5040]">Relatos Oscuros</span>
      <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.15em] uppercase text-[#5c5040]">
        <Link href="/privacidad" className="hover:text-[#b8842a] transition-colors">
          Política de privacidad
        </Link>
        <span>© 2026</span>
      </div>
    </footer>
  )
}