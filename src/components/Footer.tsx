import React from 'react'
import { motion } from 'framer-motion'
import { Eye, AlertTriangle, Zap, Globe, Github, Twitter } from 'lucide-react'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: '故事开始', href: '#hero', icon: Eye },
    { name: '真相揭示', href: '#story-reveal', icon: AlertTriangle },
    { name: '时间线', href: '#timeline', icon: Zap },
    { name: '能量监控', href: '#energy-monitor', icon: Zap },
    { name: 'Crypto试验场', href: '#crypto-simulator', icon: Globe }
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Lucas4MouthGauard/xiangsu3', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="pump-alien-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo区域 */}
          <motion.div
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/pumpalien.png" 
              alt="PumpAlien" 
              className="footer-logo-image"
            />
            <div className="footer-logo-text">
              <h3 className="footer-title">PUMPALIEN</h3>
              <p className="footer-subtitle">真相揭露计划</p>
              <p className="footer-description">
                当Crypto成为外星人的试验场，真相即将揭露
              </p>
            </div>
          </motion.div>

          {/* 快速链接 */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="links-title">快速导航</h4>
            <ul className="links-list">
              {footerLinks.map((link, index) => (
                <li key={link.name} className="link-item">
                  <button
                    className="footer-link"
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                  >
                    <link.icon className="link-icon" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 真相警告 */}
          <motion.div
            className="footer-warning"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="warning-title">⚠️ 真相警告</h4>
            <div className="warning-content">
              <p className="warning-text">
                PumpAlien计划正在进行中，每一次Crypto交易都在加速真相的揭露。
              </p>
              <div className="warning-quote">
                <blockquote>
                  "人类以为自己在玩币，但其实币在玩人"
                </blockquote>
                <cite>- PumpAlien计划档案</cite>
              </div>
            </div>
          </motion.div>

          {/* 社交链接 */}
          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="social-title">关注真相</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="social-icon" />
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 底部信息 */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-info">
            <div className="info-item">
              <span className="info-label">项目状态:</span>
              <span className="info-value warning">真相揭露中</span>
            </div>
            <div className="info-item">
              <span className="info-label">威胁等级:</span>
              <span className="info-value danger">文明级</span>
            </div>
            <div className="info-item">
              <span className="info-label">影响范围:</span>
              <span className="info-value">全球</span>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; {currentYear} PumpAlien真相揭露计划. 所有权利保留.</p>
            <p className="copyright-warning">
              ⚠️ 本网站仅用于真相揭露，请谨慎对待所获信息
            </p>
          </div>
        </motion.div>

        {/* 能量指示器 */}
        <motion.div
          className="footer-energy-indicator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="energy-status">
            <Zap className="energy-icon" />
            <span className="energy-text">PumpAlien能量收集系统运行中</span>
          </div>
          <div className="energy-bar">
            <motion.div
              className="energy-fill"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, delay: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
