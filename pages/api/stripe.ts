const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {

    try {
        const params ={
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US'], // Specify the countries where shipping addresses are allowed
              },
            shipping_options: [
                { shipping_rate: 'shr_1OyhZfHfDgEy3EbleBGKBYTr' },
                { shipping_rate: 'shr_1OyhaJHfDgEy3EblReN0q56B' },
              ],
            line_items: req.body.map((item: any) => {
                return {
                    price_data: { 
                      currency: 'usd',
                      product_data: { 
                        name: item.name,
                        images: [item.imageUrl],
                      },
                      unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                      enabled:true,
                      minimum: 1,
                    },
                    quantity: item.amount
                  }
            }),
            success_url: `${req.headers.origin}/success?paymentIntentId={session.payment_intent}`,
            cancel_url: `${req.headers.origin}/`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);

      
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}