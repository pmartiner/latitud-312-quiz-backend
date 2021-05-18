// Bibliotecas
import express, { Request, Response } from 'express';
import pgpInit, { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';

// Types
import { GetDistritoRequest, GetDistritoResponse } from 'routes/distritos/types/distritos.types';
import { BadRequestError } from 'common/types/error';

// .env
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const isProduction = process.env.NODE_ENV === 'production';
const distritosRouter = express.Router();
const pgp = pgpInit();
const db = pgp(isProduction ? process.env.DATABASE_URL as string : connectionString);

distritosRouter.post('/get-distrito', (req: Request, res: Response<GetDistritoResponse | BadRequestError>, next) => {
  const request: GetDistritoRequest = req.body;
  const cpRegex = new RegExp('^\\d{5}$');

  try {
    if (!cpRegex.test(request.cp)) {
      const error: BadRequestError = {
        description: 'El formato del código postal es incorrecto.'
      };

      return res.status(400).json(error);
    }

    const query = {
      name: 'get-distrito',
      text: 'SELECT distrito FROM distritos_cp WHERE cp = $1',
      values: [request.cp]
    };
    const PSQuery = new PreparedStatement(query);
  
    db.any(PSQuery)
      .then(data => {
        res.json({
          data
        });
      })
      .catch(err => {
        const error: BadRequestError = {
          description: 'Hubo un error al procesar tu información.'
        };

        if (!isProduction) {
          error.errorInfo = `${err}`;
        }

        res.status(400).json(error);
      });
  } catch (err) {
    next(err);
  }
});

export default distritosRouter;