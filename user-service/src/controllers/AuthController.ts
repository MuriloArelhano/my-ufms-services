import { getRepository } from "typeorm"
import { User } from "../models/UserModel";
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import JWT from "jsonwebtoken";
import fs from "fs";
import path from 'path'
import { UserRequestBody } from "../types";
import { signOptions } from "../utils/jwt";
import { WebRequestError } from "../utils/errors";


class AuthController {
    /**
    * Ess função é responsável por realizar o cadastro de um novo usuário
    * @param req - { email, password }
    * @param res 
    * @returns 
    */
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, phone } = req.body as UserRequestBody
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { email: email } })
            if (user) {
                throw new WebRequestError('Esse usuário já existe!', StatusCodes.CONFLICT)
            }
            const newUser = await userRepository.save(new User(email, password, phone ? phone : null))

            req.body.user = newUser

            next()
        } catch (err) {
            next(err)
        }

    }


    /**
     * Função responsável por fazer o login do usuário e gerar o token JWT que será usado pelo usuário
     * @param req 
     * @param res 
     * @returns Token JWT com algorítimo RS256
     */
    async signin(req: Request, res: Response) {

        var sub = req.body.email
        signOptions.subject = sub

        var payload = {
            userId: req.body.userId
        }

        try {

            // Implementar um CRFS para segurança
            var privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'private.key'));
            const token = JWT.sign(payload, privateKey, signOptions)
            return res.cookie('usrJwtToken', token, {httpOnly: true, expires: new Date(Date.now() + 2 * 3600000) })
                .status(StatusCodes.OK).json({
                    msg: 'Usuário logado com sucesso',
                    token: token
                })

        } catch (err) {
            console.log(err);
        }

    }
}

export default new AuthController()