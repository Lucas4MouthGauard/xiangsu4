import React, { useEffect, useRef } from 'react'
import './PixelParticles.css'

const PixelParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 像素粒子类
    class PixelParticle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      life: number
      maxLife: number
      pixelated: boolean

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.size = Math.floor(Math.random() * 4 + 2) * 2 // 确保是偶数，保持像素对齐
        this.color = `hsl(${180 + Math.random() * 60}, 100%, 70%)`
        this.alpha = Math.random() * 0.6 + 0.4
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
        this.pixelated = Math.random() > 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++

        // 边界检测
        if (this.x < 0 || this.x > (canvas?.width || 0)) this.vx *= -1
        if (this.y < 0 || this.y > (canvas?.height || 0)) this.vy *= -1

        // 粒子生命周期
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * (canvas?.width || 0)
          this.y = Math.random() * (canvas?.height || 0)
        }
      }

      draw() {
        if (!ctx) return
        
        ctx.save()
        ctx.globalAlpha = this.alpha * (1 - this.life / this.maxLife)
        ctx.fillStyle = this.color
        
        if (this.pixelated) {
          // 像素风格绘制
          const pixelSize = this.size / 2
          for (let px = 0; px < this.size; px += pixelSize) {
            for (let py = 0; py < this.size; py += pixelSize) {
              ctx.fillRect(
                Math.floor(this.x + px), 
                Math.floor(this.y + py), 
                pixelSize, 
                pixelSize
              )
            }
          }
        } else {
          // 普通绘制
          ctx.fillRect(
            Math.floor(this.x), 
            Math.floor(this.y), 
            this.size, 
            this.size
          )
        }
        
        ctx.restore()
      }
    }

    // 创建粒子数组
    const particles: PixelParticle[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push(new PixelParticle())
    }

    // 动画循环
    const animate = () => {
      // 清除画布
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // 绘制像素连接线
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          )

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.4
            ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`
            ctx.lineWidth = 1
            
            // 像素风格的线条
            const steps = Math.floor(distance / 4)
            for (let step = 0; step < steps; step++) {
              const t = step / steps
              const x = Math.floor(particle.x + (otherParticle.x - particle.x) * t)
              const y = Math.floor(particle.y + (otherParticle.y - particle.y) * t)
              
              ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`
              ctx.fillRect(x, y, 1, 1)
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pixel-particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default PixelParticles
