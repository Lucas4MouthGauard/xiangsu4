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
          <h2 className="section-title">Timeline: The Path of Truth</h2>
          <p className="section-subtitle">From Alon's disappearance to the revelation of PumpAlien's plan</p>
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
                    <span>Earth / Solana Chain</span>
                  </div>
                </div>
                
                <div className="event-story">
                  <h4>Event Details</h4>
                  <p>{pumpAlienStory.timeline[selectedEvent].description}</p>
                  
                  {selectedEvent === 0 && (
                    <div className="story-highlight">
                      <p>"The real Alon disappeared in a spaceship, leaving only legends on Earth."</p>
                    </div>
                  )}
                  
                  {selectedEvent === 1 && (
                    <div className="story-highlight warning">
                      <p>"PumpAlien began taking over the PumpFun empire, with humans completely unaware."</p>
                    </div>
                  )}
                  
                  {selectedEvent === 2 && (
                    <div className="story-highlight danger">
                      <p>"Crypto became an alien testing ground, with every transaction collecting energy."</p>
                    </div>
                  )}
                  
                  {selectedEvent === 3 && (
                    <div className="story-highlight critical">
                      <p>"The truth is revealed, and PumpAlien's real plan comes to light."</p>
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
                          <h3>Timeline Summary</h3>
                          <p>From 2023 to 2025, PumpAlien's plan gradually unfolds. Each step is carefully designed to make humans unwittingly become tools for energy collection.</p>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Year Span</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Key Events</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Impact Scope</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
