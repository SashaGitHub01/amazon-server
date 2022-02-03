import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
   title: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
})

export const Category = model("Category", CategorySchema)