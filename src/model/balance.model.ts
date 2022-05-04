import { Schema, model } from 'mongoose';
import { BalanceType } from '../types';

const accountSchema = new Schema({
  account: Number,
  balance: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Balance = model('Balance', accountSchema);

export const getAccounts = async (page = 1, cb: (...args: unknown[]) => void): Promise<void>  => {
  const limit = 5;
  const skip = limit * (page - 1);
  const total = await Balance.count();          //getting total of balance?
  const lastPage = Math.ceil(total / limit);

  Balance.find({}, { _id: 0, __v: 0 })
    .skip(skip).limit(limit).exec(function(err, docs) {
    if (err) {
        return cb(new Error('Error Occured'), null);
    } else if (!docs) {
        return cb(new Error('Docs Not Found'), null);
    } else {
        const result = {
            previous: page - 1,
            next: page === lastPage ? null : page + 1,
            data: docs
        };
        return cb(null, result);
    }
});
};

export const getAccount = async (accountNumber: number): Promise<BalanceType | undefined> => {
  const account = await Balance.findOne({ account: accountNumber }, { _id: 0, __v: 0 });
  return account;
};

export const accountExists = async (accountNumber: number): Promise<boolean> => {
  const account = await getAccount(accountNumber);
  return Boolean(account);
}

export const checkAccountBalance = async (accountNumber: number): Promise<number> => {
  const account = await getAccount(accountNumber) as BalanceType;
  return account.balance; 
}

export const createAccount = async (openingBalance: number): Promise<BalanceType> => {
  const { account, balance, createdAt } = await Balance.create({
    account: await generateAccountNumber(),
    balance: openingBalance
  });

  const newAccount = {
    account,
    balance,
    createdAt: new Date(createdAt).toISOString() 
  };

  return newAccount;
};

export const updateAccount = async (accountNumber: number, amount: number): Promise<void> => {
  const account = await Balance.findOne({ account: accountNumber });
  
  if (!account) throw new Error(`Account ${accountNumber} does not exist`);
  
  account.balance += amount;   

  const updatedAccount = await account.save();    //instance of mongodb records?

  return updatedAccount;
};

const generateAccountNumber = async (): Promise<number> => {     
  const accounts = await Balance.find({}, { _id: 0, __v: 0 });
  const accountsLength = accounts.length;
  return +`${1000000000}${accountsLength + 1}`;
};
