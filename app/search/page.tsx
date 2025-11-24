"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Search, Loader2, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LpNavbar1 } from "@/components/lp-navbar-1"

export const dynamic = 'force-dynamic'

interface Company {
  id: string
  slug: string
  company_name: string
  category: string
  industry: string | null
  city: string | null
  short_description: string | null
  company_images: Array<{
    image_type: string
    image_url: string
  }>
}

const categoryLabels: Record<string, string> = {
  'especialista-salud': 'Especialista en Salud',
  'centro-medico': 'Centro Médico',
  'agente-digitalizador': 'Agente Digitalizador'
}

const industryLabels: Record<string, string> = {
  'Psicología': 'Psicología',
  'Nutrición': 'Nutrición',
  'Fisioterapia': 'Fisioterapia',
  'Medicina general': 'Medicina general',
  'Terapias alternativas': 'Terapias alternativas',
  'Dermatología': 'Dermatología',
  'Odontología': 'Odontología',
  'Fonoaudiología': 'Fonoaudiología',
  'Wellness & Fitness': 'Wellness & Fitness',
  'Centros Médicos': 'Centros Médicos',
  'Terapia ocupacional': 'Terapia ocupacional',
  'Pediatría': 'Pediatría',
  'Cardiología': 'Cardiología'
}

const cityLabels: string[] = [
  'Cali',
  'Bogotá',
  'Medellín',
  'Barranquilla',
  'Bucaramanga',
  'Pereira'
]

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    searchCompanies()
  }, [query, selectedCategory, selectedIndustry, selectedCity])

  const searchCompanies = async () => {
    setIsLoading(true)
    
    try {
      let queryBuilder = supabase
        .from('companies')
        .select(`
          id,
          slug,
          company_name,
          category,
          industry,
          city,
          short_description,
          company_images (
            image_type,
            image_url
          )
        `)
        .eq('is_active', true)
        .eq('visibility', 'public')
        .order('views_count', { ascending: false })
        .limit(50)

      // Aplicar filtro de búsqueda
      if (query) {
        queryBuilder = queryBuilder.or(`company_name.ilike.%${query}%,industry.ilike.%${query}%,city.ilike.%${query}%,short_description.ilike.%${query}%`)
      }

      // Aplicar filtro de categoría
      if (selectedCategory) {
        queryBuilder = queryBuilder.eq('category', selectedCategory)
      }

      // Aplicar filtro de industria (especialidad)
      if (selectedIndustry) {
        queryBuilder = queryBuilder.eq('industry', selectedIndustry)
      }

      // Aplicar filtro de ciudad
      if (selectedCity) {
        queryBuilder = queryBuilder.ilike('city', selectedCity)
      }

      const { data, error } = await queryBuilder

      if (error) throw error

      setCompanies(data || [])
    } catch (error) {
      console.error('Error buscando empresas:', error)
      setCompanies([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchCompanies()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <LpNavbar1 />
      
      {/* Search Bar */}
      <div className="bg-white border-b sticky top-[72px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-primary">Directorio de Especialistas en Salud</h1>
            <p className="text-foreground mt-1">
              Encuentra profesionales verificados de salud y bienestar: psicólogos, nutricionistas, fisioterapeutas y más.
            </p>
          </div>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <Input
                type="text"
                placeholder="Buscar por nombre, especialidad, servicio o ciudad..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-background text-foreground"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Buscar'
              )}
            </Button>
          </form>
          <p className="text-sm text-muted mt-2">
            Encuentra el especialista adecuado según tu necesidad.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-foreground mb-3">Tipo de perfil</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todos
                    </Button>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={selectedCategory === key ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(key)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Industry Filter (Especialidad) */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-foreground mb-3">Especialidad</h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    <Button
                      variant={selectedIndustry === null ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedIndustry(null)}
                    >
                      Todas
                    </Button>
                    {Object.entries(industryLabels).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={selectedIndustry === key ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedIndustry(key)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-foreground mb-3">Ciudad</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCity === null ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCity(null)}
                    >
                      Todas
                    </Button>
                    {cityLabels.map((city) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCity(city)}
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedCategory || selectedIndustry || selectedCity || query) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory(null)
                      setSelectedIndustry(null)
                      setSelectedCity(null)
                      setQuery('')
                    }}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-foreground">
                {isLoading ? (
                  'Buscando...'
                ) : (
                  <>
                    {companies.length} {companies.length === 1 ? 'especialista encontrado' : 'especialistas encontrados'}
                    {query && <span className="font-semibold"> para "{query}"</span>}
                  </>
                )}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((company) => {
                  const logoImage = company.company_images?.find(img => img.image_type === 'logo')
                  const coverImage = company.company_images?.find(img => img.image_type === 'cover')

                  return (
                    <Link key={company.id} href={`/${company.slug}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <CardContent className="p-0">
                          {/* Cover Image */}
                          <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                            {coverImage ? (
                              <Image
                                src={coverImage.image_url}
                                alt={company.company_name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Building2 className="h-16 w-16 text-primary/30" />
                              </div>
                            )}
                            
                            {/* Logo Overlay */}
                            <div className="absolute -bottom-8 left-4">
                              <div className="w-16 h-16 bg-white rounded-lg shadow-lg p-2 border-2 border-white">
                                {logoImage ? (
                                  <Image
                                    src={logoImage.image_url}
                                    alt={`Logo ${company.company_name}`}
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                  />
                                ) : (
                                  <Building2 className="h-full w-full text-primary" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="pt-10 px-4 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                              {company.company_name}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {categoryLabels[company.category]}
                              </Badge>
                              {company.industry && (
                                <Badge variant="outline" className="text-xs">
                                  {company.industry}
                                </Badge>
                              )}
                            </div>

                            {company.short_description && (
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {company.short_description}
                              </p>
                            )}

                            {company.city && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                {company.city}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-20 text-center">
                  <Building2 className="h-16 w-16 text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No se encontraron especialistas
                  </h3>
                  <p className="text-muted mb-6">
                    Intenta con otros términos de búsqueda o ajusta los filtros
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery('')
                      setSelectedCategory(null)
                      setSelectedIndustry(null)
                      setSelectedCity(null)
                    }}
                  >
                    Limpiar búsqueda
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
