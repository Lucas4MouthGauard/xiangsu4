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
            <span className="logo-subtitle">Truth Revelation Plan</span>
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
                The Great Conspiracy
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('story-reveal')}
              >
                <AlertTriangle className="nav-icon" />
                Truth Revelation
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link"
                onClick={() => scrollToSection('timeline')}
              >
                <Zap className="nav-icon" />
                Timeline
              </button>
            </li>
          </ul>
        </nav>

        {/* 推特链接 */}
        <motion.a
          href="https://x.com/PumpAlienonsol"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter-link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="twitter-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="twitter-text">@PumpAlienonsol</span>
        </motion.a>

        {/* $PumpAlien 链接 */}
        <motion.button
          className="pumpalien-link"
          onClick={() => {
            const element = document.getElementById('buy-pumpalien-btn')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="pumpalien-text">$PumpAlien</span>
        </motion.button>

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
                The Great Conspiracy
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                className="mobile-nav-link"
                onClick={() => scrollToSection('story-reveal')}
              >
                <AlertTriangle className="nav-icon" />
                Truth Revelation
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                className="mobile-nav-link"
                onClick={() => scrollToSection('timeline')}
              >
                <Zap className="nav-icon" />
                Timeline
              </button>
            </li>
              <li className="mobile-nav-item">
                <a 
                  href="https://x.com/PumpAlienonsol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-twitter-link"
                >
                  <svg className="mobile-twitter-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  @PumpAlienonsol
                </a>
              </li>
              <li className="mobile-nav-item">
                <button 
                  className="mobile-pumpalien-link"
                  onClick={() => {
                    const element = document.getElementById('buy-pumpalien-btn')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                    setIsMobileMenuOpen(false)
                  }}
                >
                  $PumpAlien
                </button>
              </li>
            </ul>
            

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
            <span>⚠️ Warning: PumpAlien plan is in progress, please explore the truth carefully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
