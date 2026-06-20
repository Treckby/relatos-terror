'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

function generarSlug(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 7)
}

const categorias = ['Terror', 'Suspenso', 'Misterio', 'Terror gótico', 'Folklore']

export default function Publicar() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [requiereRevision, setRequiereRevision] = useState(false)

  const [titulo, setTitulo] = useState('')
  const [extracto, setExtracto] = useState('')
  const [contenido, setContenido] = useState('')
  const [categoria, setCategoria] = useState(categorias[0])
  const [seudonimo, setSeudonimo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [etiquetasTexto, setEtiquetasTexto] = useState('')

  const [portadaArchivo, setPortadaArchivo] = useState<File | null>(null)
  const [portadaPreview, setPortadaPreview] = useState('')
  const [retoMes, setRetoMes] = useState('')

  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setChecking(false)
    })

    supabase
      .from('configuracion')
      .select('requiere_revision, reto_mes')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setRequiereRevision(data.requiere_revision)
          setRetoMes(data.reto_mes || '')
        }
      })
  }, [])
  function handlePortada(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setPortadaArchivo(file)
      setPortadaPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = generarSlug(titulo)
    const tiempoLectura = Math.max(1, Math.round(contenido.split(' ').length / 200))
    const necesitaRevision = !user && requiereRevision
    const etiquetas = etiquetasTexto
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.length > 0)
    let portadaUrl: string | null = null

    if (portadaArchivo) {
      const ext = portadaArchivo.name.split('.').pop()
      const path = `${slug}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('portadas')
        .upload(path, portadaArchivo, { upsert: true })

      if (uploadError) {
        setError(uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('portadas').getPublicUrl(path)
      portadaUrl = urlData.publicUrl
    }
    const { error: insertError } = await supabase.from('relatos').insert({
      titulo,
      slug,
      contenido,
      extracto,
      categoria,
      etiquetas,
      portada_url: portadaUrl,
      tiempo_lectura: tiempoLectura,
      autor_id: user ? user.id : null,
      autor_nombre: user ? null : (seudonimo.trim() || 'Anónimo'),
      estado: necesitaRevision ? 'pendiente' : 'publicado',
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    if (necesitaRevision) {
      setEnviado(true)
      setLoading(false)
    } else {
      router.push(`/relatos/${slug}`)
    }
  }

  if (checking) return null

  if (enviado) {
    return (
      <main className="min-h-screen bg-[#080604] flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-4">
          Recibido
        </p>
        <h1 className="font-serif text-3xl italic text-[#ede5d0] mb-4">
          Tu relato fue enviado
        </h1>
        <p className="text-[#a89878] italic max-w-md">
          Quedará pendiente de revisión antes de publicarse en el sitio.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-2xl mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Comparte tu oscuridad
      </p>
      <h1 className="font-serif text-4xl italic text-[#ede5d0] mb-4">
        Publicar relato
      </h1>
      {retoMes && (
        <div className="border border-[#3d3020] px-5 py-4 mb-8">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7a1515] block mb-1">
            Inspírate con el reto del mes
          </span>
          <span className="font-serif italic text-[#ede5d0]">{retoMes}</span>
        </div>
      )}

      {!user && (
        <p className="text-[#5c5040] italic text-sm mb-8">
          Puedes publicar sin crear una cuenta. Si quieres llevar registro de tus relatos y recibir comentarios en tu perfil,{' '}
          <a href="/registro" className="text-[#b8842a] hover:text-[#d4a848] underline">crea una cuenta</a>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <input
          type="text"
          placeholder="Título del relato"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif text-lg"
        />

        {!user && (
          <input
            type="text"
            placeholder="Tu nombre o seudónimo (opcional)"
            value={seudonimo}
            onChange={(e) => setSeudonimo(e.target.value)}
            className="bg-[#191410] border border-[#2e2518] text-[#a89878] px-4 py-3 outline-none focus:border-[#7a1515] font-mono text-sm"
          />
        )}

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-mono text-sm"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] block mb-2">
            Imagen de portada (opcional)
          </label>
          {portadaPreview && (
            <img src={portadaPreview} alt="preview" className="w-full max-h-60 object-cover mb-3 border border-[#2e2518]" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePortada}
            className="text-[#a89878] font-mono text-sm"
          />
        </div>
        <input
          type="text"
          placeholder="Etiquetas separadas por comas (ej: casa embrujada, niños, pueblo)"
          value={etiquetasTexto}
          onChange={(e) => setEtiquetasTexto(e.target.value)}
          className="bg-[#191410] border border-[#2e2518] text-[#a89878] px-4 py-3 outline-none focus:border-[#7a1515] font-mono text-sm"
        />

        <textarea
          placeholder="Extracto breve (aparece en el catálogo)"
          value={extracto}
          onChange={(e) => setExtracto(e.target.value)}
          rows={2}
          className="bg-[#191410] border border-[#2e2518] text-[#a89878] px-4 py-3 outline-none focus:border-[#7a1515] font-serif italic resize-none"
        />

        <textarea
          placeholder="Escribe tu relato completo aquí..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
          rows={16}
          className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif leading-relaxed resize-none"
        />

        {error && (
          <p className="text-[#b02020] text-sm font-mono">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="font-mono text-[11px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-6 py-4 hover:bg-[#b02020] transition-colors disabled:opacity-50"
        >
          {loading ? 'Publicando...' : 'Publicar relato'}
        </button>

      </form>
    </main>
  )
}