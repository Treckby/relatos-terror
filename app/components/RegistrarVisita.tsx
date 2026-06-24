'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function RegistrarVisita() {
  const pathname = usePathname()

  useEffect(() => {
    const yaRegistrada = sessionStorage.getItem(`visita-${pathname}`)
    if (yaRegistrada) return

    supabase.rpc('incrementar_visita_pagina', { pagina_param: pathname }).then(() => {
      sessionStorage.setItem(`visita-${pathname}`, '1')
    })
  }, [pathname])

  return null
}