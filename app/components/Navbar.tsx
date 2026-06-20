'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 h-16 border-b border-[#1f1a12] bg-[#080604]/90 backdrop-blur-sm">

      <Link href="/" className="font-mono text-[13px] tracking-[0.3em] uppercase text-[#b02020]">
        Relatos Oscuros
      </Link>

      <ul className="flex items-center gap-6 md:gap-10 list-none">
        <li>
          <Link href="/relatos" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] hover:text-[#b8842a] transition-colors">
            Relatos
          </Link>
        </li>

        <li>
          <Link href="/publicar" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b02020] border border-[#7a1515] px-4 py-2 hover:bg-[#7a1515] hover:text-[#ede5d0] transition-colors">
            Publicar
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/favoritos" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] hover:text-[#b8842a] transition-colors">
                Favoritos
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] hover:text-[#b02020] transition-colors"
              >
                Salir
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c5040] hover:text-[#b8842a] transition-colors">
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>

    </nav>
  )
}