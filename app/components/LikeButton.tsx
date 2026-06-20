'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function LikeButton({ relatoId }: { relatoId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [total, setTotal] = useState(0)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data: userData } = await supabase.auth.getUser()
    const uid = userData.user?.id ?? null
    setUserId(uid)

    const { count } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('relato_id', relatoId)

    setTotal(count || 0)

    if (uid) {
      const { data: miLike } = await supabase
        .from('likes')
        .select('id')
        .eq('relato_id', relatoId)
        .eq('user_id', uid)
        .maybeSingle()

      setLiked(!!miLike)
    }

    setCargando(false)
  }

  async function toggleLike() {
    if (!userId) return

    if (liked) {
      await supabase.from('likes').delete().eq('relato_id', relatoId).eq('user_id', userId)
      setLiked(false)
      setTotal((t) => t - 1)
    } else {
      await supabase.from('likes').insert({ relato_id: relatoId, user_id: userId })
      setLiked(true)
      setTotal((t) => t + 1)
    }
  }

  if (cargando) return null

  if (!userId) {
    return (
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#5c5040]">
        <span>♥ {total}</span>
        <Link href="/login" className="text-[#b8842a] hover:text-[#d4a848] underline">
          inicia sesión para dar like
        </Link>
      </div>
    )
  }

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase border px-4 py-2 transition-colors ${
        liked
          ? 'border-[#b02020] text-[#b02020] bg-[#7a1515]/10'
          : 'border-[#2e2518] text-[#5c5040] hover:border-[#7a1515] hover:text-[#b02020]'
      }`}
    >
      <span>{liked ? '♥' : '♡'}</span>
      <span>{total} {total === 1 ? 'like' : 'likes'}</span>
    </button>
  )
}