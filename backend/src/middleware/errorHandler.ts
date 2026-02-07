import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      error: 'Dados inválidos fornecidos',
      message: err.message
    });
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: 'Erro ao processar requisição no banco de dados',
      message: err.message
    });
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
};
