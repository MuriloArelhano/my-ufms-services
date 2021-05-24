import { getRepository } from "typeorm"
import { User } from "../models/UserModel";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Response, Request } from "express";
import JWT, { sign } from "jsonwebtoken";
import fs from "fs";
import path from 'path'


interface UserResquestBody {
    email: string,
    password: string,
    jwtToken?: string
}

export class UserController {

    /**
     * Ess função é responsavel por realizar o cadastro de um novo usuário
     * @param req - { email, password }
     * @param res 
     * @returns 
     */
    static async signup(req: Request, res: Response) {
        const { email, password } = req.body as UserResquestBody
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email: email } })
        if (user) {
            return res.status(StatusCodes.CONFLICT).json({
                msg: "Esse usuário já existe!"
            })
        }
        const respo = await userRepository.save(new User(email, password))
        return res.send(respo)
    }

    /**
     * Função responsavel por fazer o login do usuário e gerar o token JWT que será usado pelo usário
     * @param req 
     * @param res 
     * @returns Token JWT com algoritimo ES256
     */
    static async signin(req: Request, res: Response) {
        console.log(req.body);

        var i = 'Nextep'
        var a = 'http://nexteps.com.br'
        var s = req.body.email

        var signOptions: JWT.SignOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "2h",
            algorithm: "RS256"
        }

        var payload = {
            userId: req.body.userId
        }

        try {

            var privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'private.key'));
            const token = JWT.sign(payload, privateKey, signOptions)
            return res.status(StatusCodes.OK).json({
                msg: 'Usuário logado com sucesso',
                token: token
            })
        } catch (err) {
            console.log(err);
        }

    }

}
