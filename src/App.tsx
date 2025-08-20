import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Discovery from './components/Discovery'
import Entity from './components/Entity'
import Interactive from './components/Interactive'
import Research from './components/Research'
import Footer from './components/Footer'
import PixelParticles from './components/PixelParticles'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="pixel-loading">
        <div className="pixel-spinner">
          <div className="pixel-orb"></div>
          <div className="pixel-orb"></div>
          <div className="pixel-orb"></div>
        </div>
        <h2 className="pixel-text">扫描宇宙信号中...</h2>
        <div className="pixel-progress">
          <div className="pixel-progress-bar"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <PixelParticles />
      <Header />
      <main>
        <Hero />
        <Discovery />
        <Entity />
        <Interactive />
        <Research />
      </main>
      <Footer />
    </div>
  )
}

export default App
