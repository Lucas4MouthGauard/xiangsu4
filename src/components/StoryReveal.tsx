import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Lock, Unlock, AlertTriangle } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './StoryReveal.css'

interface StoryRevealProps {
  currentChapter: number
  onNextChapter: () => void
}

const StoryReveal: React.FC<StoryRevealProps> = ({ currentChapter, onNextChapter }) => {
  const [revealedChapters, setRevealedChapters] = useState<number[]>([0])
  const [selectedChapter, setSelectedChapter] = useState<number>(0)
  const [showWarning, setShowWarning] = useState(false)

  const handleChapterReveal = (chapterIndex: number) => {
    if (chapterIndex <= currentChapter && !revealedChapters.includes(chapterIndex)) {
      setRevealedChapters(prev => [...prev, chapterIndex])
    }
    setSelectedChapter(chapterIndex)
  }

  const canRevealChapter = (chapterIndex: number) => {
    return chapterIndex <= currentChapter
  }

  return (
    <section id="story-reveal" className="story-reveal">
      <div className="story-reveal-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">真相揭示</h2>
          <p className="section-subtitle">逐步揭露PumpAlien的真实计划</p>
        </motion.div>

        <div className="chapters-grid">
          {pumpAlienStory.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              className={`chapter-card ${selectedChapter === index ? 'selected' : ''} ${
                canRevealChapter(index) ? 'unlocked' : 'locked'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleChapterReveal(index)}
            >
              <div className="chapter-header">
                <div className="chapter-icon" style={{ color: chapter.color }}>
                  {chapter.icon}
                </div>
                <div className="chapter-status">
                  {canRevealChapter(index) ? (
                    <Unlock className="status-icon unlocked" />
                  ) : (
                    <Lock className="status-icon locked" />
                  )}
                </div>
              </div>

              <h3 className="chapter-title">{chapter.title}</h3>
              <p className="chapter-subtitle">{chapter.subtitle}</p>

              <AnimatePresence>
                {revealedChapters.includes(index) && (
                  <motion.div
                    className="chapter-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{chapter.content}</p>
                    
                    {index === 3 && (
                      <motion.div
                        className="warning-box"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        onAnimationComplete={() => setShowWarning(true)}
                      >
                        <AlertTriangle className="warning-icon" />
                        <span>⚠️ 危险：你已进入真相区域</span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="chapter-actions">
                {canRevealChapter(index) ? (
                  <button
                    className="reveal-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleChapterReveal(index)
                    }}
                  >
                    <Eye className="btn-icon" />
                    {revealedChapters.includes(index) ? '已揭示' : '揭示真相'}
                  </button>
                ) : (
                  <button className="lock-btn" disabled>
                    <Lock className="btn-icon" />
                    需要解锁
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 全局警告 */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="global-warning"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="warning-content">
                <AlertTriangle className="warning-icon-large" />
                <div className="warning-text">
                  <h3>⚠️ 真相警告</h3>
                  <p>你正在接近PumpAlien计划的真相。继续前进将揭示令人震惊的事实。</p>
                  <p className="warning-highlight">"人类以为自己在玩币，但其实币在玩人"</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 继续按钮 */}
        {currentChapter < 4 && (
          <motion.div
            className="continue-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button className="continue-btn" onClick={onNextChapter}>
              <Eye className="btn-icon" />
              继续揭示下一章
            </button>
            <p className="continue-hint">解锁更多真相，了解PumpAlien的终极计划</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default StoryReveal
