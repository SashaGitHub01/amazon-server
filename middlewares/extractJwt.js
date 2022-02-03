import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const extractjwt = async (req, res, next) => {
   try {
      const token = req.cookies?.myToken;

      if (!token) return next(ApiError.unauthorized())

      const { user } = jwt.decode(token)
      const userModel = await User.findById(user).populate('rates orders')

      if (!userModel) return next(ApiError.unauthorized())

      req.user = userModel;
      return next()
   } catch (err) {
      next(ApiError.internal())
   }
}