// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';
import { body } from 'express-validator';

// Types
import { SetCorreoRequest } from 'routes/correos/types/correos.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// Handlers
import { hasRepeatedEmailErrorHandler } from '../../common/const';

// .env
dotenv.config();

const correosRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

correosRouter.post(
  '/set-correo',
  body('email').isEmail().normalizeEmail(),
  (req: Request, res: Response<Record<string, never> | BadRequestError>, next) => {
    try {
      const request: SetCorreoRequest = req.body;
      const query = {
        name: 'set-correo',
        text: 'INSERT INTO correos_usuaries(correo) VALUES($1);',
        values: [request.correo]
      };
      const PSQuery = new PreparedStatement(query);
          
      db.none(PSQuery)
        .then(() => {
          res.status(200).json({});
        })
        .catch(err => {
          hasRepeatedEmailErrorHandler(isDebugging, `${err}`, res);
        });
    } catch (err) {
      if (isDebugging) {
        console.log(err);
      }
      next(err);
    }
  }
);

export default correosRouter;

