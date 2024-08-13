import jwt from 'jsonwebtoken'
import { ResponseMessage } from '../utils/ResponseMessage.js';

//#region Auth token for user & admin
export const Auth = async(req, res, next) => {
    const token = req.header("auth");
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: ResponseMessage.TOKEN_NOT_AUTHORIZED
        });
    } else {
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decode.user) {
                if (token) {
                    req.user = decode.user.id;
                } else {
                    return res.status(401).json({
                        status: 401,
                        message: ResponseMessage.TOKEN_NOT_AUTHORIZED
                    });
                }
            } else if (decode.admin) {
                req.admin = decode.admin.id;
            }
            next();
        } catch (error) {
            return res.status(401).json({
                status: 401,
                message: ResponseMessage.TOKEN_NOT_VALID_AUTHORIZED,
                data: error.message
            });
        }
    }
};
//#endregion