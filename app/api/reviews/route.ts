import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Cliente de Supabase con SERVICE ROLE KEY (bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { company_id, rating, title, comment, author_name, author_email } = body

    // Validaciones básicas
    if (!company_id || !rating || !title || !comment || !author_name || !author_email) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La calificación debe estar entre 1 y 5' },
        { status: 400 }
      )
    }

    // Insertar review usando service role (bypasea RLS)
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        company_id,
        user_id: null, // review anónima
        rating,
        title,
        comment,
        author_name,
        author_email,
        is_approved: false, // requiere aprobación
      })
      .select()
      .single()

    if (error) {
      console.error('Error al insertar review:', error)
      return NextResponse.json(
        { error: 'Error al guardar la review', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Review enviada correctamente',
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error en API de reviews:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
