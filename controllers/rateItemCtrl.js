import { RateItem } from '../models/RateItem.js';
import { Item } from '../models/Item.js';
import { Rating } from '../models/Rating.js';
import { toFixedRate } from '../utils/toFixedRate.js'
import { ApiError } from '../utils/ApiError.js';

class RateItemCtrl {
   create = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const { rate } = req.body;
         await user.populate('rates')

         if (user.rates.find((r) => r.item == id)) return next(ApiError.badReq('You have already rated it'))

         const item = await Item.findById(id)
         if (!item) return next(ApiError.notFound());

         const rating = await Rating.findById(item.rating)
         const itemRate = await RateItem.create({ user: user.id, item: id, rate })
         const newTotal = toFixedRate(
            (rating.totalRate * rating.count + Number(rate)) / (Number(rating.count) + 1)
         )

         rating.rates.push(itemRate._id);
         rating.totalRate = newTotal;
         rating.count += 1;
         await rating.save();

         user.rates.push(itemRate._id)
         user.save()

         return res.json({
            data: itemRate
         })

      } catch (err) {
         return next(ApiError.internal(err))
      }
   }
}

export const rateItemCtrl = new RateItemCtrl()