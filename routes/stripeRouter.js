import express, { Router } from "express";
import { stripeCtrl } from "../controllers/stripeCtrl.js";
import { extractjwt } from '../middlewares/extractJwt.js';
import bodyParser from 'body-parser'

export const stripeRouter = Router();

stripeRouter.post('/create-checkout-session', extractjwt, stripeCtrl.createSession)
stripeRouter.post('/webhooks', stripeCtrl.webhook)