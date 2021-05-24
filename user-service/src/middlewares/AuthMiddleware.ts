import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

interface UserResquestBody {
    email: string,
    password: string,
    jwtToken?: string
}

export class AuthMiddleware {
    static async validateUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as UserResquestBody
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
                req.body.userId = user.id
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
                msg: "Ocorreu um erro inexperado"
            })
        }

    }
}