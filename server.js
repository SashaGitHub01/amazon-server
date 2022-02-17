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
import path from 'path';
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
   origin: ['http://localhost:3000', process.env.HOST, 'https://flamboyant-thompson-058c30.netlify.app'],
   credentials: true
}));
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json({
   verify: function (req, res, buf) {
      const url = req.url;
      if (url.includes('api/stripe/webhooks')) {
         req.rawBody = buf.toString();
      }
   }
}));

app.use('/api', router)

// if (process.env.NODE_ENV === 'production') {
//    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
//    app.get('*', function (req, res) {
//       res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
//    });
// }

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