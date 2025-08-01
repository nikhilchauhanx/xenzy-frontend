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
      return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 })
    }

    const { cartItemId } = await request.json()
    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart Item ID is required.' }, { status: 400 })
    }

    // Delete the item from the cart_items table where the ID matches
    // and the user_id matches the logged-in user (for security).
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
      .eq('user_id', user.id)

    if (error) throw error;

    return NextResponse.json({ message: 'Item removed successfully.' });

  } catch (err) {
    console.error("Error removing from cart:", err);
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
