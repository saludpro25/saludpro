import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { CompanyProfile } from "@/components/company/company-profile"
import type { CompanyWithRelations } from "@/lib/types/database.types"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient()
  
  const { data: company } = await supabase
    .from('companies')
    .select('company_name, short_description')
    .eq('slug', params.slug)
    .single()

  if (!company) {
    return {
      title: 'Perfil no encontrado - Directorio SaludPro',
    }
  }

  return {
    title: `${company.company_name} - Directorio SaludPro`,
    description: company.short_description || `Conoce más sobre ${company.company_name} en el Directorio SaludPro`,
    openGraph: {
      title: company.company_name,
      description: company.short_description,
      type: 'website',
    },
  }
}

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient()
  
  // Fetch company with all related data
  const { data: company, error } = await supabase
    .from('companies')
    .select(`
      *,
      social_links (*),
      company_images (*),
      company_stats (*)
    `)
    .eq('slug', params.slug)
    .eq('is_active', true)
    .eq('visibility', 'public')
    .single()

  // Fetch products separately
  let products = []
  if (company) {
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .eq('company_id', company.id)
      .order('created_at', { ascending: false })
    
    products = productsData || []
  }

  if (error || !company) {
    console.error('Error loading company:', error)
    notFound()
  }

  // Format data for CompanyProfile component
  const companyData: CompanyWithRelations = {
    ...company,
    social_links: company.social_links || [],
    company_images: company.company_images || [],
    company_stats: company.company_stats?.[0] || null,
    products: products
  }

  return <CompanyProfile company={companyData} />
}
