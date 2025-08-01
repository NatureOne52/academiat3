import Stripe from "stripe";
import { getStripeCustomerId } from "./getSripeCustomerId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const getUserReceipts = async (userId: string) => {
  try {
    const stripeCustomerId = await getStripeCustomerId(userId);

    if (!stripeCustomerId) {
      throw new Error("No se ha encontrado el customerId");
    }

    const paymentsIntents = await stripe.paymentIntents.list({
      customer: stripeCustomerId,
      limit: 10,
    });

    const receipts = await Promise.all(
      paymentsIntents.data.map(async (paymentIntent) => {
        
        if(typeof paymentIntent.latest_charge === "string"){
          const charge = await stripe.charges.retrieve(paymentIntent.latest_charge)
          return{
            paymentIntentId: paymentIntent.id,
            receiptUrl: charge.receipt_url || null,
          }
        }
        return{
            paymentIntentId: paymentIntent.id,
            receiptUrl: null,
        }
      })
    );
    return receipts;
  } catch (error) {

    console.log("[GET_RECEIPTS_STRIPE]", error);
    return [];  
  }
};