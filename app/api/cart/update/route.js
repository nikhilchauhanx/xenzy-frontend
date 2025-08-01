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

    const { cartItemId, newQuantity } = await request.json()
    if (!cartItemId || newQuantity === undefined) {
      return NextResponse.json({ error: 'Cart Item ID and new quantity are required.' }, { status: 400 })
    }

    // If the new quantity is 0, remove the item instead.
    if (newQuantity <= 0) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);
      if (error) throw error;
      return NextResponse.json({ message: 'Item removed due to zero quantity.' });
    }

    // Otherwise, update the quantity for the specified item.
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', cartItemId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);

  } catch (err) {
    console.error("Error updating cart quantity:", err);
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
