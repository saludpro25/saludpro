"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Stethoscope, Activity, Pill, Plus, Cross, Syringe, Thermometer } from "lucide-react"

interface FallingIcon {
  id: number
  x: number
  delay: number
  duration: number
  iconType: number
  size: number
  opacity: number
  weight: 'small' | 'medium' | 'large' | 'xlarge'
  baseOpacity: number
  color: 'primary' | 'accent'
}

// Array de iconos médicos
const healthIcons = [Heart, Stethoscope, Activity, Pill, Plus, Cross, Syringe, Thermometer]

export function HealthMatrixBackground() {
  const [icons, setIcons] = useState<FallingIcon[]>([])
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FallingIcon[] = []
      const iconCount = 40 // Cantidad de iconos

      // Definimos los diferentes pesos y tamaños
      const weights = [
        { weight: 'small' as const, size: 16, opacity: 0.06 },
        { weight: 'medium' as const, size: 20, opacity: 0.1 },
        { weight: 'large' as const, size: 24, opacity: 0.15 },
        { weight: 'xlarge' as const, size: 28, opacity: 0.2 },
      ]

      for (let i = 0; i < iconCount; i++) {
        const weightConfig = weights[Math.floor(Math.random() * weights.length)]
        const sizeVariation = Math.random() * 4 - 2 // ±2px de variación
        
        newIcons.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 18 + Math.random() * 12, // 18-30s para más variedad
          iconType: Math.floor(Math.random() * healthIcons.length),
          size: weightConfig.size + sizeVariation,
          opacity: weightConfig.opacity + (Math.random() * 0.05 - 0.025),
          weight: weightConfig.weight,
          baseOpacity: weightConfig.opacity,
          color: Math.random() > 0.5 ? 'primary' : 'accent', // Mezcla de azul y verde
        })
      }
      setIcons(newIcons)
    }

    generateIcons()
  }, [])

  const handleMouseEnter = (iconId: number) => {
    setHoveredIcon(iconId)
  }

  const handleMouseLeave = (iconId: number) => {
    setHoveredIcon(null)
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon) => {
        const isHovered = hoveredIcon === icon.id
        const currentOpacity = isHovered ? Math.min(icon.baseOpacity * 2.5, 0.9) : icon.opacity
        const IconComponent = healthIcons[icon.iconType]
        const colorVar = icon.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
        
        return (
          <motion.div
            key={icon.id}
            className="absolute cursor-pointer"
            style={{
              left: `${icon.x}%`,
              fontSize: `${icon.size}px`,
              opacity: currentOpacity,
              color: colorVar,
              pointerEvents: 'auto',
            }}
            initial={{ y: -100 }}
            animate={{ 
              y: "calc(100vh + 100px)",
              scale: isHovered ? 1.4 : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{
              y: {
                duration: icon.duration,
                delay: icon.delay,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 0.3,
                ease: "easeOut",
              },
              rotate: {
                duration: 0.6,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.3,
              }
            }}
            onMouseEnter={() => handleMouseEnter(icon.id)}
            onMouseLeave={() => handleMouseLeave(icon.id)}
            whileHover={{
              filter: `drop-shadow(0 0 8px ${colorVar})`,
            }}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <IconComponent 
                className="w-full h-full drop-shadow-sm" 
                strokeWidth={icon.weight === 'small' ? 1.5 : icon.weight === 'medium' ? 1.8 : icon.weight === 'large' ? 2 : 2.2}
              />
            </motion.div>
            
            {/* Efecto de ondas al hacer hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div 
                  className="w-full h-full rounded-full" 
                  style={{
                    border: `2px solid ${icon.color === 'primary' ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--accent) / 0.4)'}`,
                  }}
                />
              </motion.div>
            )}
            
            {/* Efecto de pulso en hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className="w-full h-full rounded-full blur-sm" 
                  style={{
                    backgroundColor: icon.color === 'primary' ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--accent) / 0.3)',
                  }}
                />
              </motion.div>
            )}
            
            {/* Partículas pequeñas en hover */}
            {isHovered && (
              <>
                {[0, 1, 2, 3].map((particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: colorVar,
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((particleIndex * Math.PI) / 2) * 20,
                      y: Math.sin((particleIndex * Math.PI) / 2) * 20,
                      opacity: [1, 0.5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
