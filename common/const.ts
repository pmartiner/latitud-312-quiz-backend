import { Response } from 'express';
import { BadRequestError } from './types/error';

export const hasErrorHandler = (isDebugging: boolean, err: string, res: Response): void => {
  const error: BadRequestError = {
    description: 'Hubo un error al procesar tu información. Por favor revise su información e intente de nuevo.'
  };

  if (isDebugging) {
    error.errorInfo = err;
  }

  res.status(400).json(error);
};

export const hasRepeatedEmailErrorHandler = (isDebugging: boolean, err: string, res: Response): void => {
  const error: BadRequestError = {
    description: 'Hubo un error al procesar tu información. Es posible que este correo ya exista en nuestra base de datos. Por favor revise su información e intente de nuevo.'
  };
  
  if (isDebugging) {
    error.errorInfo = err;
  }
  
  res.status(400).json(error);
};