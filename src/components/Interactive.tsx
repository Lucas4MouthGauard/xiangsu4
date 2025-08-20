import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, MessageSquare, Zap } from 'lucide-react'
import './Interactive.css'

const Interactive: React.FC = () => {
  const [energyLevel, setEnergyLevel] = useState(0)
  const [messages, setMessages] = useState([
    { id: 1, text: '👽 问候，地球生物...', type: 'alien' }
  ])

  const addMessage = (text: string, type: 'human' | 'alien') => {
    setMessages(prev => [...prev, { id: Date.now(), text, type }])
  }

  const scanFrequency = () => {
    addMessage('🔍 频率扫描完成。检测到多个信号。', 'alien')
  }

  const analyzeEnergy = () => {
    const newLevel = Math.min(100, energyLevel + Math.random() * 30)
    setEnergyLevel(newLevel)
    
    if (newLevel > 80) {
      addMessage('⚡ 能量水平临界！PumpAlien实体稳定中...', 'alien')
    } else if (newLevel > 50) {
      addMessage('⚡ 能量水平适中。实体状态：稳定', 'alien')
    } else {
      addMessage('⚡ 能量水平低。实体需要能量提升', 'alien')
    }
  }

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.querySelector('input') as HTMLInputElement
    const message = input.value.trim()
    
    if (message) {
      addMessage(message, 'human')
      input.value = ''
      
      // 模拟外星人回复
      setTimeout(() => {
        const responses = [
          '👽 *心灵感应理解*',
          '👽 你的消息已被接收...',
          '👽 *宇宙共振检测到*',
          '👽 PumpAlien确认你的通信'
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addMessage(randomResponse, 'alien')
      }, 1000 + Math.random() * 2000)
    }
  }

  return (
    <section id="interactive" className="pixel-interactive">
      <div className="interactive-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">交互式研究</h2>
          <p className="section-subtitle">直接与PumpAlien互动</p>
        </motion.div>

        <div className="interactive-grid">
          <motion.div
            className="interactive-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="panel-header">
              <Radio className="panel-icon" />
              <h3>信号扫描器</h3>
            </div>
            <div className="scanner-display">
              <div className="frequency-line"></div>
              <div className="signal-peaks"></div>
            </div>
            <button className="pixel-btn primary" onClick={scanFrequency}>
              扫描频率
            </button>
          </motion.div>

          <motion.div
            className="interactive-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="panel-header">
              <MessageSquare className="panel-icon" />
              <h3>外星人通信</h3>
            </div>
            <div className="communication-interface">
              <div className="message-display">
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.type}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="message-form">
                <input 
                  type="text" 
                  placeholder="输入你的消息..." 
                  className="message-input"
                />
                <button type="submit" className="pixel-btn primary">
                  发送
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="interactive-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="panel-header">
              <Zap className="panel-icon" />
              <h3>能量分析</h3>
            </div>
            <div className="energy-meter">
              <div className="meter-fill" style={{ width: `${energyLevel}%` }}></div>
              <div className="meter-label">{Math.round(energyLevel)}%</div>
            </div>
            <button className="pixel-btn primary" onClick={analyzeEnergy}>
              分析能量
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Interactive
