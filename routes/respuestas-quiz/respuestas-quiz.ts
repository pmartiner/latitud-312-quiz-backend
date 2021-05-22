// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';
import { body } from 'express-validator';

// Types
import { Partido, PartidoResponse, SetRespuestaRequest, RespuestaDP } from 'routes/respuestas-quiz/types/respuestas-quiz.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// Handlers
import { hasErrorHandler } from '../../common/const';
import { getColoresPartido } from './utils';

// .env
dotenv.config();

const respuestasRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

respuestasRouter.post(
  '/set-respuestas',
  body('email').isEmail().normalizeEmail(),
  (req: Request, res: Response<Record<string, never> | BadRequestError>, next) => {
    try {
      const request: SetRespuestaRequest[] = req.body;
      
      db.task(t => {
        const insertQueries = request.map(rqst => {
          const query = {
            name: 'set-respuesta',
            text: 'INSERT INTO respuestas_usuarie_quiz(id_pregunta, respuesta, distrito_usuarie) VALUES($1, $2, $3) RETURNING id_respuesta_usuarie;',
            values: [rqst.id_pregunta, rqst.respuesta, rqst.distrito_usuarie]
          };
          const PSQuery = new PreparedStatement(query);

          return t.one(PSQuery);
        });

        return t.batch(insertQueries);
      })
        .then(() => {
          res.status(200).json({});
        })
        .catch((err) => {
          hasErrorHandler(isDebugging, `${err}`, res);
        });
    } catch (err) {
      if (isDebugging) {
        console.log(err);
      }
      next(err);
    }
  }
);

respuestasRouter.get(
  '/get-respuestas-diputade/:id',
  body('email').isEmail().normalizeEmail(),
  (req: Request<{ id: number }>, res: Response<RespuestaDP[] | BadRequestError>, next) => {
    try {
      const id = req.params.id;
      const query = {
        name: 'set-respuesta',
        text: 'SELECT id_pregunta, votacion FROM votaciones_diputade WHERE id_legislativo=$1 ORDER BY id_pregunta;',
        values: [id]
      };
      const PSQuery = new PreparedStatement(query);

      db.many(PSQuery)
        .then((data: RespuestaDP[]) => {
          res.status(200).json(data);
        })
        .catch(err => {
          hasErrorHandler(isDebugging, `${err}`, res);
        });
    } catch (err) {
      if (isDebugging) {
        console.log(err);
      }
      next(err);
    }
  }
);

respuestasRouter.get(
  '/get-respuestas-partidos',
  (req: Request, res: Response<PartidoResponse[] | BadRequestError>, next) => {
    try {
      db.task(t => {
        // execute a chain of queries against the task context, and return the result:
        return t.many('SELECT DISTINCT partido FROM votaciones_partidos ORDER BY partido asc;', [])
          .then((partidos: { partido: string }[]) => {
            const selectQueries = partidos.map(p => t.many(
              'SELECT id_pregunta, partido, votacion FROM votaciones_partidos vp WHERE partido=$1 ORDER BY id_pregunta;',
              [p.partido]
            ));
            return t.batch(selectQueries);
          });
      })
        .then(data => {
          const respuesta: PartidoResponse[] = [];
          data.forEach((d: Partido[], i) => {
            const obj: PartidoResponse = {
              id: `${i + 1}`,
              name: '',
              color: getColoresPartido(''),
              answers: []
            };
            d.forEach((resp: Partido, i) => {
              if (i === 0) {
                obj.name = resp.partido;
                obj.color = getColoresPartido(resp.partido);
              }

              obj.answers.push({
                id_pregunta: resp.id_pregunta,
                votacion: resp.votacion
              });
            });
            respuesta.push(obj);
          });
          res.status(200).json(respuesta);
        })
        .catch(err => {
          hasErrorHandler(isDebugging, `${err}`, res);
        });
    } catch (err) {
      if (isDebugging) {
        console.log(err);
      }
      next(err);
    }
  }
);

export default respuestasRouter;