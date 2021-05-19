// Bibliotecas
import express, { Request, Response } from 'express';
import pgpInit, { PreparedStatement } from 'pg-promise';
import  { body } from 'express-validator';
import dotenv from 'dotenv';

// Types
import { GetDiputadeRequest, GetDiputadeResponse } from 'routes/distritos/types/distritos.types';
import { BadRequestError } from 'common/types/error';

// .env
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const isProduction = process.env.NODE_ENV === 'production';
const isDebugging = process.env.DEBUG === 'true';
const distritosRouter = express.Router();
const pgp = pgpInit();
const db = pgp(isProduction ? process.env.DATABASE_URL as string : connectionString);


distritosRouter.post(
  '/get-diputade', 
  (req: Request, res: Response<GetDiputadeResponse | BadRequestError>, next) => {
    const request: GetDiputadeRequest = req.body;
    const seccionRegex = new RegExp('^\\d{4}$');
    const entidadRegex = new RegExp('^\\d{2}$');

    try {
      if (!seccionRegex.test(request.seccion)) {
        const error: BadRequestError = {
          description: 'El formato de la sección es incorrecto.'
        };

        return res.status(400).json(error);
      }

      if (!entidadRegex.test(request.entidad)) {
        const error: BadRequestError = {
          description: 'El formato de la entidad es incorrecto.'
        };

        return res.status(400).json(error);
      }

      const query = {
        name: 'get-diputade',
        text: `select bancada_original,
            nombre_diputade,
            num_entidad,
            d.distrito,
            d.tipo,
            id_legislativo,
            bancada_actual,
            reeleccion,
            reeleccion_suplente,
            licencia,
            licencia_deceso,
            nombre_suplente,
            foto,
            genero,
            nombre_entidad,
            municipio,
            nombre_municipio,
            seccion
          from diputade d, distritos_seccion ds
          where d.num_distrito=ds.distrito and seccion=$1 and ds.entidad=d.num_entidad and ds.entidad=$2`,
        values: [request.seccion, request.entidad]
      };
      const PSQuery = new PreparedStatement(query);
    
      db.one(PSQuery)
        .then(data => {
          res.json({
            ...data
          });
        })
        .catch(err => {
          const error: BadRequestError = {
            description: 'Hubo un error al procesar tu información. Por favor revise su información e intente de nuevo.'
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

export default distritosRouter;