import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to create a listing.' }, { status: 401 })
    }

    const productData = await request.json()
    // We are now using the description again
    const { name, price, description, imageUrl } = productData

    if (!name || !price || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // --- RESTORED CODE ---
    // The 'description' field is now included in the insert object.
    const { data, error: dbError } = await supabase
      .from('products')
      .insert({
        name: name,
        description: description, // This line is now back
        price: parseFloat(price),
        imageUrl: imageUrl, // Corrected: Changed 'imageurl' to 'imageUrl' to match your database
        user_id: user.id,
      })
      .select()
      .single()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
