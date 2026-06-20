'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function GuardarButton({ relatoId }: { relatoId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [guardado, setGuardado] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data } = await supabase.auth.getUser()
    const uid = data.user?.id ?? null
    setUserId(uid)

    if (uid) {
      const { data: fav } = await supabase
        .from('favoritos')
        .select('id')
        .eq('relato_id', relatoId)
        .eq('user_id', uid)
        .maybeSingle()

      setGuardado(!!fav)
    }

    setCargando(false)
  }

  async function toggleGuardar() {
    if (!userId) return

    if (guardado) {
      await supabase.from('favoritos').delete().eq('relato_id', relatoId).eq('user_id', userId)
      setGuardado(false)
    } else {
      await supabase.from('favoritos').insert({ relato_id: relatoId, user_id: userId })
      setGuardado(true)
    }
  }

  if (cargando || !userId) return null

  return (
    <button
      onClick={toggleGuardar}
      className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase border px-4 py-2 transition-colors ${
        guardado
          ? 'border-[#b8842a] text-[#b8842a] bg-[#b8842a]/10'
          : 'border-[#2e2518] text-[#5c5040] hover:border-[#b8842a] hover:text-[#b8842a]'
      }`}
    >
      <span>{guardado ? '🔖' : '☆'}</span>
      <span>{guardado ? 'Guardado' : 'Guardar'}</span>
    </button>
  )
}