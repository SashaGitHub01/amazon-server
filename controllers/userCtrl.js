import { ApiError } from '../utils/ApiError.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { Cart } from '../models/Cart.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken';

const cookieSetup = {
   maxAge: 999999999999999,
   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
   httpOnly: process.env.NODE_ENV === 'production' ? false : true,
   secure: process.env.NODE_ENV === 'production' ? true : false
}

class UserCtrl {
   create = async (req, res, next) => {
      try {
         const errors = validationResult(req);
         console.log(errors);
         if (!errors.isEmpty()) return next(ApiError.badReq('Invalid data', errors))

         const check = await User.findOne({ email: req.body.email })
         if (check) return next(ApiError.badReq('User with this email already exists'))

         const hash = await bcrypt.hash(req.body.password, 5);

         const userData = {
            password: hash,
            username: req.body.username,
            email: req.body.email,
         }

         const user = await User.create(userData)
         if (!user) return next(ApiError.internal())

         const cart = await Cart.create({ user: user.id })
         user.cart = cart._id;
         user.populate('rates orders')
         await user.save()

         const token = jwt.sign({ user: user.id }, process.env.SECRET_KEY)
         res.cookie('myToken', token, cookieSetup)
         return res.json({
            data: user
         })
      } catch (err) {
         return next(ApiError.internal(err))
      }
   }

   login = async (req, res, next) => {
      try {
         if (req.user) {
            const token = jwt.sign({ user: req.user.id }, process.env.SECRET_KEY)
            res.cookie('myToken', token, cookieSetup)
         }

         return res.json({
            data: req.user
         })
      } catch (err) {
         return next(ApiError.internal(err.message))
      }
   }

   auth = async (req, res, next) => {
      try {
         const user = req.user;

         return res.json({
            data: user
         })
      } catch (err) {
         return next(ApiError.internal())
      }
   }

   logout = async (req, res, next) => {
      try {
         res.clearCookie('myToken');

         return res.json({
            data: true
         })
      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const userCtrl = new UserCtrl();