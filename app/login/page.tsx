'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#080604] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3 text-center">
          Regresa a la oscuridad
        </p>
        <h1 className="font-serif text-4xl italic text-[#ede5d0] text-center mb-10">
          Iniciar sesión
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#191410] border border-[#2e2518] text-[#ede5d0] px-4 py-3 outline-none focus:border-[#7a1515] font-serif"
          />

          {error && (
            <p className="text-[#b02020] text-sm font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-mono text-[11px] tracking-[0.3em] uppercase bg-[#7a1515] text-[#ede5d0] border border-[#b02020] px-6 py-4 hover:bg-[#b02020] transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center mt-6 font-mono text-[11px] text-[#5c5040]">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-[#b8842a] hover:text-[#d4a848]">
            Regístrate
          </Link>
        </p>

      </div>
    </main>
  )
}