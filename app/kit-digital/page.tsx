"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Globe, 
  Megaphone, 
  Check,
  ChevronRight,
  Users,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Database,
  Send,
  Bot,
  DollarSign,
  ShoppingBag,
  Gift,
  Handshake,
  Heart,
  Calendar,
  Brain,
  MessageCircle,
  Phone
} from "lucide-react"
import { LpNavbar1 } from "@/components/lp-navbar-1"
import { Footer2 } from "@/components/footer-2"
import { useState } from "react"

export default function KitDigitalPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const whatsappLink = "https://wa.me/573126503491?text=Hola%2C%20quiero%20información%20sobre%20el%20Kit%20Digital%20SaludPro"

  return (
    <>
      <LpNavbar1 />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  KIT DIGITAL SALUDPRO
                </h1>
                <p className="text-xl lg:text-2xl font-semibold">
                  Digitaliza tu consulta y aumenta tu visibilidad profesional
                </p>
                <p className="text-lg text-white/90">
                  Transforma tu práctica de salud, atrae más pacientes y optimiza la atención con soluciones diseñadas exclusivamente para profesionales y centros médicos.
                </p>
                <p className="text-lg text-white/90">
                  Con el <strong>Kit Digital SaludPro</strong>, obtienes una <strong>página web profesional</strong>, <strong>campañas digitales especializadas</strong> y acceso a nuestra herramienta estrella:
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-white/30">
                  <p className="text-2xl font-bold">
                    IA Emocional para Agendamiento de Citas
                  </p>
                  <p className="text-lg mt-2">
                    que atiende a tus pacientes 24/7, interpreta emociones, resuelve inquietudes y agenda automáticamente tus consultas en tiempo real.
                  </p>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Heart className="w-5 h-5 mr-2" />
                    Quiero mi Kit Digital SaludPro
                  </a>
                </Button>
                <blockquote className="text-2xl italic border-l-4 border-white pl-6 mt-8">
                  "Tu consulta crece, tus pacientes conectan y tu tiempo se optimiza."
                </blockquote>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src="/kit/1.webp"
                  alt="Kit Digital SaludPro"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Digitalizamos la salud */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
              Digitalizamos la salud, crecemos juntos.
            </h2>
            <p className="text-xl text-foreground max-w-4xl mx-auto">
              Forma parte de una red de especialistas y centros médicos que comparten conocimiento, fortalecen su práctica profesional y construyen juntos una atención más accesible y moderna para los pacientes.
            </p>
          </div>
        </section>

        {/* ¿Qué es el Kit Digital? */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[450px]">
                <Image
                  src="/kit/2.webp"
                  alt="¿Qué es el Kit Digital?"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-10 h-10 text-primary" />
                  <h2 className="text-3xl lg:text-5xl font-bold text-primary">
                    ¿Qué es el Kit Digital Salud Pro?
                  </h2>
                </div>
                <p className="text-lg text-foreground">
                  El <strong>Kit Digital Salud Pro</strong> es una iniciativa creada <strong>por profesionales del sector salud para profesionales del sector salud</strong>, inspirada en modelos internacionales de digitalización médica y adaptada al contexto colombiano.
                </p>
                <p className="text-lg text-foreground">
                  Su propósito es <strong>impulsar la digitalización, la visibilidad y la sostenibilidad de consultorios, especialistas y centros médicos</strong>, fortaleciendo al mismo tiempo la red profesional dentro del ecosistema Salud Pro.
                </p>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-primary">
                    Cada kit impulsa tu crecimiento y te permite:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Tener una presencia digital profesional con web médica optimizada.",
                      "Aumentar tus pacientes con marketing especializado en salud.",
                      "Automatizar tu agenda 24/7 con IA Emocional para citas.",
                      "Posicionar tu marca en un entorno colaborativo y confiable."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <span className="text-lg text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hecho por especialistas */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Handshake className="w-10 h-10 text-primary" />
                  <h2 className="text-3xl lg:text-5xl font-bold text-primary">
                    Hecho por especialistas, para especialistas
                  </h2>
                </div>
                <p className="text-lg text-foreground">
                  El Kit Digital Salud Pro es implementado por un grupo especializado de diseñadores, comunicadores médicos, técnicos en salud digital y profesionales certificados dentro del propio directorio, llamados:
                </p>
                <blockquote className="text-2xl font-bold text-accent border-l-4 border-accent pl-6">
                  Agentes Digitalizadores Clínicos
                </blockquote>
                <div className="space-y-4">
                  <p className="text-lg text-foreground">
                    Estos <strong>Agentes Digitalizadores Clínicos</strong> son profesionales de la salud y expertos en digitalización que entienden los desafíos reales de una consulta, un consultorio o un centro médico.
                  </p>
                  <p className="text-lg text-foreground">
                    Ahora ponen su conocimiento al servicio de otros especialistas como parte de un modelo colaborativo basado en calidad, ética y crecimiento colectivo.
                  </p>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-accent">
                    <h3 className="text-xl font-bold text-primary mb-4">Beneficios de trabajar con Agentes Digitalizadores Clínicos</h3>
                    <ul className="space-y-3">
                      {[
                        "La inversión se queda en tu región, fortaleciendo la red de especialistas locales.",
                        "La calidad está garantizada, porque los servicios provienen de profesionales que conocen la realidad del sector salud.",
                        "Cada implementación genera crecimiento clínico, visibilidad, optimización del tiempo y más oportunidades dentro del Directorio SaludPro."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <blockquote className="text-xl italic text-foreground bg-white p-6 rounded-lg border-l-4 border-primary">
                  "Cada profesional que adquiere un Kit Digital está apoyando a otros especialistas de su propio ecosistema de salud."
                </blockquote>
              </div>
              <div className="relative h-[550px]">
                <Image
                  src="/kit/3.webp"
                  alt="Hecho por especialistas"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué incluye? */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-12">
              <ShoppingBag className="w-10 h-10 text-primary" />
              <h2 className="text-3xl lg:text-5xl font-bold text-primary text-center">
                ¿Qué incluye el Kit Digital SaludPro?
              </h2>
            </div>
            
            <div className="relative h-[500px] mb-12 max-w-4xl mx-auto">
              <Image
                src="/kit/4.webp"
                alt="Kit Digital incluye"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Página Web */}
              <Card className="border-2 border-primary/20 hover:border-primary transition-colors shadow-lg hover:shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    🟢 Página Web Profesional en Salud
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Diseño profesional por especialidad.",
                      "Sitio web adaptable a cualquier dispositivo.",
                      "SEO Médico Local optimizado.",
                      "Botones directos de citas y WhatsApp.",
                      "Dominio y hosting por un año."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Campañas Digitales */}
              <Card className="border-2 border-primary/20 hover:border-primary transition-colors shadow-lg hover:shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    🟢 Campañas Digitales para Especialistas
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Creativos éticos y aprobados.",
                      "Estrategias para captar pacientes.",
                      "Optimización continua de anuncios.",
                      "Reportes claros orientados a citas.",
                      "Acompañamiento personalizado."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Herramientas PLUS */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gift className="w-10 h-10 text-primary" />
              <h2 className="text-3xl lg:text-5xl font-bold text-primary text-center">
                Herramientas PLUS de impulso profesional
              </h2>
            </div>
            <p className="text-xl text-foreground text-center mb-12 max-w-4xl mx-auto">
              Cada especialista que adquiera su <strong>Kit Digital SaludPro</strong> recibirá <strong>1 mes de acceso gratuito</strong> a estas herramientas tecnológicas exclusivas con alto valor comercial en el mercado de la salud digital.
            </p>

            <div className="relative h-[550px] mb-12 max-w-4xl mx-auto">
              <Image
                src="/kit/6.webp"
                alt="Herramientas PLUS"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Herramienta</th>
                    <th className="px-6 py-4 text-left font-semibold">Descripción</th>
                    <th className="px-6 py-4 text-left font-semibold">Valor comercial</th>
                    <th className="px-6 py-4 text-left font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        <span className="font-medium">MEGA EXTRACTOR</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">Acceso a bases clasificadas por ciudad, interés e industria de salud, útiles para análisis de mercado y estudio de demanda.</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">$1.000.000</td>
                    <td className="px-6 py-4 text-gray-700">1 mes</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5 text-primary" />
                        <span className="font-medium">MEGA ENVÍOS</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">Plataforma para enviar mensajes masivos por WhatsApp o correo.</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">$1.000.000</td>
                    <td className="px-6 py-4 text-gray-700">1 mes</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-primary" />
                        <span className="font-medium">CRM IA-E</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">Sistema que gestiona de forma automatizada tus conversaciones y emociones del cliente.</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">$3.000.000</td>
                    <td className="px-6 py-4 text-gray-700">1 mes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Impacto y Propósito */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[550px]">
                <Image
                  src="/kit/7.webp"
                  alt="Impacto y Propósito"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-10 h-10 text-primary" />
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    Impacto y propósito del Kit Digital
                  </h2>
                </div>
                <p className="text-lg text-gray-700">
                  El <strong>Kit Digital Salud Pro</strong> no es solo tecnología; es una red de apoyo clínico y colaboración entre especialistas que impulsa el crecimiento profesional, mejora la atención al paciente y fortalece el ecosistema de salud en Colombia.
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: DollarSign, text: "Impulsa la atención local y fortalece especialistas de la región." },
                    { icon: Users, text: "Conecta profesionales de la salud para generar sinergias." },
                    { icon: Award, text: "Aumenta la visibilidad colectiva dentro de SaludPro." },
                    { icon: TrendingUp, text: "Promueve digitalización real aplicada a la práctica clínica." }
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <span className="text-lg text-gray-700">{item.text}</span>
                      </li>
                    )
                  })}
                </ul>
                <blockquote className="text-xl italic text-primary bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  "Este programa une talento médico, mejora la atención y crea oportunidades reales para tu consulta."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Calendar className="w-10 h-10 text-primary" />
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-center">
                ¿Cómo funciona el proceso?
              </h2>
            </div>
            
            <div className="relative h-[550px] mb-12 max-w-3xl mx-auto">
              <Image
                src="/kit/8.webp"
                alt="Proceso del Kit Digital"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Solicita tu Kit Digital",
                  description: "Completa el formulario o contáctanos por WhatsApp."
                },
                {
                  step: "2",
                  title: "Asignación de Agente",
                  description: "Se te conectará con un experto emprendedor de tu región."
                },
                {
                  step: "3",
                  title: "Ejecución del plan",
                  description: "En menos de 21 días hábiles tendrás tu sitio web, campaña digital y material publicitario."
                },
                {
                  step: "4",
                  title: "Entrega de bonos",
                  description: "Acceso a las herramientas PLUS y capacitación para aprovecharlas al máximo."
                }
              ].map((item) => (
                <Card key={item.step} className="border-2 hover:border-primary transition-colors relative overflow-hidden shadow-lg hover:shadow-xl">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full flex items-start justify-end p-4">
                    <span className="text-3xl font-bold text-primary">{item.step}</span>
                  </div>
                  <CardContent className="p-6 pt-16">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Inversión */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-12">
              <DollarSign className="w-10 h-10" />
              <h2 className="text-3xl lg:text-5xl font-bold text-center">
                $ Inversión y valor comercial
              </h2>
            </div>

            <p className="text-xl text-center mb-8 max-w-4xl mx-auto">
              Los servicios incluidos en el <strong>Kit Digital SaludPro</strong> reúne soluciones que normalmente tendrías que contratar por separado y a un costo mucho más alto.
            </p>
            <p className="text-lg text-center mb-12 max-w-4xl mx-auto text-white/90">
              Sin embargo, gracias a nuestro modelo de trabajo y al convenio con el <strong>Directorio SaludPro</strong>, hoy puedes acceder a un paquete completo, profesional y especializado en salud a un precio preferencial.
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white text-foreground rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-primary/10 px-6 py-4 border-b-2 border-primary/20">
                  <h3 className="text-2xl font-bold text-primary text-center">
                    Valor comercial del paquete (referencia sector salud)
                  </h3>
                </div>
                <table className="w-full">
                  <thead className="bg-secondary border-b-2 border-primary/10">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-primary">Concepto</th>
                      <th className="px-6 py-4 text-right font-semibold text-primary">Valor comercial</th>
                      <th className="px-6 py-4 text-right font-semibold text-primary">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { concept: "Página Web Profesional en Salud", value: "$3.500.000", duration: "1 Año" },
                      { concept: "Campañas Digitales Especializadas", value: "$3.000.000", duration: "1 Mes" },
                      { concept: "MegaBusiness Envíos Masivos a Pacientes", value: "$1.500.000", duration: "1 Año" },
                      { concept: "MegaBusiness Extractor BD Segmentadas", value: "$1.000.000", duration: "1 Año" },
                      { concept: "Analítica de Conversaciones con IA Médica", value: "$2.000.000", duration: "1 Mes" },
                      { concept: "IA Emocional + CRM para Consultorios", value: "$2.500.000", duration: "1 Mes" }
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-secondary/50">
                        <td className="px-6 py-4">{item.concept}</td>
                        <td className="px-6 py-4 text-right font-medium">{item.value}</td>
                        <td className="px-6 py-4 text-right text-muted">{item.duration}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary text-white font-bold">
                      <td className="px-6 py-4 text-lg">Valor total del Kit SaludPro</td>
                      <td className="px-6 py-4 text-right text-xl">$13.500.000</td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-12 space-y-6">
                <div className="bg-accent text-white rounded-2xl p-8 inline-block shadow-2xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-6 h-6" />
                    <p className="text-2xl">💚 Tú solo inviertes:</p>
                  </div>
                  <p className="text-5xl font-bold">$5.500.000 COP</p>
                </div>
                <p className="text-xl">
                  Ahorra más de <strong>$7.000.000 COP</strong> y recibe un paquete optimizado, creado exclusivamente para profesionales de salud.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 shadow-xl"
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Heart className="w-5 h-5 mr-2" />
                      Solicitar mi Kit Digital
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Phone className="w-5 h-5 mr-2" />
                      Hablar con un Agente
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-12">
              <MessageCircle className="w-10 h-10 text-primary" />
              <h2 className="text-3xl lg:text-5xl font-bold text-primary text-center">
                Preguntas Frecuentes
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "¿Quién puede acceder al Kit Digital SaludPro?",
                  a: "Todo profesional o centro de salud que desee digitalizar su negocio: psicología, nutrición, fisioterapia, medicina general, odontología, dermatología, terapias alternativas, centros médicos y más."
                },
                {
                  q: "¿Quién desarrolla los Kits?",
                  a: "Los Kits son desarrollados por agencias y profesionales de marketing y soluciones digitales especializados en el sector salud."
                },
                {
                  q: "¿El dominio y hosting están incluidos?",
                  a: "Sí. Ambos están incluidos por un año completo más su certificado SSL."
                },
                {
                  q: "¿Cuándo recibo mi Kit?",
                  a: "Entre 15 y 21 días hábiles, según la disponibilidad del especialista y tiempos de revisión."
                },
                {
                  q: "¿Puedo obtener soporte técnico?",
                  a: "Sí. Tendrás acompañamiento personalizado durante la implementación y después de la entrega."
                },
                {
                  q: "¿Qué impacto tiene mi inversión?",
                  a: "Fortalece tu negocio con herramientas digitales y contribuye al crecimiento de otros especialistas dentro del ecosistema SaludPro."
                },
                {
                  q: "¿La IA Emocional cumple con buenas prácticas?",
                  a: "Sí. Está diseñada para atención inicial, orientación y agendamiento, evitando diagnósticos o recomendaciones clínicas no autorizadas."
                },
                {
                  q: "¿El sitio web cumple con estándares de ética médica?",
                  a: "Sí. Toda la información se estructura con enfoque profesional, claro y responsable, evitando publicidad invasiva o promesas clínicas indebidas."
                },
                {
                  q: "¿Mis datos y los de mis pacientes están seguros?",
                  a: "Sí. Toda la información se gestiona bajo protocolos de seguridad, encriptación y buenas prácticas de privacidad. Además, las integraciones del Kit funcionan sobre herramientas oficiales de META, garantizando entornos confiables y autorizados para la comunicación con tus pacientes."
                },
                {
                  q: "¿La IA puede responder por WhatsApp?",
                  a: "Sí. Gestiona mensajes 24/7, agenda citas y clasifica pacientes automáticamente."
                },
                {
                  q: "¿Qué necesito para empezar?",
                  a: "Solo tu información profesional, servicios que ofreces, horarios y datos básicos de contacto."
                }
              ].map((faq, i) => (
                <Card 
                  key={i} 
                  className="cursor-pointer hover:shadow-lg transition-all shadow-md border-2 border-primary/20 hover:border-accent"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-semibold text-primary">{faq.q}</h3>
                      <ChevronRight 
                        className={`w-6 h-6 text-accent flex-shrink-0 transition-transform ${
                          openFAQ === i ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    {openFAQ === i && (
                      <p className="mt-4 text-foreground">{faq.a}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="relative h-[100px] mb-8 max-w-3xl mx-auto">
              <Image
                src="logos\logosaludpro2025_blanco.svg"
                alt="Logos Directorio SaludPro"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Unéte a cientos de especialistas y centros médicos que ya están digitalizando su práctica, optimizando su atención y conectando con más pacientes cada día.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 shadow-2xl"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Heart className="w-5 h-5 mr-2" />
                Solicitar mi Kit Digital ahora
              </a>
            </Button>
            <div className="mt-12 pt-8 border-t border-white/20">
              <blockquote className="text-xl italic text-white/90">
                "Una iniciativa creada para potenciar la visibilidad, modernizar la atención y fortalecer el ecosistema de salud en Colombia."
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      <Footer2 />
    </>
  )
}
