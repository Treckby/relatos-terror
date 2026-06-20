import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Image from 'next/image'
import BotonEditarPerfil from '../../components/BotonEditarPerfil'

export default async function Perfil({
  params,
}: {
  params: Promise<{ usuario: string }>
}) {
  const { usuario } = await params

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('username', usuario)
    .single()

  if (!perfil) notFound()


  const { data: relatos } = await supabase
    .from('relatos')
    .select('*')
    .eq('autor_id', perfil.id)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-2xl mx-auto">

      <div className="border-b border-[#1f1a12] pb-8 mb-10">
               <div className="w-16 h-16 rounded-full bg-[#191410] border border-[#2e2518] overflow-hidden flex items-center justify-center font-serif text-2xl text-[#a89878] mb-4 relative">
          {perfil.avatar_url ? (
            <Image src={perfil.avatar_url} alt={perfil.username} fill className="object-cover" />
          ) : (
            perfil.username.charAt(0).toUpperCase()
          )}
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#7a1515] mb-2">
          Autor
        </p>
        <h1 className="font-serif text-4xl italic text-[#ede5d0] mb-3">
          {perfil.username}
        </h1>
        {perfil.bio && (
          <p className="text-[#a89878] italic leading-relaxed">{perfil.bio}</p>
        )}
<BotonEditarPerfil perfilId={perfil.id} />
        
      </div>

      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5040] mb-6">
        {relatos?.length || 0} relato{relatos?.length === 1 ? '' : 's'} publicado{relatos?.length === 1 ? '' : 's'}
      </p>

      <div className="flex flex-col">
        {relatos && relatos.length > 0 ? (
          relatos.map((relato) => (
            <Link
              key={relato.id}
              href={`/relatos/${relato.slug}`}
              className="group flex flex-col py-5 border-b border-[#1f1a12] hover:pl-2 transition-all"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] mb-1">
                {relato.categoria || 'Terror'}
              </span>
              <h2 className="font-serif text-lg text-[#ede5d0] group-hover:text-[#b02020] transition-colors">
                {relato.titulo}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-[#5c5040] italic">Aún no ha publicado relatos.</p>
        )}
      </div>

    </main>
  )
}