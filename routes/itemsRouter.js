import { Router } from "express";
import { itemsCtrl } from "../controllers/itemsCtrl.js";
import { item } from "../validators/index.js";

export const itemsRouter = Router();

itemsRouter.get('/:id', itemsCtrl.getOne)
itemsRouter.get('/', itemsCtrl.getAll)
itemsRouter.post('/', item, itemsCtrl.create)
itemsRouter.delete('/:id')