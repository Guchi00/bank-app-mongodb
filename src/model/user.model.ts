import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = model('User', userSchema);    //

export const register = async (email: string, password: string): Promise<string | null> => {
  try {
    const hashedPassword = hashPassword(password); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await User.create({
      email: email,
      password: hashedPassword
    });

    return generateToken(email);
  } catch (error) {
    return null;
  }
};

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ email });

  if (!user) return null;    
  
  const isValidPassword = verifyPassword(password, user.password);

  if (!isValidPassword) return null;

  return generateToken(email);
};

const hashPassword = (password: string): string => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  const isVerifiedPassword = bcrypt.compareSync(password, hashedPassword);
  return isVerifiedPassword;
};

const generateToken = (payload: string): string => {
  const token = jwt.sign(payload, SECRET_KEY as string);
  return token;
};

export const verifyToken = (token: string): unknown => {
  const payload = jwt.verify(token, SECRET_KEY as string);
  return payload;
};
