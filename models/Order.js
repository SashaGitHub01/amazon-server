import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },

   totalPrice: {
      type: Number,
      default: 0
   },

   shippingPrice: {
      type: Number,
      default: 0
   },

   orderId: {
      type: String,
      required: true
   },

   items: [
      {
         id: String,
         amount_subtotal: Number,
         amount_total: Number,
         currency: String,
         description: String,
         quantity: String
      }
   ],

   images: [{ type: String }]

}, { timestamps: true })

export const Order = model('Order', OrderSchema)