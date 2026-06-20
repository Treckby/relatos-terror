'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function BotonEditarPerfil({ perfilId }: { perfilId: string }) {
  const [esMio, setEsMio] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEsMio(data.user?.id === perfilId)
    })
  }, [perfilId])

  if (!esMio) return null

  return (
    <a
      href="/perfil/editar"
      className="inline-block mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#b8842a] hover:text-[#d4a848] border border-[#3d3020] px-4 py-2"
    >
      Editar perfil
    </a>
  )
}