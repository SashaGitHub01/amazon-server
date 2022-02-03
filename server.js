import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser';
import './core/passport.js'
import './core/cloudinary.js'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import { router } from './routes/index.js'
import { errorCatcher } from './middlewares/errorCatcher.js';
import bodyParser from 'body-parser'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({
   verify: function (req, res, buf) {
      const url = req.url;
      if (url.includes('api/stripe/webhooks')) {
         req.rawBody = buf.toString();
      }
   }
}));

app.use('/api', router)
app.use(errorCatcher)

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);

      app.listen(PORT, () => {
         console.log('ACTIVE', PORT)
      })
   } catch (err) {
      console.log(err)
   }
}

start();