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
      title: 'Final Truth: PumpAlien\'s Ultimate Plan',
      content: 'PumpAlien plans to turn Earth into his energy farm, using human Crypto frenzy to collect unlimited energy.',
      impact: 'Civilization-level threat',
      icon: '🌍'
    },
    {
      id: 'method',
      title: 'Collection Method: Crypto as Energy Collector',
      content: 'Every token transaction, every new token creation, provides energy for PumpAlien.',
      impact: 'Global scope',
      icon: '⚡'
    },
    {
      id: 'consequence',
      title: 'Consequence: End of Human Civilization',
      content: 'When energy collection is complete, PumpAlien will launch his ultimate plan to reshape Earth\'s civilization.',
      impact: 'Species extinction',
      icon: '💀'
    }
  ]

  useEffect(() => {
    // Auto-reveal truth
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
          <h1 className="truth-title">Truth Completely Revealed</h1>
          <p className="truth-subtitle">PumpAlien plan has been activated, Earth civilization faces ultimate test</p>
        </motion.div>

        {/* Truth revelation process */}
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
                      <h4>Earth\'s Fate</h4>
                      <p>Earth will become PumpAlien\'s energy farm, human civilization will be reshaped</p>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <Zap className="summary-icon" />
                    <div className="summary-content">
                      <h4>Energy Collection</h4>
                      <p>Energy collected through Crypto transactions will be used to launch the ultimate plan</p>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <Rocket className="summary-icon" />
                    <div className="summary-content">
                      <h4>Interstellar Expansion</h4>
                      <p>PumpAlien plans to use Earth\'s energy for interstellar expansion</p>
                    </div>
                  </div>
                </div>
                
                <div className="truth-quote">
                  <blockquote>
                    "Alon不在地球，只有PumpAlien在不断变强。Crypto只是外星人的试验场，每一笔交易都为PumpAlien提供力量。当能量充满，地球将成为他的舞台。"
                  </blockquote>
                  <cite>- PumpAlien Plan Archives</cite>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action choices */}
        <motion.div
          className="truth-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="action-options">
            <button className="action-btn accept">
              <Eye className="btn-icon" />
              Accept Truth
            </button>
            <button className="action-btn resist">
              <Zap className="btn-icon" />
              Resist Plan
            </button>
            <button className="action-btn escape">
              <Rocket className="btn-icon" />
              Escape Earth
            </button>
          </div>
          
          <div className="reset-option">
            <p>Want to experience the story again?</p>
            <button className="reset-btn" onClick={handleReset}>
              <RefreshCw className="btn-icon" />
              Start Over
            </button>
          </div>
        </motion.div>

        {/* Warning message */}
        <motion.div
          className="final-warning"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <div className="warning-content">
            <AlertTriangle className="warning-icon-large" />
            <div className="warning-text">
              <h3>⚠️ Ultimate Warning</h3>
              <p>PumpAlien plan has been activated, Earth civilization faces unprecedented threats.</p>
              <p className="warning-highlight">
                This is not a game, this is reality. Every Crypto transaction accelerates human extinction.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics summary */}
        <motion.div
          className="truth-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <h3>Truth Revelation Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Energy Collection Complete</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Story Chapters Complete</span>
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
