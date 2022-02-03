import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { UserDto } from '../dtos/UserDto.js';

const UserSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },

   username: {
      type: String,
      required: true,
   },

   password: {
      type: String,
      required: true,
   },

   cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart"
   },

   orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

   rates: [{ type: Schema.Types.ObjectId, ref: 'RateItem' }]
})

UserSchema.set('toJSON', {
   transform: function (doc, ret) {
      return new UserDto(ret)
   }
})

export const User = model('User', UserSchema);