import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RatingSchema = new Schema({
   count: {
      type: Number,
      default: 0
   },

   item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
   },

   rates: [{
      type: Schema.Types.ObjectId,
      ref: 'RateItem'
   }],

   totalRate: {
      type: Number,
      default: 0
   },
})

export const Rating = model("Rating", RatingSchema)