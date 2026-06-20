'use client'

import { useEffect, useRef } from 'react'

export default function Particulas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W
      canvas!.height = H
    }
    window.addEventListener('resize', resize)

    class Particula {
      x = Math.random() * W
      y = Math.random() * H
      size = Math.random() * 1.8 + 0.4
      speedY = -(Math.random() * 0.3 + 0.1)
      speedX = (Math.random() - 0.5) * 0.3
      opacity = Math.random() * 0.4 + 0.1

      actualizar() {
        this.y += this.speedY
        this.x += this.speedX
        if (this.y < -10) {
          this.y = H + 10
          this.x = Math.random() * W
        }
      }

      dibujar() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(184, 132, 42, ${this.opacity})`
        ctx!.fill()
      }
    }

    const particulas = Array.from({ length: 60 }, () => new Particula())

    let animId: number
    function animar() {
      ctx!.clearRect(0, 0, W, H)
      particulas.forEach((p) => {
        p.actualizar()
        p.dibujar()
      })
      animId = requestAnimationFrame(animar)
    }
    animar()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}