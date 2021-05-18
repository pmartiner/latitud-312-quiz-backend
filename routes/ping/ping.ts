import express, { Handler } from 'express';
import cors from 'cors';

const pingRouter = express.Router();

pingRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

pingRouter.get('/', cors() as Handler, (req, res) => res.send('¡PONG!'));

export default pingRouter;