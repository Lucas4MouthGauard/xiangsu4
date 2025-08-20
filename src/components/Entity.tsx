import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Dna, Zap, Brain, Shield } from 'lucide-react'
import { brandConfig } from '../config/brand'
import './Entity.css'

const Entity: React.FC = () => {
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null)

  const entityInfo = [
    {
      id: 'biology',
      icon: <Dna />,
      title: '🧬 生物学',
      description: '能量-物质混合形态',
      details: 'PumpAlien呈现出独特的能量-物质混合形态，能够在固体、液体和等离子体状态之间自由转换。其细胞结构包含未知的量子元素，使其具有超强的适应能力。',
      color: '#00ff88'
    },
    {
      id: 'tech',
      icon: <Zap />,
      title: '⚡ 技术',
      description: '先进的能量操控',
      details: '该实体掌握了超越我们理解的能源技术，能够操控引力波、暗物质和量子纠缠。其技术水平至少领先地球文明数千年。',
      color: '#ff00ff'
    },
    {
      id: 'behavior',
      icon: <Brain />,
      title: '🧠 行为',
      description: '非敌对，心灵感应',
      details: 'PumpAlien表现出和平友好的行为模式，具有强大的心灵感应能力。它能够直接与观察者进行思想交流，传递复杂的科学概念。',
      color: '#4f46e5'
    },
    {
      id: 'defense',
      icon: <Shield />,
      title: '🛡️ 防御',
      description: '多维防护系统',
      details: '实体周围存在强大的多维防护场，能够抵御各种形式的攻击。这种防护系统基于未知的物理原理，可能是其文明的核心技术。',
      color: '#ff6b35'
    }
  ]

  return (
    <section id="entity" className="pixel-entity">
      <div className="entity-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">PumpAlien 实体</h2>
          <p className="section-subtitle">关于我们宇宙访客的已知信息</p>
        </motion.div>

        <div className="entity-display">
          <motion.div 
            className="entity-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="alien-core">
              <motion.img
                src={brandConfig.images.alien}
                alt="PumpAlien Entity"
                className="alien-core-img"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="energy-rings">
                <motion.div 
                  className="ring ring-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="ring ring-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="ring ring-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <motion.img
                src={brandConfig.images.pump}
                alt="Pump Effect"
                className="pump-effect"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
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
                className="ufo-orbital-1"
                animate={{ 
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  rotate: [0, 90, 180]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.img
                src={brandConfig.images.ufo2}
                alt="UFO 2"
                className="ufo-orbital-2"
                animate={{ 
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                  rotate: [0, -90, -180]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>

          <div className="entity-info">
            {entityInfo.map((info, index) => (
              <motion.div
                key={info.id}
                className={`info-card ${selectedInfo === info.id ? 'active' : ''}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => setSelectedInfo(selectedInfo === info.id ? null : info.id)}
              >
                <div className="info-header">
                  <div className="info-icon" style={{ color: info.color }}>
                    {info.icon}
                  </div>
                  <h3>{info.title}</h3>
                </div>
                <p className="info-description">{info.description}</p>
                {selectedInfo === info.id && (
                  <motion.p 
                    className="info-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {info.details}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Entity
