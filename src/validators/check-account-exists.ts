import { NextFunction, Request, Response } from 'express';
import { accountExists } from '../model';

export const checkTransferAccountsExists = (req: Request, res: Response, next: NextFunction): void => {
  const { from, to } = req.body;
  const senderAccountExists = accountExists(from);
  const receiverAccountExists = accountExists(to);

  if (!senderAccountExists) {
    res.status(404).json({ message: 'from account does not exist' });
  } else if (!receiverAccountExists) {
    res.status(404).json({ message: 'to account does not exist' });
  } else {
    next();
  }
};

export const checkGetAccountExists = (req: Request, res: Response, next: NextFunction): void => {
  const { accountNumber } = req.params;
  const accountNumberExists = accountExists(Number(accountNumber));

  if (!accountNumberExists) {
    res.status(404).json({ message: 'accountNumber does not exist' });
  } else {
    next();
  }
};
