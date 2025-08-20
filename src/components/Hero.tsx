import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section id="hero" className="pump-alien-hero" ref={heroRef}>


      {/* 主要内容 */}
      <div className="hero-container">
        {/* 左侧内容 */}
        <div className="hero-content">
          {/* Logo区域 */}
          <div className="hero-logo">
            <img src="/images/pumpalienlogo.png" alt="PumpAlien Logo" className="logo-image" />
            <div className="logo-text">
              <h1 className="logo-title">PUMPALIEN</h1>
              <p className="logo-subtitle">Truth Revelation Plan</p>
            </div>
          </div>

          {/* 巨大的阴谋 */}
          <div className="opening-question">
            <h2 className="question-title">The Great Conspiracy</h2>
            <p className="question-text">
              You are an Earth agent who has just discovered a shocking truth:
            </p>
            <div className="question-highlight">
              <p>🚨 <strong>Alon is missing!</strong></p>
              <p>🌍 <strong>What is hidden behind PumpFun?</strong></p>
              <p>👽 <strong>Are aliens really collecting our energy?</strong></p>
            </div>
            <p className="question-challenge">
              Now, you must choose:<br/>
              <span className="challenge-text">Continue investigating the truth, or choose to ignore?</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
