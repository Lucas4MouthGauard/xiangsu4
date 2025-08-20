import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Eye, Zap, AlertTriangle } from 'lucide-react'
import { pumpAlienStory } from '../config/story'
import './Header.css'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // 显示警告
    const timer = setTimeout(() => setShowWarning(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`pump-alien-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="header-container">
        {/* Logo区域 */}
        <motion.div
          className="header-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/images/pumpalien.png" 
            alt="PumpAlien" 
            className="logo-image"
          />
          <div className="logo-text">
            <span className="logo-title">PUMPALIEN</span>
            <span className="logo-subtitle">真相揭露计划</span>
          </div>
        </motion.div>

        {/* 导航菜单 */}
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('hero')}
              >
                <Eye className="nav-icon" />
                故事开始
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('story-reveal')}
              >
                <AlertTriangle className="nav-icon" />
                真相揭示
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('timeline')}
              >
                <Zap className="nav-icon" />
                时间线
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('energy-monitor')}
              >
                <Zap className="nav-icon" />
                能量监控
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('crypto-simulator')}
              >
                <Zap className="nav-icon" />
                Crypto试验场
              </button>
            </li>
          </ul>
        </nav>

        {/* 行动按钮 */}
        <div className="header-actions">
          <motion.button
            className="action-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('energy-monitor')}
          >
            <Zap className="btn-icon" />
            能量提升
          </motion.button>
          
          <motion.button
            className="action-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('crypto-simulator')}
          >
            <Eye className="btn-icon" />
            进入试验场
          </motion.button>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('hero')}
                >
                  <Eye className="nav-icon" />
                  故事开始
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('story-reveal')}
                >
                  <AlertTriangle className="nav-icon" />
                  真相揭示
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('timeline')}
                >
                  <Zap className="nav-icon" />
                  时间线
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('energy-monitor')}
                >
                  <Zap className="nav-icon" />
                  能量监控
                </button>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-nav-link"
                  onClick={() => scrollToSection('crypto-simulator')}
                >
                  <Zap className="nav-icon" />
                  Crypto试验场
                </button>
              </li>
            </ul>
            
            <div className="mobile-actions">
              <button 
                className="mobile-action-btn primary"
                onClick={() => scrollToSection('energy-monitor')}
              >
                <Zap className="btn-icon" />
                能量提升
              </button>
              <button 
                className="mobile-action-btn secondary"
                onClick={() => scrollToSection('crypto-simulator')}
              >
                <Eye className="btn-icon" />
                进入试验场
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 警告横幅 */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="header-warning"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <AlertTriangle className="warning-icon" />
            <span>⚠️ 警告：PumpAlien计划正在进行中，请谨慎探索真相</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
