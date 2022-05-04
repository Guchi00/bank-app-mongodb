import { Request, Response } from 'express';

import {
    register,
    login,
} from '../model';


export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await register(email, password);
    if (!token) {
        res.status(400).json({
            message: 'Email belongs to an existing user'
        });
    } else {
        res.status(201).json({
            message: 'User registered successfully',
            token
        });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await login(email, password);

    if (!token) {
        res.status(400).json({
            message: 'invalid login credentials'
        });
    } else {
        res.status(201).json({
            message: 'User logged in successfully',
            token                    //token?
        });
    }
};
