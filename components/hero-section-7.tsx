"use client";

import DirectorySearchBar from "@/components/directory-search-bar";
import { HealthMatrixBackground } from "@/components/health-matrix-background";
import Image from "next/image";

export function HeroSection7() {
  return (
    <section
      className="relative h-screen w-full bg-background overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Fondo animado con iconos médicos */}
      <HealthMatrixBackground />

      {/* Contenido principal */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl">
          {/* Columna izquierda: Texto y buscador */}

          {/* Columna derecha: Imagen */}
          <div className="flex items-center justify-center order-first lg:order-last">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/10">
              <Image
                src="/hero.webp"
                alt="Hero SaludPro"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8">
            <h1
              id="hero-heading"
              className="text-primary font-bold text-center lg:text-left"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                DIRECTORIO SALUDPRO
              </div>
            </h1>
            <div className="text-muted-foreground text-base md:text-lg lg:text-xl text-center lg:text-left space-y-3">
              <p className="leading-relaxed">
                Encuentra especialistas confiables, centros médicos verificados
                y servicios de salud en tu ciudad.
              </p>
              <p className="leading-relaxed text-accent font-medium">
                El directorio profesional para conectar pacientes con
                especialistas verificados en Colombia.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <DirectorySearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
