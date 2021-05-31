import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { UserRequestBody } from "../types";
import { verifyOptions } from "../utils/jwt";
import JWT from "jsonwebtoken";
import path from 'path'
import fs from 'fs'
import { WebRequestError } from "../utils/errors";


class AuthMiddleware {
    async validateUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as UserRequestBody
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email: email } })
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                statusMsg: ReasonPhrases.NOT_FOUND,
                msg: "Email ou senha incorretos, ou talvez precise de cadastrar!"
            })
        }
        try {
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                delete user.password
                delete req.body.password
                req.body.userId = user
                next()
            }
            else {
                return res.status(StatusCodes.NOT_FOUND).json({
                    statusMsg: ReasonPhrases.NOT_FOUND,
                    msg: "Email ou senha incorretos, ou talvez precise se cadastrar!"
                })
            }

        } catch {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                statusMsg: ReasonPhrases.INTERNAL_SERVER_ERROR,
                msg: "Ocorreu um erro inesperado"
            })
        }

    }

    validateJWT(req: Request, res: Response, next: NextFunction) {
        const jwtUserToken = req.body.jwtUserToken || req.get('Authorization') || req.query.jwtUserToken 
        try {
            var publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'public.key'));
            JWT.verify(jwtUserToken, publicKey, verifyOptions, (err, decoded: any) => {
                if (err) {
                    throw new WebRequestError("Token invalido ou expirado", StatusCodes.BAD_REQUEST)
                }
                req.body.userId = decoded.userId
                next()
            })

        } catch (error) {
            next(error)
        }

    }
}

export default new AuthMiddleware()