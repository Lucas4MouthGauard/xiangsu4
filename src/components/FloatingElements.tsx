import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './FloatingElements.css'

interface FloatingElement {
  id: number
  x: number
  y: number
  image: string
  delay: number
  size: number
  rotation: number
  speed: number
}

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
              const images = [
            '/images/ufo1.png',
            '/images/ufo2.png',
            '/images/alien.png',
            '/images/pump.png',
            '/images/pumpalien.png'
          ]
    
    // 创建30个飘动元素
    const floating = Array.from({ length: 30 }, (_, index) => {
      const image = images[index % images.length] // 循环使用图片
      const isUFO = image.includes('ufo')
      const isAlien = image.includes('alien')
      const isPump = image.includes('pump')
      
      return {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        image,
        delay: index * 0.2,
        size: isUFO ? Math.random() * 30 + 40 : // UFO: 40-70px
               isAlien ? Math.random() * 25 + 35 : // 外星人: 35-60px
               Math.random() * 20 + 30, // Pump胶囊: 30-50px
        rotation: Math.random() * 360,
        speed: isUFO ? Math.random() * 25 + 20 : // UFO: 20-45秒
               isAlien ? Math.random() * 20 + 15 : // 外星人: 15-35秒
               Math.random() * 15 + 10, // Pump胶囊: 10-25秒
        zIndex: Math.floor(Math.random() * 20) + 10, // 随机层级 10-30
        opacity: Math.random() * 0.3 + 0.8 // 0.8-1.1透明度，更加明显
      }
    })
    
    setElements(floating)
  }, [])

  return (
    <div className="floating-elements-container">
      {elements.map((element) => (
        <motion.img
          key={element.id}
          src={element.image}
          alt="Floating Element"
          className="floating-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            zIndex: element.zIndex,
            opacity: element.opacity
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: element.rotation
          }}
          animate={{ 
            opacity: [0, element.opacity, element.opacity * 0.8, element.opacity],
            scale: [0, 1.2, 1, 1.1],
            rotate: [element.rotation, element.rotation + 360],
            x: [0, (Math.random() - 0.5) * 60],
            y: [0, (Math.random() - 0.5) * 60]
          }}
          transition={{
            duration: element.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements
