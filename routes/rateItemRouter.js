import { Router } from "express";
import { rateItemCtrl } from '../controllers/rateItemCtrl.js'
import { extractjwt } from '../middlewares/extractJwt.js';

export const rateItemRouter = Router();

rateItemRouter.post('/:id', extractjwt, rateItemCtrl.create)