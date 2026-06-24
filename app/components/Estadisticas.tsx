export default function Estadisticas({
  relatos,
  autores,
  lecturas,
}: {
  relatos: number
  autores: number
  lecturas: number
}) {
  const stats = [
    { valor: relatos, label: 'Relatos' },
    { valor: autores, label: 'Autores' },
    { valor: lecturas, label: 'Lecturas' },
  ]

  return (
    <div className="flex items-center justify-center gap-8 sm:gap-14 relative z-10">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-8 sm:gap-14">
          <div className="text-center">
            <span className="font-serif text-3xl font-bold text-[#b02020] block">
              {s.valor.toLocaleString('es-ES')}
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#5c5040]">
              {s.label}
            </span>
          </div>
          {i < stats.length - 1 && <div className="w-px h-10 bg-[#2e2518]" />}
        </div>
      ))}
    </div>
  )
}