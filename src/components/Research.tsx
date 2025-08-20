import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Microscope, Globe, Pill } from 'lucide-react'
import './Research.css'

const Research: React.FC = () => {
  const [selectedFinding, setSelectedFinding] = useState<number | null>(null)

  const findings = [
    {
      id: 1,
      icon: <Microscope />,
      title: '能量模式',
      description: '检测到独特的量子特征',
      details: 'PumpAlien能量场中检测到前所未有的量子特征。该实体似乎存在于量子叠加状态，使其能够同时与多个维度互动。',
      color: '#00ff88'
    },
    {
      id: 2,
      icon: <Globe />,
      title: '维度存在',
      description: '存在于多个维度中',
      details: '高级扫描显示PumpAlien存在于11个维度中。这种多维性质解释了它操控时空和能量场的能力，超越了我们的理解。',
      color: '#ff00ff'
    },
    {
      id: 3,
      icon: <Pill />,
      title: '泵效应',
      description: '神秘物质增强能力',
      details: 'PumpAlien消耗的神秘物质似乎是维度催化剂。它增强了实体的能力，使其能够在不同宇宙领域之间建立桥梁。',
      color: '#ff6b35'
    }
  ]

  return (
    <section id="research" className="pixel-research">
      <div className="research-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">研究发现</h2>
          <p className="section-subtitle">关于PumpAlien的最新发现</p>
        </motion.div>

        <div className="findings-grid">
          {findings.map((finding, index) => (
            <motion.div
              key={finding.id}
              className={`finding-card ${selectedFinding === finding.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedFinding(selectedFinding === finding.id ? null : finding.id)}
            >
              <div className="finding-icon" style={{ color: finding.color }}>
                {finding.icon}
              </div>
              <h3>{finding.title}</h3>
              <p className="finding-description">{finding.description}</p>
              {selectedFinding === finding.id && (
                <motion.p 
                  className="finding-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {finding.details}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Research
