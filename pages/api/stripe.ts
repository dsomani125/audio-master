import Stripe from "stripe";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, '');

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MKsY9SJ9CxCmnTF9db1jey5" },
          { shipping_rate: "shr_1MKsZTSJ9CxCmnTFKfxPEpzL" },
        ],
        line_items: req.body.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/e5mrq85j/production/"
            )
            .replace("-png", ".png");

            return {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: item.name,
                  images: [newImage] 
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity
            }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
