import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Battery, TrendingUp, AlertTriangle, Activity } from 'lucide-react'
import './EnergyMonitor.css'

interface EnergyMonitorProps {
  energyLevel: number
  onEnergyBoost: () => void
}

const EnergyMonitor: React.FC<EnergyMonitorProps> = ({ energyLevel, onEnergyBoost }) => {
  const [showWarning, setShowWarning] = useState(false)
  const [energyHistory, setEnergyHistory] = useState<number[]>([])
  const [isCollecting, setIsCollecting] = useState(false)

  useEffect(() => {
    // 更新能量历史
    setEnergyHistory(prev => [...prev, energyLevel].slice(-20))
    
    // 能量警告
    if (energyLevel > 70 && !showWarning) {
      setShowWarning(true)
    }
  }, [energyLevel, showWarning])

  useEffect(() => {
    // 模拟能量收集
    if (energyLevel < 100) {
      const interval = setInterval(() => {
        setIsCollecting(true)
        setTimeout(() => setIsCollecting(false), 500)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [energyLevel])

  const getEnergyStatus = () => {
    if (energyLevel < 30) return { status: '低', color: '#00ff88', icon: '🟢' }
    if (energyLevel < 60) return { status: '中', color: '#ffaa00', icon: '🟡' }
    if (energyLevel < 90) return { status: '高', color: '#ff6600', icon: '🟠' }
    return { status: '临界', color: '#ff4444', icon: '🔴' }
  }

  const energyStatus = getEnergyStatus()

  return (
    <section id="energy-monitor" className="energy-monitor">
      <div className="energy-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
                  <h2 className="section-title">Energy Monitoring System</h2>
        <p className="section-subtitle">Real-time monitoring of PumpAlien\'s energy collection progress</p>
        </motion.div>

        <div className="energy-dashboard">
          {/* Main energy display */}
          <motion.div
            className="energy-main-display"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="energy-circle">
              <svg className="energy-svg" viewBox="0 0 120 120">
                <circle
                  className="energy-background"
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="8"
                />
                <motion.circle
                  className="energy-progress"
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - energyLevel / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - energyLevel / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              
              <div className="energy-center">
                <div className="energy-percentage">{Math.round(energyLevel)}%</div>
                <div className="energy-status" style={{ color: energyStatus.color }}>
                  {energyStatus.icon} {energyStatus.status}
                </div>
              </div>
            </div>

            <div className="energy-info">
              <h3>Current Energy Level</h3>
              <p>PumpAlien is collecting energy through Crypto transactions</p>
              <div className="energy-stats">
                <div className="stat-item">
                  <Zap className="stat-icon" />
                  <span>收集速率: {energyLevel > 50 ? '高' : '中'}</span>
                </div>
                <div className="stat-item">
                  <Battery className="stat-icon" />
                  <span>目标: 100%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Energy history chart */}
          <motion.div
            className="energy-chart"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
                          <h3>Energy Collection Trend</h3>
            <div className="chart-container">
              <div className="chart-line">
                {energyHistory.map((value, index) => (
                  <motion.div
                    key={index}
                    className="chart-point"
                    style={{
                      left: `${(index / Math.max(energyHistory.length - 1, 1)) * 100}%`,
                      bottom: `${value}%`
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                <span>开始</span>
                <span>当前</span>
              </div>
            </div>
          </motion.div>

          {/* Energy collection activities */}
          <motion.div
            className="energy-activities"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>实时收集活动</h3>
            <div className="activity-list">
              <div className={`activity-item ${isCollecting ? 'active' : ''}`}>
                <Activity className="activity-icon" />
                <div className="activity-content">
                  <span className="activity-title">Crypto Transaction Energy Collection</span>
                                      <span className="activity-status">
                      {isCollecting ? 'Collecting...' : 'Waiting...'}
                    </span>
                </div>
                <div className="activity-indicator"></div>
              </div>
              
              <div className="activity-item">
                <TrendingUp className="activity-icon" />
                <div className="activity-content">
                  <span className="activity-title">Token Creation Energy</span>
                                      <span className="activity-status">Continuous collection</span>
                </div>
                <div className="activity-indicator"></div>
              </div>
              
              <div className="activity-item">
                <Zap className="activity-icon" />
                <div className="activity-content">
                  <span className="activity-title">用户交互能量</span>
                  <span className="activity-status">被动收集</span>
                </div>
                <div className="activity-indicator"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 能量提升按钮 */}
        <motion.div
          className="energy-actions"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button 
            className="boost-btn"
            onClick={onEnergyBoost}
            disabled={energyLevel >= 100}
          >
            <Zap className="btn-icon" />
            能量提升 (+20%)
          </button>
          <p className="boost-hint">
            点击按钮模拟Crypto交易，为PumpAlien提供更多能量
          </p>
        </motion.div>

        {/* 能量警告 */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="energy-warning"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="warning-content">
                <AlertTriangle className="warning-icon" />
                <div className="warning-text">
                  <h3>⚠️ 能量警告</h3>
                  <p>能量水平已达到{Math.round(energyLevel)}%，PumpAlien即将觉醒！</p>
                  <p className="warning-highlight">
                    When energy reaches 100%, the truth will be completely revealed
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 能量目标说明 */}
        <motion.div
          className="energy-goals"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>能量收集目标</h3>
          <div className="goals-grid">
            <div className="goal-item">
              <div className="goal-icon">30%</div>
              <h4>初始觉醒</h4>
              <p>PumpAlien开始显现真实身份</p>
            </div>
            <div className="goal-item">
              <div className="goal-icon">60%</div>
              <h4>力量增强</h4>
              <p>控制能力显著提升</p>
            </div>
            <div className="goal-item">
              <div className="goal-icon">90%</div>
              <h4>临界状态</h4>
              <p>Plan nearly complete</p>
            </div>
            <div className="goal-item">
              <div className="goal-icon">100%</div>
                              <h4>Truth Revelation</h4>
                <p>Fully awakened, plan activated</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EnergyMonitor
