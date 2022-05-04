import { Router } from 'express';
import {
  create,
  get,
  getAll,
  transfer,
  signUp,
  signIn,
} from '../controllers';
import {
  validateGet,
  validateCreate,
  validateTransfer,
  validationResultHandler,
  checkTransferAccountsExists,
  checkGetAccountExists,
  checkAuth,
} from '../validators';

const router = Router();

router.get(
  '/balance/:accountNumber',
  checkAuth,
  validateGet,
  validationResultHandler,
  checkGetAccountExists,
  get
); // get a specific account

router.get(
  '/balance',
  checkAuth,
  getAll
); // get all accounts

router.post(
  '/create-account',
  checkAuth,
  validateCreate,
  validationResultHandler,
  create
); // create an account

router.post(
  '/transfer',
  checkAuth,
  validateTransfer,
  validationResultHandler,
  checkTransferAccountsExists,
  transfer
); // transfer money

router.post('/register', signUp);
router.post('/login', signIn);

export default router;
