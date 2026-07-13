import { Request, Response } from 'express';
import md5 from 'md5';
import User from '../../../models/user.model';
import * as generate from '../../../helper/generate';

//[POST] /api/v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {
    req.body.password = md5(req.body.password)

    const email: string = req.body.email.toString();
    req.body.tokenUser = generate.generateRandomString(32);
    const userExist = await User.findOne({ 
        email: email 
    });
    if (userExist) {
        res.status(400).json({ message: 'Email already exists' });
        return;
    }

    const user = new User( req.body )
    await user.save();

    res.status(201).json({ 
        message: 'User created successfully',
        tokenUser: user.tokenUser
    });
}
