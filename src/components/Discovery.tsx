import React from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, CheckCircle } from 'lucide-react'
import './Discovery.css'

const Discovery: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <Search />,
      title: '信号检测',
      description: '仙女座星系的异常能量模式',
      details: '我们的深空探测器在仙女座星系检测到前所未有的能量波动，频率范围超出已知物理定律。'
    },
    {
      id: 2,
      icon: <Eye />,
      title: '首次接触',
      description: 'PumpAlien实体的视觉确认',
      details: '通过高分辨率望远镜阵列，我们首次捕捉到了这个神秘实体的图像，证实了外星生命的存在。'
    },
    {
      id: 3,
      icon: <CheckCircle />,
      title: '分析完成',
      description: '实体分类和研究启动',
              details: 'After multi-dimensional analysis, this entity was officially named PumpAlien and launched a comprehensive scientific research plan.'
    }
  ]

  return (
    <section id="discovery" className="pixel-discovery">
      <div className="discovery-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">发现时间线</h2>
          <p className="section-subtitle">我们找到PumpAlien的时刻</p>
        </motion.div>

        <div className="timeline-container">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="timeline-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="step-icon">
                {step.icon}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <p className="step-details">{step.details}</p>
              </div>
              <div className="step-number">{step.id}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Discovery
