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
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { email: email } })

            if (!user) {
                throw new WebRequestError("Email ou senha incorretos, ou talvez precise de cadastrar!", StatusCodes.NOT_FOUND)
            }
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                delete user.password
                delete req.body.password
                req.body.userId = user.id
                next()
            }
            else {
                throw new WebRequestError("Email ou senha incorretos, ou talvez precise se cadastrar!", StatusCodes.NOT_FOUND)
            }

        } catch (error) {
            next(error)
        }

    }

    validateJWT(req: Request, res: Response, next: NextFunction) {

        const usrJwtToken = req.body.usrJwtToken || req.get('Authorization') || req.query.usrJwtToken || req.cookies.usrJwtToken
        try {
            var publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'public.key'));
            JWT.verify(usrJwtToken, publicKey, verifyOptions, (err, decoded: any) => {
                if (err) {
                    throw new WebRequestError("Token invalido ou expirado", StatusCodes.UNAUTHORIZED)
                }
                req.body.jwtUserId = decoded.userId
                next()
            })

        } catch (error) {
            next(error)
        }

    }
}

export default new AuthMiddleware()