// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';

// Types
import { GetDiputadeRequest, GetDiputadeResponse } from 'routes/distritos/types/distritos.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// Handlers
import { hasErrorHandler } from '../../common/const';

// .env
dotenv.config();

const distritosRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

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
        text: `SELECT bancada_original,
            nombre_diputade,
            num_entidad,
            ds.distrito,
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
          FROM diputade d, distritos_seccion ds
          WHERE d.num_distrito=ds.distrito and seccion=$1 and ds.entidad=d.num_entidad and ds.entidad=$2`,
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
          hasErrorHandler(isDebugging, `${err}`, res);
        });
    } catch (err) {
      next(err);
    }
  }
);

export default distritosRouter;