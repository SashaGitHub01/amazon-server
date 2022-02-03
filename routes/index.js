import { Router } from "express";
import { stripeRouter } from "./stripeRouter.js";
import { userRouter } from "./userRouter.js";
import { itemsRouter } from "./itemsRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { cartRouter } from "./cartRouter.js";
import { ratingRouter } from './ratingRouter.js';
import { cartItemRouter } from "./cartitemRouter.js";
import { rateItemRouter } from './rateItemRouter.js';
import { uploadsRouter } from "./uploadsRouter.js";

export const router = Router()

router.use('/user', userRouter)
router.use('/stripe', stripeRouter)
router.use('/items', itemsRouter)
router.use('/category', categoryRouter)
router.use('/cart', cartRouter)
router.use('/rating', ratingRouter)
router.use('/cartitem', cartItemRouter)
router.use('/rate', rateItemRouter)
router.use('/upload', uploadsRouter)