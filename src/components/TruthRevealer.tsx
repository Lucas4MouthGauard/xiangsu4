import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, AlertTriangle, Zap, Globe, Rocket, RefreshCw } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './TruthRevealer.css'

interface TruthRevealerProps {
  onReset: () => void
}

const TruthRevealer: React.FC<TruthRevealerProps> = ({ onReset }) => {
  const [currentRevelation, setCurrentRevelation] = useState(0)
  const [showFinalTruth, setShowFinalTruth] = useState(false)
  const [isRevealing, setIsRevealing] = useState(true)

  const revelations = [
    {
      id: 'final',
      title: '最终真相：PumpAlien的终极计划',
      content: 'PumpAlien计划将地球变成他的能量农场，利用人类的Crypto狂热收集无限能量。',
      impact: '文明级威胁',
      icon: '🌍'
    },
    {
      id: 'method',
      title: '收集方法：Crypto作为能量收集器',
      content: '每一次代币交易、每一个新代币创建，都在为PumpAlien提供能量。',
      impact: '全球范围',
      icon: '⚡'
    },
    {
      id: 'consequence',
      title: '后果：人类文明的终结',
      content: '当能量收集完成，PumpAlien将启动终极计划，重塑地球文明。',
      impact: '物种灭绝',
      icon: '💀'
    }
  ]

  useEffect(() => {
    // 自动揭示真相
    const interval = setInterval(() => {
      if (currentRevelation < revelations.length - 1) {
        setCurrentRevelation(prev => prev + 1)
      } else {
        setShowFinalTruth(true)
        setIsRevealing(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentRevelation, revelations.length])

  const handleReset = () => {
    onReset()
  }

  return (
    <section id="truth-revealer" className="truth-revealer">
      <div className="truth-container">
        {/* 背景效果 */}
        <div className="truth-background">
          <div className="energy-storm">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="energy-particle"
                animate={{
                  x: [0, Math.random() * 400 - 200],
                  y: [0, Math.random() * 400 - 200],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="truth-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="truth-icon">👽</div>
          <h1 className="truth-title">真相完全揭露</h1>
          <p className="truth-subtitle">PumpAlien计划已启动，地球文明面临终极考验</p>
        </motion.div>

        {/* 真相揭示过程 */}
        <div className="revelations-container">
          {revelations.map((revelation, index) => (
            <motion.div
              key={revelation.id}
              className={`revelation-item ${currentRevelation >= index ? 'revealed' : ''} ${
                currentRevelation === index ? 'active' : ''
              }`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: currentRevelation >= index ? 1 : 0,
                x: currentRevelation >= index ? 0 : -100
              }}
              transition={{ duration: 0.8, delay: index * 0.5 }}
            >
              <div className="revelation-header">
                <div className="revelation-icon">{revelation.icon}</div>
                <div className="revelation-content">
                  <h3 className="revelation-title">{revelation.title}</h3>
                  <p className="revelation-text">{revelation.content}</p>
                  <div className="revelation-impact">
                    <span className="impact-label">影响等级:</span>
                    <span className="impact-value">{revelation.impact}</span>
                  </div>
                </div>
              </div>
              
              {currentRevelation === index && (
                <motion.div
                  className="revelation-progress"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* 最终真相 */}
        <AnimatePresence>
          {showFinalTruth && (
            <motion.div
              className="final-truth"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="final-truth-content">
                <div className="truth-symbol">☠️</div>
                <h2 className="final-title">人类文明的终结</h2>
                <div className="truth-summary">
                  <div className="summary-item">
                    <Globe className="summary-icon" />
                    <div className="summary-content">
                      <h4>地球命运</h4>
                      <p>地球将成为PumpAlien的能量农场，人类文明将被重塑</p>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <Zap className="summary-icon" />
                    <div className="summary-content">
                      <h4>能量收集</h4>
                      <p>通过Crypto交易收集的能量将用于启动终极计划</p>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <Rocket className="summary-icon" />
                    <div className="summary-content">
                      <h4>星际扩张</h4>
                      <p>PumpAlien计划利用地球能量进行星际扩张</p>
                    </div>
                  </div>
                </div>
                
                <div className="truth-quote">
                  <blockquote>
                    "Alon不在地球，只有PumpAlien在不断变强。Crypto只是外星人的试验场，每一笔交易都为PumpAlien提供力量。当能量充满，地球将成为他的舞台。"
                  </blockquote>
                  <cite>- PumpAlien计划档案</cite>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 行动选择 */}
        <motion.div
          className="truth-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="action-options">
            <button className="action-btn accept">
              <Eye className="btn-icon" />
              接受真相
            </button>
            <button className="action-btn resist">
              <Zap className="btn-icon" />
              抵抗计划
            </button>
            <button className="action-btn escape">
              <Rocket className="btn-icon" />
              逃离地球
            </button>
          </div>
          
          <div className="reset-option">
            <p>想要重新体验故事？</p>
            <button className="reset-btn" onClick={handleReset}>
              <RefreshCw className="btn-icon" />
              重新开始
            </button>
          </div>
        </motion.div>

        {/* 警告信息 */}
        <motion.div
          className="final-warning"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <div className="warning-content">
            <AlertTriangle className="warning-icon-large" />
            <div className="warning-text">
              <h3>⚠️ 终极警告</h3>
              <p>PumpAlien计划已经启动，地球文明面临前所未有的威胁。</p>
              <p className="warning-highlight">
                这不是游戏，这是现实。每一次Crypto交易都在加速人类的终结。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 统计总结 */}
        <motion.div
          className="truth-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <h3>真相揭露统计</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">能量收集完成</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">故事章节完成</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">影响范围</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">☠️</span>
              <span className="stat-label">文明威胁等级</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TruthRevealer
