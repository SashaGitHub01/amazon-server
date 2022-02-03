import { body } from 'express-validator';

export const reg = [
   body('email', 'Введите email')
      .isEmail()
      .withMessage('Неверный формат email')
      .isLength({ min: 5, max: 35 })
      .withMessage('Min count of characters is 5, and max count is 35'),

   body('username', 'Введите email')
      .isString()
      .withMessage('Неверный формат')
      .isLength({ min: 2, max: 35 })
      .withMessage('Min count of characters is 5, and max count is 35'),


   body('password', 'Укажите пароль')
      .isString()
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage('Минимальный длина пароля - 6 символов')
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
      .withMessage('Минимальный длина пароля - 6 символов')
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