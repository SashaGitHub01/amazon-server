import { Router } from "express";
import { uploadsCtrl } from "../controllers/uploadsCtrl.js";
import { upload } from '../core/multer.js'

export const uploadsRouter = Router();

uploadsRouter.post('/category', upload.single('image'), uploadsCtrl.uploadCategory)
uploadsRouter.post('/item', upload.single('image'), uploadsCtrl.uploadItem)