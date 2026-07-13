import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

interface RequestAuth extends Request {
    user?: any;
}
export const auth = async (req: RequestAuth, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                code: 401,
                message: "Vui lòng gửi kèm Token hợp lệ (Định dạng: Bearer <token>)"
            });
            return;
        }
        const token: string = req.headers.authorization.split(" ")[1];

        const user = await User.findOne({
            tokenUser: token,
            deleted: false
        }).select('-password -tokenUser')
        if (!user) {
            res.json({
                code: 400,
                message: "Tài khoản không hợp lệ"
            })
            return;
        }
        req.user = user
        next()
    }
    else {
        res.json({
            code: 400,
            message: "Gửi kèm token"
        })
    }


}