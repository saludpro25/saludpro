"use client"

import { Calendar, Share2, Sparkles, BookOpen, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function KitDigitalSection() {
  const kitItems = [
    {
      icon: Calendar,
      title: "Plantillas de agenda",
    },
    {
      icon: Share2,
      title: "Material para redes",
    },
    {
      icon: Sparkles,
      title: "Guías de branding",
    },
    {
      icon: BookOpen,
      title: "Manual básico de marketing médico digital",
    },
    {
      icon: ClipboardCheck,
      title: "Checklists de procesos",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-directorio-blue text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Accede a nuestro Kit Digital Salud
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Herramientas, guías y plantillas para que especialistas y centros médicos fortalezcan su presencia digital.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Incluye:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kitItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                  <Icon className="w-6 h-6 text-saludpro-green flex-shrink-0" />
                  <p className="text-white">{item.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center">
          <Link href="/kit-digital">
            <Button className="bg-saludpro-green hover:bg-saludpro-green/90 text-white px-8 py-6 text-lg">
              Ver Kit Digital
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
