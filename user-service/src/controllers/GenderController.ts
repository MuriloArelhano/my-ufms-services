import { getRepository } from "typeorm"
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { WebRequestError } from "../utils/errors";
import { Gender } from "../models/GenderModel";
import { GenderUpdateRequestBody } from "../types";


class GenderController {

    async getAllGenders(req: Request, res: Response, next: NextFunction) {
        try {
            let genderRepo = getRepository(Gender)
            const genders = await genderRepo.find()
            return res.status(StatusCodes.OK).json(genders)

        } catch (err: any) {
            next(err)
        }
    }

    async getByIdOrName(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const gender = await genderRepo.findOne(genderId, {
                where: [{ name: genderName }, { id: genderId }]
            })
            if (!gender) {
                throw new WebRequestError('Esse gênero não foi encontrado', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(gender)

        } catch (err: any) {
            next(err)
        }
    }

    async createNewGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne(genderId, {
                where: [{ name: genderName }, { id: genderId }]
            })
            if (isGenderExists) {
                throw new WebRequestError('Esse gênero já foi criado', StatusCodes.CONFLICT)
            }
            let newGender = new Gender(genderName)
            const savedGender = await genderRepo.save(newGender)
            return res.status(StatusCodes.OK).json({ gender: savedGender, msg: 'Gênero salvo com sucesso' })
        } catch (err: any) {
            next(err)
        }

    }

    async updateGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId, newGenderName } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne(genderId, {
                where: [{ name: genderName }, { id: genderId }]
            })
            if (!isGenderExists) {
                throw new WebRequestError('Esse gênero já foi criado!', StatusCodes.CONFLICT)
            }
            const savedGender = await genderRepo.update(isGenderExists.id, { name: newGenderName })
            return res.status(StatusCodes.OK).json({ msg: 'Gênero atualizado com sucesso' })
        } catch (err: any) {
            next(err)
        }
    }

    async deleteGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne(genderId, {
                where: [{ name: genderName }, { id: genderId }]
            })
            if (!isGenderExists) {
                throw new WebRequestError('Esse gênero não existe mais no banco de dados', StatusCodes.CONFLICT)
            }
            const respo = await genderRepo.delete(isGenderExists)
            return res.status(StatusCodes.OK).json({ msg: 'Gênero deletado com sucesso' })
        } catch (err: any) {
            next(err)
        }
    }

}

export default new GenderController();
