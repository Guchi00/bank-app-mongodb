import { Request, Response } from 'express';

import {
    getAccounts,
    getAccount,
    createAccount
} from '../model';
import { BalanceType } from '../types';


export const getAll = async (req: Request, res: Response): Promise<void> => {
    const { page } = req.query;
    const pageNumber = page ? Number(page) : 1;
    await getAccounts(pageNumber, (err, data) => {
        if (err) {
            return res.status(200).json({ msg: 'An error occurred' });
        }
        res.status(200).json(data);
     });
};

export const get = async (req: Request, res: Response): Promise<void> => {
    const { accountNumber } = req.params;
    const account = await getAccount(Number(accountNumber)) as BalanceType;
    res.status(200).json(account);
};

 export const create = async (req: Request, res: Response): Promise<void> => {
    const balance = req.body.balance;
    const newAccount = await createAccount(balance);
    res.status(201).json(newAccount);
};
