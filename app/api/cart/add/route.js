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
    // Get the currently logged-in user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to add items to the cart.' }, { status: 401 })
    }

    // Get the product ID from the request body
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 })
    }

    // --- UPSERT LOGIC ---
    // This is a special Supabase function. It tries to INSERT a new row.
    // If a row with the same user_id and product_id already exists (due to our unique constraint),
    // it will UPDATE that existing row instead of creating a new one.
    // We use a database function `increment_cart_item_quantity` to safely increase the quantity.
    
    // First, we need to create the helper function in our database.
    // We will do this in the next step. For now, let's use a less efficient read-then-write method.

    // Check if the item is already in the cart
    const { data: existingItem, error: selectError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
        throw selectError;
    }

    if (existingItem) {
      // If item exists, increment quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // If item does not exist, insert new row
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json(data, { status: 201 });
    }

  } catch (err) {
    console.error("Error adding to cart:", err);
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
