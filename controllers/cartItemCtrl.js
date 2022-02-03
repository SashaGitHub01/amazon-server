import { CartItem } from '../models/CartItem.js';
import { Cart } from '../models/Cart.js';
import { ApiError } from '../utils/ApiError.js';
import { Item } from '../models/Item.js';
import { toFixedPrice } from '../utils/toFixedPrice.js';

class CartItemCtrl {
   create = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const cart = await Cart.findById(user.cart);

         if (!cart) return next(ApiError.notFound())

         const check = await CartItem.findOne({ cart: cart._id, item: id })

         if (check) return next(ApiError.badReq('Cart already contains this item'))

         const item = await Item.findById(id);
         const cartItem = await CartItem.create({ item: id, totalPrice: Number(item.price), cart: cart._id })

         cart.items.push(cartItem._id);
         cart.totalItems += 1;
         cart.totalPrice = toFixedPrice(Number(cart.totalPrice) + Number(item.price))
         await cart.save()
         await cartItem.populate('item')

         return res.json({
            data: cartItem
         })

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }

   delete = async (req, res, next) => {
      try {
         const { id } = req.params;
         const user = req.user;

         const cart = await Cart.findByIdAndUpdate(user.cart, { $pull: { items: id } });
         const del = await CartItem.findByIdAndDelete(id)

         if (!del) return next(ApiError.notFound())

         cart.totalPrice = toFixedPrice(Number(cart.totalPrice) - Number(del.totalPrice))
         cart.totalItems -= del.count;
         await cart.save()

         return res.json({
            data: del
         })
      } catch (err) {
         return next(ApiError.internal(err))
      }
   }

   add = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const cart = await Cart.findById(user.cart);
         const cartItem = await CartItem.findById(id).populate('item');

         if (!cart || !cartItem) return next(ApiError.notFound());

         cart.totalItems += 1;
         cart.totalPrice = toFixedPrice(Number(cart.totalPrice) + Number(cartItem.item.price))
         await cart.save();

         cartItem.count += 1;
         cartItem.totalPrice = toFixedPrice(Number(cartItem.totalPrice) + Number(cartItem.item.price))
         await cartItem.save();

         return res.json({
            data: cartItem
         })

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }

   sub = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const cart = await Cart.findById(user.cart);
         const cartItem = await CartItem.findById(id).populate('item');

         if (!cart || !cartItem) return next(ApiError.notFound());

         cart.totalItems -= 1;
         cart.totalPrice = toFixedPrice(Number(cart.totalPrice) - Number(cartItem.item.price))

         if (cartItem.count == 1) {
            cartItem.remove()
            cart.update({ $pull: { items: id } })
         } else {
            cartItem.count -= 1;
            cartItem.totalPrice = toFixedPrice(Number(cartItem.totalPrice) - Number(cartItem.item.price))
         }

         await cartItem.save();
         await cart.save();

         return res.json({
            data: cartItem
         })

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }
}

export const cartItemCtrl = new CartItemCtrl();