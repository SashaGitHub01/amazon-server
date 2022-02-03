import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RateItemSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },

   item: {
      type: Schema.Types.ObjectId,
      ref: "Item"
   },

   rate: {
      type: Number
   },
})

export const RateItem = model("RateItem", RateItemSchema)