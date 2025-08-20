import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Zap, Eye, Rocket } from 'lucide-react'
import { brandConfig } from '../config/brand'
import './Hero.css'

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number
    type: 'ufo' | 'alien' | 'pump'
    x: number
    y: number
    delay: number
  }>>([])

  useEffect(() => {
    // 创建浮动元素
    const elements = []
    for (let i = 0; i < 12; i++) {
      elements.push({
        id: i,
        type: ['ufo', 'alien', 'pump'][Math.floor(Math.random() * 3)] as 'ufo' | 'alien' | 'pump',
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        delay: Math.random() * 10
      })
    }
    setFloatingElements(elements)

    // 鼠标移动效果
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e
        const { width, height, left, top } = heroRef.current.getBoundingClientRect()
        
        const x = (clientX - left - width / 2) / width
        const y = (clientY - top - height / 2) / height
        
        heroRef.current.style.setProperty('--mouse-x', `${x}`)
        heroRef.current.style.setProperty('--mouse-y', `${y}`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById('discovery')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getImageByType = (type: string) => {
    switch (type) {
      case 'ufo':
        return Math.random() > 0.5 ? brandConfig.images.ufo1 : brandConfig.images.ufo2
      case 'alien':
        return brandConfig.images.alien
      case 'pump':
        return brandConfig.images.pump
      default:
        return brandConfig.images.ufo1
    }
  }

  return (
    <section id="hero" className="pixel-hero" ref={heroRef}>
      {/* 浮动元素背景 */}
      <div className="floating-elements-container">
        {floatingElements.map((element) => (
          <motion.img
            key={element.id}
            src={getImageByType(element.type)}
            alt={element.type}
            className={`floating-element floating-${element.type}`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: element.delay * 0.2 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          />
        ))}
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Eye className="badge-icon" />
            <span>外星实体检测到</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="title-main">PUMPALIEN</span>
            <span className="title-sub">实体 XT-2024-001</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            在深空发现的神秘外星实体。与发现互动，探索其秘密。
            这里，现实与可能性交织，观察者与被观察者相互影响。
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <button className="pixel-btn-hero primary" onClick={() => {
              // 触发外星人反应
              const alienElements = document.querySelectorAll('.floating-alien')
              alienElements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add('reacting')
                  setTimeout(() => el.classList.remove('reacting'), 1000)
                }, index * 200)
              })
            }}>
              <Zap className="btn-icon" />
              开始接触
            </button>
            
            <button className="pixel-btn-hero secondary" onClick={() => {
              // 触发扫描效果
              document.querySelectorAll('.floating-ufo').forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add('scanning')
                  setTimeout(() => el.classList.remove('scanning'), 1500)
                }, index * 300)
              })
            }}>
              <Eye className="btn-icon" />
              扫描信号
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <div className="stat-item">
              <span className="stat-number">2024</span>
              <span className="stat-label">发现年份</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">👽</span>
              <span className="stat-label">外星实体</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">🌌</span>
              <span className="stat-label">宇宙空间</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">💊</span>
              <span className="stat-label">泵效应</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <div className="hero-image-grid">
            <motion.img
              src={brandConfig.images.alien}
              alt="PumpAlien Entity"
              className="hero-alien"
              whileHover={{ scale: 1.1, rotate: 5 }}
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
              dragElastic={0.1}
            />
            
            <motion.img
              src={brandConfig.images.pump}
              alt="Pump Effect"
              className="hero-pump"
              whileHover={{ scale: 1.2, rotate: -10 }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.img
              src={brandConfig.images.ufo1}
              alt="UFO 1"
              className="hero-ufo-1"
              whileHover={{ scale: 1.15, rotate: 15 }}
              animate={{ 
                x: [0, 20, 0],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <motion.img
              src={brandConfig.images.ufo2}
              alt="UFO 2"
              className="hero-ufo-2"
              whileHover={{ scale: 1.15, rotate: -15 }}
              animate={{ 
                x: [0, -20, 0],
                y: [0, 15, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        className="scroll-indicator"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowDown className="scroll-icon" />
        <span>向下滚动</span>
      </motion.button>
    </section>
  )
}

export default Hero
