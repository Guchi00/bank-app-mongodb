import { Schema, model } from 'mongoose';
import { updateAccount } from './balance.model';
import { TransactionType } from '../types';

const transactionSchema = new Schema({
  reference: String,
  senderAccount: Number,
  amount: Number,
  receiverAccount: Number,
  transferDescription: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Transaction = model('Transaction', transactionSchema);

export const sendMoney = async (from: number, to: number, amount: number, description: string): Promise<TransactionType> => {
  const transferDescription = description
    ? description
    : `Transfer from ${from} to ${to}`;

  const data = {
    reference: generateReference(),
    senderAccount: from,
    receiverAccount: to,
    amount,
    transferDescription
  };

  await updateAccount(from, -amount); // debit sender
  await updateAccount(to, amount); // credit receiver

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const { _doc: { _id, __v, ...otherData }} = await Transaction.create(data);  //rest operator. meaning every other thing inside the object

  return otherData;
};

const generateReference = (): string => {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
};
