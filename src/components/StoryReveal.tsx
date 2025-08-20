import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './StoryReveal.css'

interface StoryRevealProps {
  currentChapter: number
  onNextChapter: () => void
}

const StoryReveal: React.FC<StoryRevealProps> = ({ currentChapter, onNextChapter }) => {
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([0])
  const [selectedChapter, setSelectedChapter] = useState<number>(0)
  const [interactionProgress, setInteractionProgress] = useState<{[key: number]: number}>({})

  const handleInteraction = (chapterIndex: number, interactionType: string) => {
    const currentProgress = interactionProgress[chapterIndex] || 0
    const newProgress = Math.min(100, currentProgress + 25)
    
    setInteractionProgress(prev => ({
      ...prev,
      [chapterIndex]: newProgress
    }))
    
    if (newProgress >= 100 && !unlockedChapters.includes(chapterIndex)) {
      setUnlockedChapters(prev => [...prev, chapterIndex])
    }
  }

  const canUnlockChapter = (chapterIndex: number) => {
    return unlockedChapters.includes(chapterIndex)
  }

  const getInteractionTasks = (chapterIndex: number) => {
    const chapterTasks = [
      [
        { type: 'ufo', label: 'Destroy UFO', icon: '🛸', action: 'destroy_ufo', description: 'Shoot down alien reconnaissance ship' },
        { type: 'capsule', label: 'Take Pump Capsule', icon: '💊', action: 'take_capsule', description: 'Enhance your perception abilities' },
        { type: 'twitter', label: 'Follow Twitter', icon: '🐦', action: 'follow_twitter', description: 'Get latest intelligence' },
        { type: 'hack', label: 'Hack System', icon: '💻', action: 'hack_system', description: 'Crack alien systems' }
      ],
              [
          { type: 'scan', label: 'Scan Signal', icon: '📡', action: 'scan_signal', description: 'Track alien communications' },
          { type: 'decrypt', label: 'Decrypt Files', icon: '🔐', action: 'decrypt_file', description: 'Crack classified archives' },
          { type: 'infiltrate', label: 'Infiltrate Base', icon: '🕵️', action: 'infiltrate_base', description: 'Go deep behind enemy lines' },
          { type: 'extract', label: 'Extract Sample', icon: '🧬', action: 'extract_sample', description: 'Obtain alien DNA' }
        ],
              [
          { type: 'activate', label: 'Activate Device', icon: '⚡', action: 'activate_device', description: 'Start countermeasure system' },
          { type: 'deploy', label: 'Deploy Trap', icon: '🪤', action: 'deploy_trap', description: 'Set up capture device' },
          { type: 'signal', label: 'Send Signal', icon: '📶', action: 'send_signal', description: 'Contact Earth headquarters' },
          { type: 'prepare', label: 'Prepare Weapons', icon: '🔫', action: 'prepare_weapon', description: 'Arm to the teeth' }
        ],
              [
          { type: 'assemble', label: 'Assemble Device', icon: '🔧', action: 'assemble_device', description: 'Build ultimate weapon' },
          { type: 'charge', label: 'Charge System', icon: '🔋', action: 'charge_system', description: 'Prepare for final battle' },
          { type: 'coordinate', label: 'Coordinate Action', icon: '🎯', action: 'coordinate_action', description: 'Unified command' },
          { type: 'launch', label: 'Launch Missile', icon: '🚀', action: 'launch_missile', description: 'Launch total attack' }
        ],
              [
          { type: 'finalize', label: 'Final Confirmation', icon: '✅', action: 'finalize_plan', description: 'Confirm action plan' },
          { type: 'execute', label: 'Execute Plan', icon: '🎬', action: 'execute_plan', description: 'Begin final action' },
          { type: 'confront', label: 'Direct Confrontation', icon: '⚔️', action: 'confront_alien', description: 'Final battle with PumpAlien' },
          { type: 'victory', label: 'Celebrate Victory', icon: '🏆', action: 'celebrate_victory', description: 'Save Earth' }
        ]
    ]
    return chapterTasks[chapterIndex] || []
  }

  // 判断图片类型，返回对应的CSS类名
  const getImageType = (imagePath: string) => {
    if (imagePath.includes('logo') || imagePath.includes('alonog')) {
      return 'image-logo' // 正方形logo图片
    } else if (imagePath.includes('banner')) {
      return 'image-banner' // 横幅图片
    } else {
      return 'image-default' // 默认图片
    }
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
          <h2 className="section-title">PUMPALIEN Truth Revelation Plan</h2>
          <p className="section-subtitle">The Complete PumpAlien Story</p>
        </motion.div>



        <div className="chapters-grid">
          {pumpAlienStory.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              className={`chapter-card ${selectedChapter === index ? 'selected' : ''} ${
                canUnlockChapter(index) ? 'unlocked' : 'locked'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedChapter(index)}
            >
              <div className="chapter-header">
                <div className="chapter-icon" style={{ color: chapter.color }}>
                  {chapter.icon}
                </div>
                <div className="chapter-status">
                  {canUnlockChapter(index) ? (
                    <Unlock className="status-icon unlocked" />
                  ) : (
                    <Lock className="status-icon locked" />
                  )}
                </div>
              </div>

              <h3 className="chapter-title">{chapter.title}</h3>
              <p className="chapter-subtitle">{chapter.subtitle}</p>

              {/* 交互任务区域 */}
              {!canUnlockChapter(index) && (
                <div className="interaction-tasks">
                  <h4 className="tasks-title">Complete the following tasks to unlock chapters</h4>
                  <div className="tasks-grid">
                    {getInteractionTasks(index).map((task, taskIndex) => (
                      <motion.button
                        key={task.type}
                        className={`task-btn ${task.type}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleInteraction(index, task.action)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="task-icon">{task.icon}</div>
                        <div className="task-content">
                          <span className="task-label">{task.label}</span>
                          <span className="task-description">{task.description}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${interactionProgress[index] || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                                      <p className="progress-text">{interactionProgress[index] || 0}% Complete</p>
                </div>
              )}

              {/* 已解锁章节内容 */}
              <AnimatePresence>
                {canUnlockChapter(index) && (
                  <motion.div
                    className="chapter-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="chapter-image-container"
                      style={{
                        width: getImageType(chapter.image) === 'image-logo' ? '250px' : 
                               getImageType(chapter.image) === 'image-banner' ? '350px' : '300px',
                        height: getImageType(chapter.image) === 'image-logo' ? '250px' : '200px',
                        padding: getImageType(chapter.image) === 'image-logo' ? 'var(--spacing-md)' : '0'
                      }}
                    >
                      <img 
                        src={chapter.image} 
                        alt={chapter.title}
                        className={`chapter-image ${getImageType(chapter.image)}`}
                      />
                    </div>
                    <p>{chapter.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>




              </div>

        {/* 解救Alon计划模块 */}
        <motion.div
          className="rescue-plan-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="rescue-plan-container">
            {/* 模块标题区域 */}
            <div className="rescue-plan-header">
              <div className="rescue-plan-icon">🚀</div>
              <h3 className="rescue-plan-title">Rescue Alon Plan</h3>
              <p className="rescue-plan-subtitle">Buy $PumpAlien tokens to save Earth!</p>
            </div>
            
            {/* 主要内容区域 */}
            <div className="rescue-plan-main">
              {/* 中央：PumpAlien Logo + 文字 + 按钮 */}
              <div className="rescue-plan-card main-action-card">
                <div className="card-header">
                  <div className="card-icon">🚀</div>
                  <h4>Rescue Mission</h4>
                </div>
                <div className="card-content">
                  {/* PumpAlien Logo 图片 */}
                  <div className="pumpalien-logo-section">
                    <img src="../../images/pumpalienlogo.png" alt="PumpAlien Logo" className="pumpalien-logo" />
                  </div>
                  
                  {/* 描述文字 */}
                  <p className="rescue-description">
                    Every $PumpAlien transaction provides funding for the rescue operation
                  </p>
                  
                  {/* 行动按钮 */}
                  <button id="buy-pumpalien-btn" className="rescue-cta-btn">
                    <span className="btn-icon">💰</span>
                    <span className="btn-text">BUY $PumpAlien</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

export default StoryReveal
