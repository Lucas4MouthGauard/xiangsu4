import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, AlertTriangle } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './Timeline.css'

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0)
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const handleEventSelect = (index: number) => {
    setSelectedEvent(index)
    setShowDetails(true)
  }

  return (
    <section id="timeline" className="pump-alien-timeline">
      <div className="timeline-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">时间线：真相的轨迹</h2>
          <p className="section-subtitle">从Alon消失到PumpAlien计划的揭露</p>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-line">
            {pumpAlienStory.timeline.map((event, index) => (
              <motion.div
                key={index}
                className={`timeline-event ${selectedEvent === index ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleEventSelect(index)}
              >
                <div className="event-marker">
                  <div className="event-dot"></div>
                  <div className="event-connector"></div>
                </div>
                
                <div className="event-content">
                  <div className="event-header">
                    <div className="event-year">{event.year}</div>
                    <div className="event-icon">
                      {index === 0 && <MapPin />}
                      {index === 1 && <AlertTriangle />}
                      {index === 2 && <Clock />}
                      {index === 3 && <Calendar />}
                    </div>
                  </div>
                  
                  <h3 className="event-title">{event.event}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 事件详情面板 */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="event-details-panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="details-header">
                <h3>{pumpAlienStory.timeline[selectedEvent].event}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowDetails(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="details-content">
                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar className="meta-icon" />
                    <span>{pumpAlienStory.timeline[selectedEvent].year}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin className="meta-icon" />
                    <span>地球 / Solana链</span>
                  </div>
                </div>
                
                <div className="event-story">
                  <h4>事件详情</h4>
                  <p>{pumpAlienStory.timeline[selectedEvent].description}</p>
                  
                  {selectedEvent === 0 && (
                    <div className="story-highlight">
                      <p>"真正的Alon消失在宇宙飞船中，留下的只有地球上的传说。"</p>
                    </div>
                  )}
                  
                  {selectedEvent === 1 && (
                    <div className="story-highlight warning">
                      <p>"PumpAlien开始接管PumpFun帝国，人类毫无察觉。"</p>
                    </div>
                  )}
                  
                  {selectedEvent === 2 && (
                    <div className="story-highlight danger">
                      <p>"Crypto成为外星人的试验场，每一笔交易都在收集能量。"</p>
                    </div>
                  )}
                  
                  {selectedEvent === 3 && (
                    <div className="story-highlight critical">
                      <p>"真相揭露，PumpAlien的真实计划浮出水面。"</p>
                    </div>
                  )}
                </div>
                
                <div className="event-impact">
                  <h4>影响评估</h4>
                  <div className="impact-meter">
                    <div className="impact-label">对人类文明的影响</div>
                    <div className="impact-bar">
                      <div 
                        className="impact-fill"
                        style={{ 
                          width: `${(selectedEvent + 1) * 25}%`,
                          backgroundColor: selectedEvent >= 2 ? '#ff4444' : '#ffaa00'
                        }}
                      ></div>
                    </div>
                    <div className="impact-level">
                      {selectedEvent === 0 && '低'}
                      {selectedEvent === 1 && '中'}
                      {selectedEvent === 2 && '高'}
                      {selectedEvent === 3 && '极高'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 时间线总结 */}
        <motion.div
          className="timeline-summary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="summary-content">
            <h3>时间线总结</h3>
            <p>从2023年到2025年，PumpAlien的计划逐步展开。每一步都精心设计，让人类在不知不觉中成为能量收集的工具。</p>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">年时间跨度</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">关键事件</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">影响范围</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
