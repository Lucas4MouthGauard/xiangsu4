import React from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Globe } from 'lucide-react'
import { brandConfig } from '../config/brand'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="pixel-footer">
      <div className="footer-container">
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src={brandConfig.images.logo} 
              alt={brandConfig.name} 
              className="footer-logo-img"
            />
            <div className="footer-logo-text">
              <span className="footer-logo-main">PumpAlien</span>
              <span className="footer-logo-sub">Discovery Project</span>
            </div>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <a href="#discovery">Discovery</a>
            <a href="#entity">Entity</a>
            <a href="#interactive">Interactive</a>
            <a href="#research">Research</a>
          </motion.div>

          <motion.div 
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a href={brandConfig.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="social-icon" />
            </a>
            <a href={brandConfig.links.research} target="_blank" rel="noopener noreferrer">
              <Globe className="social-icon" />
            </a>
            <a href={brandConfig.links.contact}>
              <Mail className="social-icon" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>© 2024 PumpAlien Discovery Project | 探索宇宙未知</p>
          <p className="footer-quote">"在浩瀚的宇宙中，我们并不孤单"</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
