import { Request, Response } from 'express';

import { checkAccountBalance, sendMoney } from '../model';


export const transfer = async (req: Request, res: Response): Promise<void> => {
     const {
         from,
         to,
         amount,
         description
     } = req.body;

     const senderBalance = await checkAccountBalance(from);

    if (senderBalance < amount) {
        res.status(400).json({
            message: 'Insufficient funds'
        });
    } else {
        const newTransaction = await sendMoney(from, to, amount, description);
     
        res.status(200).json(newTransaction);
    }
};
