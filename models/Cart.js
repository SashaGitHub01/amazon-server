import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },

   items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],

   totalPrice: {
      type: Number,
      default: 0,
   },

   totalItems: {
      type: Number,
      default: 0,
   },
})

export const Cart = model('Cart', CartSchema);