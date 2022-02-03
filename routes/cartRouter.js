import { Router } from "express";
import { cartCtrl } from '../controllers/cartCtrl.js'
import { extractjwt } from '../middlewares/extractJwt.js';

export const cartRouter = Router();

cartRouter.get('/', extractjwt, cartCtrl.get)
cartRouter.post('/:id')