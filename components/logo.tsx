import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  asLink?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' // Para controlar qué versión usar
}

export function Logo({ asLink = true, size = 'md', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  }

  const widthClasses = {
    sm: 'w-auto',
    md: 'w-auto',
    lg: 'w-auto',
    xl: 'w-auto'
  }

  // Seleccionar el logo según el variant
  const logoSrc = variant === 'white' 
    ? '/logos/logosaludpro2025_blanco.svg' 
    : '/logos/logosaludpro2025.svg'

  const imgElement = (
    <Image
      src={logoSrc}
      alt="DirectorioSaludPro Logo"
      width={200}
      height={60}
      className={`${sizeClasses[size]} ${widthClasses[size]} transition-transform duration-300 hover:scale-105`}
      priority
    />
  )

  return (
    <div className="flex items-center">
      {asLink ? (
        <Link href="/" className="cursor-pointer">
          {imgElement}
        </Link>
      ) : (
        imgElement
      )}
    </div>
  )
}
