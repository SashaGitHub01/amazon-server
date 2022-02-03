import { Router } from "express";
import { categoryCtrl } from "../controllers/categoryCtrl.js";

export const categoryRouter = Router();

categoryRouter.get('/:id', categoryCtrl.getOne)
categoryRouter.get('/', categoryCtrl.getAll)
categoryRouter.post('/', categoryCtrl.create)
categoryRouter.delete('/:id')