import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../model';

export const checkAuth = (req: Request, res: Response, next: NextFunction): void | unknown => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'You need to login to continue' })
  }

  const [, token] = authorization.split(' ');      

  try {
    verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: 'You need to login to continue' });
  }
};
