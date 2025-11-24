"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BenefitsSection() {
  const patientBenefits = [
    "Profesionales verificados y confiables",
    "Información clara y actualizada",
    "Especialistas y centros en múltiples ciudades",
    "Perfiles completos con tarifas, horarios y servicios",
    "Contacto directo con el profesional",
    "Filtros avanzados para encontrar justo lo que necesitas",
  ]

  const professionalBenefits = [
    "Perfil profesional completo y optimizado",
    "Mayor visibilidad digital",
    "Herramientas para atraer más pacientes",
    "Enlace directo a WhatsApp, agenda y redes",
    "Opción de destacar tu perfil",
    "Sin comisiones por pacientes",
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-light">
      <div className="container mx-auto px-6 md:px-12">
        {/* Beneficios para usuarios */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              ¿Qué encontrarás aquí?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {patientBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-saludpro-green flex-shrink-0 mt-1" />
                <p className="text-gray-dark">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios para profesionales */}
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              ¿Por qué registrarte en el Directorio SaludPro?
            </h2>
            <p className="text-gray-medium text-lg">
              Crece tu práctica con nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {professionalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-directorio-blue flex-shrink-0 mt-1" />
                <p className="text-gray-dark">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-light p-6 rounded-lg">
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-saludpro-green font-bold">•</span>
                <p className="text-gray-dark">Digitalizarás tu negocio y tendrás presencia Online.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saludpro-green font-bold">•</span>
                <p className="text-gray-dark">Captarás mayor cantidad de clientes al posicionarte en Google.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saludpro-green font-bold">•</span>
                <p className="text-gray-dark">La ficha es como una página web, estarán todas tus redes sociales, productos y toda la información que necesitan ver tus clientes.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saludpro-green font-bold">•</span>
                <p className="text-gray-dark">Todo esto a un precio súper asequible.</p>
              </li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link href="/auth">
              <Button className="bg-saludpro-green hover:bg-saludpro-green/90 text-white px-8 py-6 text-lg">
                Crear mi perfil profesional
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
