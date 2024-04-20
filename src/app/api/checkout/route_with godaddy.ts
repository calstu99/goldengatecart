import { NextResponse } from "next/server";
import dev from '../../../app/util/env';
// export const dynamic = 'force-static';


/*  The "app/ Static to Dynamic Error" happens when one of your routes in the app/ directory 
is initially generated statically at build time, but during runtime it attempts to use dynamic
 server values (such as cookies() or headers()) either for a fallback path or while a path is
  being revalidated.*/


const stripe = require("stripe")(process.env.STRIPE_SECRET);


// Determine the checkout URL based on the environment
const successUrl = dev
? 'http://localhost:3000/success'
: 'http://www.goldengatecart.com/success';

const cancelUrl = dev
? 'http://localhost:3000/cancel'
: 'http://www.goldengatecart.com/cancel';

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products } = await request.json();
  const data: Product[] = products;

  let activeProducts = await getActiveProducts();

  try {
    for (const product of data) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
      );

      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }

  activeProducts = await getActiveProducts();
  let stripeItems: any = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    // success_url: "http://localhost:3000/success",
    success_url: successUrl,
    cancel_url: cancelUrl,
   
  });

  return NextResponse.json({ url: session.url });
};
