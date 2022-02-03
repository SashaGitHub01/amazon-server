import { Router } from "express";
import { cartItemCtrl } from "../controllers/cartItemCtrl.js";
import { extractjwt } from "../middlewares/extractJwt.js";

export const cartItemRouter = Router();

cartItemRouter.get('/')
cartItemRouter.post('/:id', extractjwt, cartItemCtrl.create)
cartItemRouter.delete('/:id', extractjwt, cartItemCtrl.delete)
cartItemRouter.put('/sub/:id', extractjwt, cartItemCtrl.sub)
cartItemRouter.put('/add/:id', extractjwt, cartItemCtrl.add)