import { getConnection, getRepository } from "typeorm"
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { WebRequestError } from "../utils/errors";
import { UserRequestBody } from "../types";
import { User } from "../models/UserModel";
import bcrypt from 'bcrypt'


class UserController  {

    async getById(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId: userId } = req.body as UserRequestBody
        try {
            const userRepo = getRepository(User)
            const user = await userRepo.findOne(userId)

            if (!user)
                throw new WebRequestError('Usuário não encontrado', StatusCodes.BAD_REQUEST)

            delete user.password
            return res.status(StatusCodes.OK).json(user)

        } catch (err: any) {
            next(err)
        }

    }


    async update(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId: userId, phone } = req.body as UserRequestBody

        try {
            const userRepo =  getRepository(User)
            const user = await userRepo.findOne(userId)

            if (!user)
                throw new WebRequestError('Usuário não encontrado', StatusCodes.BAD_REQUEST)

            const newUser = await userRepo.update({ id: user.id }, { phoneNumber: phone })
            return res.status(StatusCodes.OK).json(newUser)

        } catch (err: any) {
            next(err)
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId, password } = req.body as UserRequestBody
        try {
            const userRepo =  getRepository(User)
            const user = await userRepo.findOne(jwtUserId)
            console.log(user);
            
            if (!user)
                throw new WebRequestError('Usuário não encontrado', StatusCodes.BAD_REQUEST)

            if (bcrypt.compareSync(password, user.password))
                await userRepo.delete(user)

            delete req.body.password
            return res.status(StatusCodes.OK).json({ msg: 'Usuário deletado com sucesso' })

        } catch (err: any) {
            next(err)
        }

    }
    

}

export default new UserController();
