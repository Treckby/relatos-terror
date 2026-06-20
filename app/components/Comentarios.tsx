'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

type Comentario = {
  id: string
  username: string
  contenido: string
  created_at: string
}

export default function Comentarios({ relatoId }: { relatoId: string }) {
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [texto, setTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    cargarComentarios()
  }, [])

  async function cargarComentarios() {
    const { data } = await supabase
      .from('comentarios')
      .select('*')
      .eq('relato_id', relatoId)
      .order('created_at', { ascending: false })

    setComentarios(data || [])
    setCargando(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !texto.trim()) return
    setLoading(true)

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('username')
      .eq('id', user.id)
      .single()

    const { error } = await supabase.from('comentarios').insert({
      relato_id: relatoId,
      autor_id: user.id,
      username: perfil?.username || 'Anónimo',
      contenido: texto.trim(),
    })

    if (!error) {
      setTexto('')
      await cargarComentarios()
    }
    setLoading(false)
  }

  return (
    <section className="mt-16 pt-10 border-t border-[#1f1a12]">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-6">
        {comentarios.length} comentario{comentarios.length === 1 ? '' : 's'}
      </p>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            placeholder="Comparte tu reacción a este relato..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={3}
            className="w-full bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif resize-none mb-3"
          />
          <button
            type="submit"
            disabled={loading || !texto.trim()}
            className="font-mono text-[10px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-6 py-3 hover:bg-[#b02020] transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Comentar'}
          </button>
        </form>
      ) : (
        <p className="mb-10 text-[#5c5040] italic">
          <Link href="/login" className="text-[#b8842a] hover:text-[#d4a848]">Inicia sesión</Link> para dejar un comentario.
        </p>
      )}

      {!cargando && (
        <div className="flex flex-col gap-6">
          {comentarios.map((c) => (
            <div key={c.id} className="border-l-2 border-[#2e2518] pl-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#b02020]">
                  {c.username}
                </span>
                <span className="font-mono text-[9px] text-[#3d3020]">
                  {new Date(c.created_at).toLocaleDateString('es-ES')}
                </span>
              </div>
              <p className="text-[#a89878] italic leading-relaxed">{c.contenido}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  )
}