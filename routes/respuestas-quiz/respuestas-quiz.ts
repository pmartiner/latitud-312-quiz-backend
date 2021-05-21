// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';
import { body } from 'express-validator';

// Types
import { SetPreguntaRequest, SetPreguntaResponse } from 'routes/respuestas-quiz/types/respuestas-quiz.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// .env
dotenv.config();

const respuestasRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

respuestasRouter.post(
  '/set-respuesta',
  body('email').isEmail().normalizeEmail(),
  (req: Request, res: Response<SetPreguntaResponse | BadRequestError>, next) => {
    try {
      const request: SetPreguntaRequest = req.body;
      const query = {
        name: 'set-respuesta',
        text: 'INSERT INTO respuestas_usuarie_quiz(id_pregunta, respuesta, distrito_usuarie) VALUES($1, $2, $3);',
        values: [request.id_pregunta, request.respuesta, request.distrito_usuarie]
      };
      const PSQuery = new PreparedStatement(query);
          
      db.any(PSQuery)
        .then(data => {
          console.log(data);
          res.status(200).json({
            data: true
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

export default respuestasRouter;

