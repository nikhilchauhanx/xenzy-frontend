import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
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
      return NextResponse.json({ error: 'You must be logged in to update a product.' }, { status: 401 })
    }

    const productId = params.id;
    // We now accept the imageUrl from the request body
    const { name, price, description, imageUrl } = await request.json();

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required.' }, { status: 400 })
    }

    // --- THIS IS THE FIX ---
    // We are now using the exact column names from your database schema:
    // 'name', 'price', 'description', and 'imageUrl' (camelCase).
    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        price: parseFloat(price),
        description,
        imageUrl, // This now matches your database schema
      })
      .eq('id', productId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      // This will now catch any other database errors and report them clearly.
      throw new Error(`Database error: ${error.message}`)
    }

    return NextResponse.json(data);

  } catch (err) {
    // This ensures we always return a valid JSON response, even on a crash.
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
