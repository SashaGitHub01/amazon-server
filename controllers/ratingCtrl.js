import { Rating } from '../models/Rating.js';
import { ApiError } from '../utils/ApiError.js';

class RatingCtrl {
   create = async (req, res, next) => {
      try {

      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const ratingCtrl = new RatingCtrl()