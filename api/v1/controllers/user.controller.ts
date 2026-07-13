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

    res.cookie('token', user.tokenUser)
    res.status(201).json({ 
        message: 'User created successfully',
        tokenUser: user.tokenUser
    });
}

//[POST] /api/v1/users/login
export const login = async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = md5(req.body.password);

    const user = await User.findOne({
        email: email,
        deleted: false,
    })

    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    if (password !== user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu!"
        })
        return;
    }

    res.cookie('token', user.tokenUser)

    res.json({
        code: 200,
        token: user.tokenUser,
        message: "Đăng nhập thành công!"
    })
}

//[GET] /api/v1/users/info
export const info = async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies.token;
    const user = await User.findOne({ 
        tokenUser: token, 
        deleted: false 
    }).select("-password -tokenUser");
    if (!user) {
        res.json({
            code: 400,
            message: "Token không hợp lệ!"
        })
        return;
    }
    res.json({
        code: 200,
        info: user
    })
}