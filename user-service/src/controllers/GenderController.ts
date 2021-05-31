import { getRepository } from "typeorm"
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { WebRequestError } from "../utils/errors";
import { Gender } from "../models/GenderModel";
import { GenderUpdateRequestBody } from "../types";


class GenderController {

    async createNewGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne({
                where: [
                    { name: genderName },
                    { id: genderId }
                ]
            })
            if (isGenderExists) {
                throw new WebRequestError('Esse genero já foi criado!', StatusCodes.CONFLICT)
            }
            let newGender = new Gender(genderName)
            const savedGender = await genderRepo.save(newGender)
            return res.json(savedGender)
        } catch (err: any) {
            next(err)
        }

    }

    async updateGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne({
                where: [
                    { name: genderName },
                    { id: genderId }
                ]
            })
            if (isGenderExists) {
                throw new WebRequestError('Esse genero já foi criado!', StatusCodes.CONFLICT)
            }
            const savedGender = await genderRepo.update(isGenderExists.id, { name: genderName })

        } catch (err: any) {
            next(err)
        }
    }

    async deleteGender(req: Request, res: Response, next: NextFunction) {
        const { genderName, genderId } = req.body as GenderUpdateRequestBody
        try {
            let genderRepo = getRepository(Gender)
            const isGenderExists = await genderRepo.findOne({
                where: [
                    { name: genderName },
                    { id: genderId }
                ]
            })
            if (!isGenderExists) {
                throw new WebRequestError('Esse não existe mais no banco de dados.', StatusCodes.CONFLICT)
            }
            const respo = await genderRepo.delete(isGenderExists)

        } catch (err: any) {
            next(err)
        }
    }

    async getAllGenders(req: Request, res: Response, next: NextFunction) {
        try {
            let genderRepo = getRepository(Gender)
            const genders = await genderRepo.find()
            return res.status(StatusCodes.OK).json(genders)

        } catch (err: any) {
            next(err)
        }
    }

}

export default new GenderController();
