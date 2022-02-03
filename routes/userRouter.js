import { Router } from "express";
import passport from "passport";
import { userCtrl } from "../controllers/userCtrl.js";
import { extractjwt } from "../middlewares/extractJwt.js";
import { login, reg } from '../validators/index.js';

export const userRouter = Router();

userRouter.get('/auth', extractjwt, userCtrl.auth)
userRouter.post('/register', reg, userCtrl.create)
userRouter.post('/login', login, passport.authenticate('local'), userCtrl.login)
userRouter.delete('/logout', userCtrl.logout)