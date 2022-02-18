import { body } from 'express-validator';

export const reg = [
   body('email', 'Enter your email')
      .isEmail()
      .withMessage('Invalid email')
      .isLength({ min: 5, max: 35 })
      .withMessage('Min count of characters is 5, and max count is 35'),

   body('username', 'Enter your name')
      .isString()
      .withMessage('Invadid format')
      .isLength({ min: 2, max: 20 })
      .withMessage('Min count of characters is 2, and max count is 20'),


   body('password', 'Enter your password')
      .isString()
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage('Minimal count of characters in the password is 3')
]

export const login = [
   body('email', 'Введите email')
      .isEmail()
      .withMessage('Неверный формат email')
      .isLength({ min: 5, max: 35 })
      .withMessage('Min count of characters is 5, and max count is 35'),

   body('password', 'Укажите пароль')
      .isString()
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage('Minimal count of characters in the password is 3')
]

export const item = [
   body('title', 'title')
      .isString(),

   body('description', 'description')
      .isString(),

   body('image', 'image')
      .isString(),

   body('price', 'price')
      .isString(),

   body('category', 'category')
      .isString(),
]