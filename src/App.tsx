import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import StoryReveal from './components/StoryReveal'
import Timeline from './components/Timeline'
import TruthRevealer from './components/TruthRevealer'
import Footer from './components/Footer'
import PixelParticles from './components/PixelParticles'
import FloatingElements from './components/FloatingElements'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(4)
  const [energyLevel, setEnergyLevel] = useState(0)

  const [truthRevealed, setTruthRevealed] = useState(false)

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 能量自动增长
    if (!isLoading && energyLevel < 100) {
      const interval = setInterval(() => {
        setEnergyLevel(prev => {
          if (prev >= 100) {
            setTruthRevealed(true)
            return 100
          }
          return prev + 0.5
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [isLoading, energyLevel])

  if (isLoading) {
    return (
      <div className="pump-alien-loading">
        <div className="loading-container">
          <div className="loading-logo">
                            <img src="/images/pumpalien.png" alt="PumpAlien" />
            <div className="loading-text">PUMPALIEN</div>
          </div>
                                <div className="loading-progress">
                        <div className="progress-bar" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                      <div className="loading-status">Loading PumpAlien truth...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <PixelParticles />
      <FloatingElements />
      <Header />
      
      <main>
        <Hero />
        
        <Timeline />
        
        <StoryReveal 
          currentChapter={currentChapter}
          onNextChapter={() => setCurrentChapter(prev => Math.min(prev + 1, 4))}
        />
        
        {truthRevealed && (
          <TruthRevealer 
                                    onReset={() => {
                          setTruthRevealed(false)
                          setCurrentChapter(0)
                        }}
          />
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default App
