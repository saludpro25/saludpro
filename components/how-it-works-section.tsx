"use client"

import { Search, UserCheck, Calendar } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Busca un especialista",
      description: "Filtra por ciudad, especialidad y tipo de servicio.",
      color: "bg-directorio-blue",
    },
    {
      icon: UserCheck,
      title: "Revisa su perfil profesional",
      description: "Conoce experiencia, tarifas, horarios y certificaciones.",
      color: "bg-saludpro-green",
    },
    {
      icon: Calendar,
      title: "Agenda o contacta",
      description: "Comunicación directa y sin intermediarios.",
      color: "bg-directorio-blue",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            ¿Cómo funciona?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-dark mb-2">
                    Paso {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
