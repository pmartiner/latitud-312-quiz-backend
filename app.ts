// Bibliotecas
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import session, { SessionOptions } from 'express-session';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import pgStore from 'connect-pg-simple';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production';

// Routes
import pingRouter from './routes/ping/ping';
import distritosRouter from './routes/distritos/distritos';

// Helmet
app.use(compression());
app.use(helmet());

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS
const accessList = ['https://latitud312.com/', 'https://latitud312-quiz.vercel.app/'];
const corsOptions = {
  origin: isProduction
    ? function (origin, callback) {
      if (accessList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
    : '*'
};

app.use(cors(corsOptions));

// Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
});

app.use(limiter);

// Cookies
const sess: SessionOptions = {
  secret: process.env.SECRET_SESSION as string,
  cookie: {},
  saveUninitialized: false,
  resave: false
};
 
if (isProduction) {
  const store = new (pgStore(session))();
  app.set('trust proxy', 1); // trust first proxy
  if (sess.cookie) {
    sess.store = store;
    sess.cookie.secure = true; // serve secure cookies
  }
}
 
app.use(session(sess));

// JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cookieParser());

// Routers
app.get('/', function (req, res) {
  res.send('<h1>Hecho con ❤️ por Pablo Martínez.</h1>');
});
app.use('/ping', pingRouter);
app.use('/distritos', distritosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.send('<h1>Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});