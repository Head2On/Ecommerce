import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const cartItems = req.body;
    console.log('Received cartItems:', cartItems); // Debug log

    // Validate that cartItems is a non-empty array
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or data is invalid.' });
    }

    let line_items;
    try {
      line_items = cartItems.map((item) => {
        // Handle both the old flat structure and the new nested 'product' structure
        const product = item.product ? item.product : item;

        // Convert price to number if it's a string
        const price = Number(product.price);

        // --- CRITICAL FIX & VALIDATION ---
        // 1. Ensure the product and its essential properties exist.
        if (!product || !product.name || !product.image || isNaN(price)) {
          // This will stop execution and send a clear error if data is bad.
          throw new Error(`Invalid product: ${JSON.stringify(product)}`);
        }
        
        // 2. Construct the full image URL for your Django backend.
        // Remove protocol if image already has it
        const imageUrl = product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`;

        return {
          price_data: { 
            currency: 'inr',
            product_data: { 
              name: product.name,
              images: [imageUrl], // Use the correctly constructed URL
            },
            // Convert price to the smallest currency unit (e.g., paise for INR)
            unit_amount: Math.round(price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity
        }
      });
    } catch (err) {
      console.error('Line item validation error:', err.message);
      return res.status(400).json({ message: 'Line item validation error: ' + err.message });
    }

    console.log('Processed line_items:', line_items);

    // Create the Stripe Checkout Session parameters
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`, // Redirect to home page on cancellation
    }

    // Create the session
    const session = await stripe.checkout.sessions.create(params);
    
    // Respond with the session object
    res.status(200).json({ id: session.id });

  } catch (err) {
    // If any error occurs, log it on the server and send a 500 response
    console.error('--- STRIPE API ERROR ---', err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
