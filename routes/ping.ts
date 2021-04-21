import express from 'express';

const pingRouter = express.Router();

pingRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

pingRouter.get('/', (req, res) => res.send('¡PONG!'));

export default pingRouter;