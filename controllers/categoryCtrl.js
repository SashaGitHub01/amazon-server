import { Category } from '../models/Category.js';
import { ApiError } from '../utils/ApiError.js';

class CategoryCtrl {
   create = async (req, res, next) => {
      try {
         const category = await Category.create({ ...req.body });

         return res.json({
            data: category
         })
      } catch (err) {
         return next(ApiError.internal())
      }
   }

   getAll = async (req, res, next) => {
      try {
         const categories = await Category.find();

         return res.json({
            data: categories
         })
      } catch (err) {
         return next(ApiError.internal())
      }
   }

   getOne = async (req, res, next) => {
      try {
         const { id } = req.params;
         const category = await Category.findById(id);

         return res.json({
            data: category
         })
      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const categoryCtrl = new CategoryCtrl()