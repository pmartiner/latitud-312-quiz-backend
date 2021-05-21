// Bibliotecas
import express, { Request, Response } from 'express';
import { PreparedStatement } from 'pg-promise';
import dotenv from 'dotenv';

// Types
import { QuizQuestionsResponse } from 'routes/preguntas/types/preguntas.types';
import { BadRequestError } from 'common/types/error';

// DB
import { db } from '../../db/db-connection';

// Handlers
import { hasErrorHandler } from '../../common/const';

// .env
dotenv.config();

const preguntasRouter = express.Router();
const isDebugging = process.env.DEBUG === 'true';

preguntasRouter.get(
  '/', 
  (req: Request, res: Response<QuizQuestionsResponse | BadRequestError>, next) => {
    try {
      const query = {
        name: 'get-diputade',
        text: 'SELECT * FROM preguntas_quiz;',
        values: []
      };
      const PSQuery = new PreparedStatement(query);
          
      db.any(PSQuery)
        .then(data => {
          res.json({
            quiz: {
              pages: [...data]
            }
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

export default preguntasRouter;

