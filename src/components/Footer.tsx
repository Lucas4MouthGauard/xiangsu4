import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pump-alien-footer">
      <div className="footer-container">
        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} PumpAlien Truth Revelation Plan</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
