import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Eye, Menu, X } from 'lucide-react'
import { brandConfig } from '../config/brand'
import './Header.css'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header 
      className={`pixel-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="header-container">
        <motion.div 
          className="header-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={brandConfig.images.logo} 
            alt={brandConfig.name} 
            className="logo-image"
          />
          <div className="logo-text">
            <span className="logo-main">PumpAlien</span>
            <span className="logo-sub">Discovery</span>
          </div>
        </motion.div>

        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a 
            href="#discovery" 
            onClick={() => scrollToSection('discovery')}
            className="nav-link"
          >
            Discovery
          </a>
          <a 
            href="#entity" 
            onClick={() => scrollToSection('entity')}
            className="nav-link"
          >
            Entity
          </a>
          <a 
            href="#interactive" 
            onClick={() => scrollToSection('interactive')}
            className="nav-link"
          >
            Interactive
          </a>
          <a 
            href="#research" 
            onClick={() => scrollToSection('research')}
            className="nav-link"
          >
            Research
          </a>
        </nav>

        <div className="header-actions">
          <motion.button 
            className="pixel-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.body.classList.toggle('alien-mode')}
          >
            <Eye className="btn-icon" />
            Alien Mode
          </motion.button>
          
          <motion.button 
            className="pixel-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.body.style.filter = 'hue-rotate(180deg)'
              setTimeout(() => {
                document.body.style.filter = ''
              }, 2000)
            }}
          >
            <Zap className="btn-icon" />
            Activate Beam
          </motion.button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  )
}

export default Header
