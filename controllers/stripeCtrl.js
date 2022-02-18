import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);
import { ApiError } from '../utils/ApiError.js'
import { Cart } from '../models/Cart.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';

const endpointSecret = process.env.STRIPE_SIGN_SECRET;

const fulfillOrder = async (session) => {
   try {
      const items = await stripe.checkout.sessions.listLineItems(session.id)

      const order = await Order.create({
         orderId: session.id,
         user: session.metadata.user,
         images: JSON.parse(session.metadata.images),
         totalPrice: session.amount_total / 100,
         shippingPrice: session.total_details.amount_shipping / 100,
         items: items.data
      })

      const user = await User.findByIdAndUpdate(order.user, { $push: { orders: order._id } })
      await Cart.findByIdAndUpdate(user.cart, { items: [], totalPrice: 0, totalItems: 0 })
      await CartItem.deleteMany({ cart: user.cart })

      return order;
   } catch (err) {
      throw new Error(err?.message)
   }
}

class StripeCtrl {
   createSession = async (req, res, next) => {
      try {
         const user = req.user;
         const { items } = req.body;

         if (!items) return next(ApiError.badReq('Incorrect data'))

         const list_items = items.map((item) => ({
            description: item.item.description,
            quantity: item.count,
            price_data: {
               currency: 'usd',
               unit_amount: item.item.price * 100,
               product_data: {
                  name: item.item.title,
                  images: [item.item.image]
               }
            }
         }))

         const session = await stripe.checkout.sessions.create({
            line_items: list_items,
            payment_method_types: ['card'],
            shipping_address_collection: {
               allowed_countries: ['RU', 'US', 'UA', 'KZ', 'GB']
            },
            shipping_rates: ['shr_1KOOX0I6ao7NiGNHLIT1hi5s'],
            mode: 'payment',
            success_url: `${process.env.HOST}/pay/success`,
            cancel_url: `${process.env.HOST}/pay/canceled`,
            metadata: {
               user: user.id,
               email: user.email,
               images: JSON.stringify(items.map(({ item }) => {
                  return item.image
               }))
            }
         })

         return res.json({
            data: { id: session.id }
         })

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }

   webhook = async (req, res, next) => {
      try {
         let event = req.body;

         if (endpointSecret) {
            const sign = req.headers['stripe-signature'];

            event = stripe.webhooks.constructEvent(
               req.rawBody,
               sign,
               endpointSecret
            )
         }

         if (event?.type === 'checkout.session.completed') {
            const order = await fulfillOrder(event.data.object);

            return res.json({
               data: order
            })
         }

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }
}

export const stripeCtrl = new StripeCtrl()