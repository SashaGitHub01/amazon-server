import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartItemSchema = new Schema({
   cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart'
   },

   item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
   },

   count: {
      type: Number,
      default: 1
   },

   totalPrice: Number
})

export const CartItem = model('CartItem', CartItemSchema)