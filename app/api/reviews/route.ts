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

// GET - Obtener reviews de una empresa
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const company_id = searchParams.get('company_id')

    if (!company_id) {
      return NextResponse.json(
        { error: 'company_id es requerido' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('company_reviews')
      .select('*')
      .eq('company_id', company_id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener reviews:', error)
      return NextResponse.json(
        { error: 'Error al obtener reviews', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Error en API de reviews:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva review
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
      .from('company_reviews')
      .insert({
        company_id,
        rating,
        title,
        comment,
        author_name,
        author_email,
        is_approved: false,
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

// PUT - Actualizar review (aprobar/rechazar)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, is_approved, owner_response } = body

    if (!id) {
      return NextResponse.json(
        { error: 'id es requerido' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (typeof is_approved === 'boolean') {
      updateData.is_approved = is_approved
    }
    if (owner_response !== undefined) {
      updateData.owner_response = owner_response
      updateData.owner_response_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('company_reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error al actualizar review:', error)
      return NextResponse.json(
        { error: 'Error al actualizar review', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Error en API de reviews:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar review
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'id es requerido' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('company_reviews')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error al eliminar review:', error)
      return NextResponse.json(
        { error: 'Error al eliminar review', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error en API de reviews:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
