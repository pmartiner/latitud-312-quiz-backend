// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';
import { body } from 'express-validator';

// Types
import { SetPreguntaRequest } from 'routes/respuestas-quiz/types/respuestas-quiz.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// Handlers
import { hasErrorHandler } from '../../common/const';

// .env
dotenv.config();

const respuestasRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

respuestasRouter.post(
  '/set-respuestas',
  body('email').isEmail().normalizeEmail(),
  (req: Request, res: Response<Record<string, never> | BadRequestError>, next) => {
    try {
      const request: SetPreguntaRequest[] = req.body;
      
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
      next(err);
    }
  }
);

export default respuestasRouter;

