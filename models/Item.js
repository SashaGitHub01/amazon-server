import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
   title: {
      type: String,
      required: true,
   },

   price: {
      type: String,
      required: true,
   },

   description: {
      type: String,
      required: true,
   },

   category: {
      type: Schema.Types.ObjectId,
      ref: "Category"
   },

   image: String,

   rating: {
      type: Schema.Types.ObjectId,
      ref: "Rating"
   }
})

ItemSchema.index({ title: 'text' })

export const Item = model('Item', ItemSchema);