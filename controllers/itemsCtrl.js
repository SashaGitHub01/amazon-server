import { Item } from '../models/Item.js'
import { ApiError } from '../utils/ApiError.js';
import { validationResult } from 'express-validator';
import { Rating } from '../models/Rating.js';

class ItemsCtrl {
   create = async (req, res, next) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) return next(ApiError.badReq('Creation error', errors))

         const item = await Item.create({ ...req.body });
         if (!item) return next(ApiError.badReq('error'))

         const rating = await Rating.create({ item: item._id, totalRate: 0, count: 0 });
         if (!rating) return ApiError.badReq('error')

         item.rating = rating._id;
         await item.save()
         await item.populate('rating category')

         return res.json({
            data: item
         })

      } catch (err) {
         return next(ApiError.internal())
      }
   }

   getAll = async (req, res, next) => {
      try {
         const { category, query } = req.query;
         let items;

         if (category && query) {
            items = await Item.find({ $and: [{ title: { $regex: query, $options: 'i' } }, { category }] })
               .populate('rating')
         } else if (category) {
            items = await Item.find({ category })
               .populate('rating')
         } else if (query) {
            items = await Item.find({ title: { $regex: query, $options: 'i' } })
               .populate('rating')
         }

         return res.json({
            data: items
         })

      } catch (err) {
         return next(ApiError.internal())
      }
   }

   getOne = async (req, res, next) => {
      try {
         const { id } = req.params;
         const item = await Item.findById(id).populate('rating category')

         return res.json({
            data: item
         })

      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const itemsCtrl = new ItemsCtrl()