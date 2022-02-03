import { Cart } from '../models/Cart.js';
import { ApiError } from '../utils/ApiError.js';

class CartCtrl {
   get = async (req, res, next) => {
      try {
         const user = req.user;
         const cart = await Cart.findById(user.cart)
            .populate({ path: 'items', populate: { path: 'item' } });

         if (!cart) return next(ApiError.notFound())

         return res.json({
            data: cart
         })

      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const cartCtrl = new CartCtrl()