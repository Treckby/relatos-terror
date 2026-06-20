'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'

export default function EditarPerfil() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      router.push('/login')
      return
    }
    setUser(data.user)

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (perfil) {
      setUsername(perfil.username)
      setBio(perfil.bio || '')
      setAvatarUrl(perfil.avatar_url || '')
    }
    setChecking(false)
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setArchivo(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError('')

    let nuevaAvatarUrl = avatarUrl

    if (archivo) {
      const ext = archivo.name.split('.').pop()
      const path = `${user.id}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, archivo, { upsert: true })

      if (uploadError) {
        setError(uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
      nuevaAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`
    }

    const { error: updateError } = await supabase
      .from('perfiles')
      .update({ bio, avatar_url: nuevaAvatarUrl })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push(`/perfil/${username}`)
  }

  if (checking) return null

  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-md mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Tu rincón oscuro
      </p>
      <h1 className="font-serif text-4xl italic text-[#ede5d0] mb-10">
        Editar perfil
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="flex flex-col items-center gap-4 mb-2">
          <div className="w-24 h-24 rounded-full bg-[#191410] border border-[#2e2518] overflow-hidden flex items-center justify-center relative">
            {preview || avatarUrl ? (
              <Image
                src={preview || avatarUrl}
                alt="avatar"
                fill
                className="object-cover"
              />
            ) : (
              <span className="font-serif text-3xl text-[#a89878]">
                {username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b8842a] hover:text-[#d4a848] cursor-pointer">
            Cambiar foto
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        </div>

        <textarea
          placeholder="Cuéntale a la comunidad sobre ti..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif italic resize-none"
        />

        {error && <p className="text-[#b02020] text-sm font-mono">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="font-mono text-[11px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-6 py-4 hover:bg-[#b02020] transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>

      </form>
    </main>
  )
}