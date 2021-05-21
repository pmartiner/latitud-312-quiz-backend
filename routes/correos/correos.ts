// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';
import { body } from 'express-validator';

// Types
import { SetCorreoRequest, SetCorreoResponse } from 'routes/correos/types/correos.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// .env
dotenv.config();

const correosRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

correosRouter.post(
  '/set-correo',
  body('email').isEmail().normalizeEmail(),
  (req: Request, res: Response<SetCorreoResponse | BadRequestError>, next) => {
    try {
      const request: SetCorreoRequest = req.body;
      const query = {
        name: 'set-correo',
        text: 'INSERT INTO correos_usuaries(correo) VALUES($1);',
        values: [request.correo]
      };
      const PSQuery = new PreparedStatement(query);
          
      db.one(PSQuery)
        .then(data => {
          console.log(data);
          res.status(200).json({
            data: true
          });
        })
        .catch(err => {
          const error: BadRequestError = {
            description: 'Hubo un error al procesar tu información. Es posible que este correo ya exista en nuestra base de datos. Por favor revise su información e intente de nuevo.'
          };
      
          if (isDebugging) {
            error.errorInfo = `${err}`;
          }
      
          res.status(400).json(error);
        });
    } catch (err) {
      next(err);
    }
  }
);

export default correosRouter;

