import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, TrendingUp, TrendingDown, Activity, Zap, AlertTriangle } from 'lucide-react'
import './CryptoSimulator.css'

interface CryptoSimulatorProps {
  onTransaction: () => void
}

interface Token {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  volume: number
  energy: number
}

const CryptoSimulator: React.FC<CryptoSimulatorProps> = ({ onTransaction }) => {
  const [tokens, setTokens] = useState<Token[]>([
    { id: '1', name: 'PumpFun', symbol: 'PFUN', price: 0.00123, change: 15.6, volume: 1250000, energy: 25 },
    { id: '2', name: 'AlonCoin', symbol: 'ALON', price: 0.00089, change: -8.2, volume: 890000, energy: 18 },
    { id: '3', name: 'UFO Token', symbol: 'UFO', price: 0.00234, change: 45.7, volume: 2100000, energy: 32 },
    { id: '4', name: 'Alien Pump', symbol: 'APUMP', price: 0.00167, change: 23.4, volume: 1560000, energy: 28 },
    { id: '5', name: 'Cosmic Coin', symbol: 'COSMIC', price: 0.00345, change: 67.8, volume: 3400000, energy: 45 }
  ])
  
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [showTransaction, setShowTransaction] = useState(false)
  const [energyCollected, setEnergyCollected] = useState(0)

  useEffect(() => {
    // 模拟价格波动
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        price: token.price * (1 + (Math.random() - 0.5) * 0.1),
        change: token.change + (Math.random() - 0.5) * 2,
        volume: token.volume + Math.floor(Math.random() * 10000)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
    setShowTransaction(true)
  }

  const executeTransaction = () => {
    if (!selectedToken || !amount) return

    const numAmount = parseFloat(amount)
    const transactionValue = numAmount * selectedToken.price
    const energyGain = Math.floor(transactionValue * 100)

    // 更新代币数据
    setTokens(prev => prev.map(token => 
      token.id === selectedToken.id 
        ? { ...token, volume: token.volume + transactionValue }
        : token
    ))

    // 收集能量
    setEnergyCollected(prev => prev + energyGain)
    onTransaction()

    // 显示交易成功
    setShowTransaction(false)
    setAmount('')
    setSelectedToken(null)

    // 重置能量收集显示
    setTimeout(() => setEnergyCollected(0), 3000)
  }

  const createNewToken = () => {
    const newToken: Token = {
      id: Date.now().toString(),
      name: `Token${Math.floor(Math.random() * 1000)}`,
      symbol: `TKN${Math.floor(Math.random() * 100)}`,
      price: Math.random() * 0.01,
      change: (Math.random() - 0.5) * 100,
      volume: Math.floor(Math.random() * 1000000),
      energy: Math.floor(Math.random() * 50)
    }

    setTokens(prev => [...prev, newToken])
    onTransaction()
  }

  return (
    <section id="crypto-simulator" className="crypto-simulator">
      <div className="simulator-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Crypto试验场模拟器</h2>
          <p className="section-subtitle">体验PumpAlien如何通过代币交易收集能量</p>
        </motion.div>

        {/* 能量收集显示 */}
        <AnimatePresence>
          {energyCollected > 0 && (
            <motion.div
              className="energy-collection-display"
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="energy-icon" />
              <span>+{energyCollected} 能量收集成功！</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="simulator-dashboard">
          {/* 代币列表 */}
          <motion.div
            className="tokens-list"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="list-header">
              <h3>热门代币</h3>
              <button className="create-token-btn" onClick={createNewToken}>
                <Coins className="btn-icon" />
                创建新代币
              </button>
            </div>

            <div className="tokens-grid">
              {tokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  className={`token-card ${selectedToken?.id === token.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="token-header">
                    <div className="token-info">
                      <h4>{token.name}</h4>
                      <span className="token-symbol">{token.symbol}</span>
                    </div>
                    <div className="token-energy">
                      <Zap className="energy-icon-small" />
                      <span>{token.energy}</span>
                    </div>
                  </div>

                  <div className="token-price">
                    <span className="price-value">${token.price.toFixed(6)}</span>
                    <span className={`price-change ${token.change >= 0 ? 'positive' : 'negative'}`}>
                      {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
                    </span>
                  </div>

                  <div className="token-volume">
                    <span className="volume-label">24h成交量</span>
                    <span className="volume-value">${token.volume.toLocaleString()}</span>
                  </div>

                  <div className="token-actions">
                    <button className="action-btn buy">买入</button>
                    <button className="action-btn sell">卖出</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 交易面板 */}
          <AnimatePresence>
            {showTransaction && selectedToken && (
              <motion.div
                className="transaction-panel"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="panel-header">
                  <h3>交易 {selectedToken.symbol}</h3>
                  <button 
                    className="close-panel-btn"
                    onClick={() => setShowTransaction(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="token-details">
                  <div className="detail-item">
                    <span className="detail-label">当前价格:</span>
                    <span className="detail-value">${selectedToken.price.toFixed(6)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">能量值:</span>
                    <span className="detail-value">{selectedToken.energy}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">24h变化:</span>
                    <span className={`detail-value ${selectedToken.change >= 0 ? 'positive' : 'negative'}`}>
                      {selectedToken.change >= 0 ? '+' : ''}{selectedToken.change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="transaction-form">
                  <div className="form-group">
                    <label>交易类型</label>
                    <div className="type-selector">
                      <button
                        className={`type-btn ${transactionType === 'buy' ? 'active' : ''}`}
                        onClick={() => setTransactionType('buy')}
                      >
                        <TrendingUp className="btn-icon" />
                        买入
                      </button>
                      <button
                        className={`type-btn ${transactionType === 'sell' ? 'active' : ''}`}
                        onClick={() => setTransactionType('sell')}
                      >
                        <TrendingDown className="btn-icon" />
                        卖出
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>数量</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="输入代币数量"
                      className="amount-input"
                    />
                  </div>

                  <div className="transaction-summary">
                    <div className="summary-item">
                      <span>交易价值:</span>
                      <span>${amount ? (parseFloat(amount) * selectedToken.price).toFixed(6) : '0.00'}</span>
                    </div>
                    <div className="summary-item">
                      <span>能量收集:</span>
                      <span>+{amount ? Math.floor(parseFloat(amount) * selectedToken.price * 100) : 0}</span>
                    </div>
                  </div>

                  <button 
                    className="execute-btn"
                    onClick={executeTransaction}
                    disabled={!amount || parseFloat(amount) <= 0}
                  >
                    <Activity className="btn-icon" />
                    执行交易
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Truth Revelation */}
        <motion.div
          className="truth-revelation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="revelation-content">
            <AlertTriangle className="revelation-icon" />
            <div className="revelation-text">
                              <h3>⚠️ Truth Revelation</h3>
                <p>Every token transaction collects energy for PumpAlien. You think you\'re investing, but actually you\'re helping aliens achieve their plan.</p>
              <p className="revelation-quote">
                "人类以为自己在玩币，但其实币在玩人"
              </p>
            </div>
          </div>
        </motion.div>

        {/* 统计信息 */}
        <motion.div
          className="simulator-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h3>模拟器统计</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🪙</div>
              <div className="stat-content">
                <span className="stat-number">{tokens.length}</span>
                <span className="stat-label">代币总数</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <span className="stat-number">{tokens.reduce((sum, token) => sum + token.energy, 0)}</span>
                <span className="stat-label">总能量值</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-number">${tokens.reduce((sum, token) => sum + token.volume, 0).toLocaleString()}</span>
                <span className="stat-label">总成交量</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CryptoSimulator
