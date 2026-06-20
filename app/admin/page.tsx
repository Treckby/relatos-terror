'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

type Relato = {
  id: string
  titulo: string
  slug: string
  categoria: string
  estado: string
  autor_nombre: string | null
  autor_id: string | null
  created_at: string
}

export default function Admin() {
  const [autorizado, setAutorizado] = useState<boolean | null>(null)
  const [relatos, setRelatos] = useState<Relato[]>([])
  const [cargando, setCargando] = useState(true)
  const router = useRouter()

  useEffect(() => {
    verificarAcceso()
  }, [])

  async function verificarAcceso() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      router.push('/login')
      return
    }

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('es_admin')
      .eq('id', userData.user.id)
      .single()

    if (!perfil?.es_admin) {
      setAutorizado(false)
      return
    }

    setAutorizado(true)
    cargarRelatos()
  }

  async function cargarRelatos() {
    const { data } = await supabase
      .from('relatos')
      .select('id, titulo, slug, categoria, estado, autor_nombre, autor_id, created_at')
      .order('created_at', { ascending: false })

    setRelatos(data || [])
    setCargando(false)
  }

  async function aprobar(id: string) {
    await supabase.from('relatos').update({ estado: 'publicado' }).eq('id', id)
    cargarRelatos()
  }

  async function eliminar(id: string) {
    if (!confirm('¿Eliminar este relato permanentemente?')) return
    await supabase.from('relatos').delete().eq('id', id)
    cargarRelatos()
  }

  if (autorizado === null || cargando) return null

  if (!autorizado) {
    return (
      <main className="min-h-screen bg-[#080604] flex items-center justify-center text-center px-6">
        <p className="font-serif text-2xl italic text-[#5c5040]">No tienes acceso a esta página.</p>
      </main>
    )
  }

  const pendientes = relatos.filter((r) => r.estado === 'pendiente')
  const publicados = relatos.filter((r) => r.estado === 'publicado')

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-4xl mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Panel de control
      </p>
      <h1 className="font-serif text-4xl italic text-[#ede5d0] mb-10">
        Administrar relatos
      </h1>

      <section className="mb-14">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#b02020] mb-4">
          Pendientes de revisión ({pendientes.length})
        </p>
        {pendientes.length === 0 ? (
          <p className="text-[#5c5040] italic">No hay relatos pendientes.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pendientes.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 border border-[#2e2518] px-4 py-3">
                <div>
                  <p className="font-serif text-[#ede5d0]">{r.titulo}</p>
                  <p className="font-mono text-[10px] text-[#5c5040]">
                    {r.categoria} · {r.autor_nombre || 'Anónimo'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => aprobar(r.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] border border-[#2e7d32] text-[#4caf50] px-3 py-2 hover:bg-[#2e7d32] hover:text-[#ede5d0] transition-colors"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => eliminar(r.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] border border-[#7a1515] text-[#b02020] px-3 py-2 hover:bg-[#7a1515] hover:text-[#ede5d0] transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5c5040] mb-4">
          Publicados ({publicados.length})
        </p>
        <div className="flex flex-col gap-3">
          {publicados.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4 border border-[#1f1a12] px-4 py-3">
              <div>
                <p className="font-serif text-[#ede5d0]">{r.titulo}</p>
                <p className="font-mono text-[10px] text-[#5c5040]">
                  {r.categoria} · {r.autor_nombre || 'Con cuenta'}
                </p>
              </div>
              <button
                onClick={() => eliminar(r.id)}
                className="font-mono text-[10px] uppercase tracking-[0.15em] border border-[#7a1515] text-[#b02020] px-3 py-2 hover:bg-[#7a1515] hover:text-[#ede5d0] transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}