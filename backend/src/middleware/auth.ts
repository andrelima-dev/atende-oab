import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro_aqui_mude_em_producao';

interface JwtPayload {
  id: number;
  email: string;
  nome: string;
}

// Estender o tipo Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload;
    }
  }
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Pegar o token do header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ 
        error: 'Token não fornecido' 
      });
      return;
    }

    // Verificar o token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ 
          error: 'Token inválido ou expirado' 
        });
        return;
      }

      // Adicionar os dados do usuário ao request
      req.usuario = decoded as JwtPayload;
      next();
    });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({ 
      error: 'Erro ao autenticar' 
    });
  }
};
