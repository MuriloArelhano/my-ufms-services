import { getConnection, getRepository } from "typeorm"
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { Profile } from "../models/ProfileModel";
import { WebRequestError } from "../utils/errors";
import { ProfileRequestBody } from "../types";
import { Gender } from "../models/GenderModel";
import { User } from "../models/UserModel";


class ProfileController {

    async getOnlyProfileById(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId } = req.body as ProfileRequestBody
        try {
            const profileRepo = getRepository(Profile)
            const profile = await profileRepo.findOne({ where: { user: jwtUserId }, relations: ['gender'] })

            if (!profile)
                throw new WebRequestError('Profile do usuário não encontrado', StatusCodes.NOT_FOUND)

            return res.status(StatusCodes.OK).json(profile)

        } catch (err: any) {

            next(err)
        }

    }

    async getCompleteProfileById(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId } = req.body as ProfileRequestBody
        try {
            const profileRepo = getRepository(Profile)
            const completeProfile = await profileRepo.findOne({ where: { user: jwtUserId }, relations: ['user', 'gender'] })
            if (!completeProfile)
                throw new WebRequestError('Profile do usuário não encontrado', StatusCodes.NOT_FOUND)

            delete completeProfile.user.password
            return res.status(StatusCodes.OK).json(completeProfile)

        } catch (err: any) {

            next(err)
        }

    }

    async createNewProfile(req: Request, res: Response, next: NextFunction) {
        const { user, completeName, birthdate, genderId, genderName } = req.body as ProfileRequestBody
        try {
            const profileRepo = getRepository(Profile)
            const profile = await profileRepo.findOne({ where: { user } })
            if (profile) {
                throw new WebRequestError('O usuário já possui um profile ativo', StatusCodes.CONFLICT)
            }
            const genderRepo = getRepository(Gender)
            const gender = await genderRepo.findOne(genderId, {
                where: [{ name: genderName }, { id: genderId }]
            })
            if (gender) {
                var savedProfile = await profileRepo.save(new Profile(user, completeName, birthdate, gender))
            } else {
                var savedProfile = await profileRepo.save(new Profile(user, completeName, birthdate))
            }
            return res.status(StatusCodes.OK).json(savedProfile)

        } catch (err: any) {
            console.log(err)
            next(err)
        }

    }



    async update(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId, completeName, birthdate, genderId, genderName, biography, photo } = req.body as ProfileRequestBody
        try {
            const profileRepo = getRepository(Profile)
            const profile = await profileRepo.findOne({ where: { user: jwtUserId } })

            if (!profile)
                throw new WebRequestError('Profile do usuário não encontrado', StatusCodes.NOT_FOUND)

            if (genderId || genderName) {
                const genderRepo = getRepository(Gender)
                var gender = await genderRepo.findOne(genderId, {
                    where: [{ name: genderName }, { id: genderId }]
                })
                console.log(gender)
                if (!gender)
                    throw new WebRequestError('Gênero selecionado não foi encontrado', StatusCodes.NOT_FOUND)
            }

            delete profile.user
            delete profile.created_At
            delete profile.updated_At

            completeName ?
                profile.completeName != completeName ? profile.completeName = completeName : delete profile.completeName
                : delete profile.completeName

            birthdate ?
                profile.birthdate != birthdate ? profile.birthdate = birthdate : delete profile.birthdate
                : delete profile.birthdate

            gender ?
                profile.gender != gender ? profile.gender = gender : delete profile.gender
                : delete profile.gender

            biography ?
                profile.biography != biography ? profile.biography = biography : delete profile.biography
                : delete profile.biography

            photo ?
                profile.photo != photo ? profile.photo = photo : delete profile.photo
                : delete profile.photo

            const updatedProfile = await profileRepo.update({ id: profile.id }, profile)

            return res.status(StatusCodes.OK).json(updatedProfile)

        } catch (err: any) {
            next(err)
        }

    }


}

export default new ProfileController();
