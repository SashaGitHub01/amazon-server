import cloudinary from 'cloudinary'
import { ApiError } from '../utils/ApiError.js';

class UploadsCtrl {
   uploadCategory = async (req, res, next) => {
      try {
         const file = req.file;
         await cloudinary.v2.uploader.upload_stream({ folder: 'amazon/category' }, async (err, result) => {
            if (err || !result) return next(ApiError.badReq('Upload error'));

            return res.json({
               data: result.secure_url
            })
         }).end(file.buffer)

      } catch (err) {
         return next(ApiError.internal())
      }
   }

   uploadItem = async (req, res, next) => {
      try {
         const file = req.file;
         await cloudinary.v2.uploader.upload_stream({ folder: 'amazon/items' }, async (err, result) => {
            if (err || !result) return next(ApiError.badReq('Upload error'));

            return res.json({
               data: result.secure_url
            })
         }).end(file.buffer)

      } catch (err) {
         return next(ApiError.internal())
      }
   }
}

export const uploadsCtrl = new UploadsCtrl()