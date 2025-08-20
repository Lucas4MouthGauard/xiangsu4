import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Eye, Zap, AlertTriangle } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './Hero.css'

interface HeroProps {
  currentChapter: number
  onChapterChange: (chapter: number) => void
}

const Hero: React.FC<HeroProps> = ({ currentChapter, onChapterChange }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] => [false]
  const [typedText, setTypedText] = useState('')
  const [showWarning, setShowWarning] = useState(false)

  const currentStory = pumpAlienStory.chapters[currentChapter]

  useEffect(() => {
    // 打字机效果
    let index = 0
    const text = currentStory.content
    setIsTyping(true)
    setTypedText('')
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentChapter])

  useEffect(() => {
    // 显示警告
    if (currentChapter >= 3) {
      const timer = setTimeout(() => setShowWarning(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [currentChapter])

  const scrollToNext = () => {
    const nextSection = document.getElementById('story-reveal')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="pump-alien-hero" ref={heroRef}>
      {/* 动态背景 */}
      <div className="hero-background">
        <div className="crypto-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="crypto-particle"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        <div className="energy-grid">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="energy-line"
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* 章节指示器 */}
          <motion.div
            className="chapter-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="chapter-number">{currentChapter + 1}</span>
            <span className="chapter-total">/5</span>
          </motion.div>

          {/* 警告横幅 */}
          <AnimatePresence>
            {showWarning && (
              <motion.div
                className="warning-banner"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <AlertTriangle className="warning-icon" />
                <span>⚠️ 警告：真相即将揭露，请谨慎前行</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 故事标题 */}
          <motion.div
            className="story-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="story-icon">{currentStory.icon}</div>
            <h1 className="story-title">{currentStory.title}</h1>
            <p className="story-subtitle">{currentStory.subtitle}</p>
          </motion.div>

          {/* 故事内容 */}
          <motion.div
            className="story-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="typing-container">
              <span className="typed-text">{typedText}</span>
              {isTyping && <span className="typing-cursor">|</span>}
            </div>
          </motion.div>

          {/* 行动按钮 */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <button 
              className="pump-btn primary"
              onClick={() => onChapterChange(Math.min(currentChapter + 1, 4))}
              disabled={currentChapter >= 4}
            >
              <Eye className="btn-icon" />
              {currentChapter >= 4 ? '故事结束' : '揭示下一章'}
            </button>
            
            <button 
              className="pump-btn secondary"
              onClick={() => onChapterChange(Math.max(currentChapter - 1, 0))}
              disabled={currentChapter <= 0}
            >
              <Zap className="btn-icon" />
              回顾上一章
            </button>
          </motion.div>

          {/* 进度指示器 */}
          <motion.div
            className="story-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <div className="progress-dots">
              {pumpAlienStory.chapters.map((_, index) => (
                <motion.div
                  key={index}
                  className={`progress-dot ${index <= currentChapter ? 'active' : ''}`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => onChapterChange(index)}
                />
              ))}
            </div>
            <span className="progress-text">
              第 {currentChapter + 1} 章 / 共 5 章
            </span>
          </motion.div>
        </motion.div>

        {/* 视觉元素 */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <div className="story-image-container">
            <motion.img
              src={currentStory.image}
              alt={currentStory.title}
              className="story-image"
              key={currentChapter}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              style={{ borderColor: currentStory.color }}
            />
            
            <motion.div
              className="energy-aura"
              style={{ borderColor: currentStory.color }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* 滚动指示器 */}
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
        <span>继续探索真相</span>
      </motion.button>
    </section>
  )
}

export default Hero
