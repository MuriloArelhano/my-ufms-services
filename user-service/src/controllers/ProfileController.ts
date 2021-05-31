import { getRepository } from "typeorm"
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { Profile } from "../models/ProfileModel";
import { WebRequestError } from "../utils/errors";
import { ProfileRequestBody } from "../types";
import { Gender } from "../models/GenderModel";


class ProfileController {

    async createNewProfile(req: Request, res: Response, next: NextFunction) {
        const { user, completeName, birthdate, genderId } = req.body as ProfileRequestBody
        try {
            let profileRepo = getRepository(Profile)
            let genderRepo = getRepository(Gender)
            const isProfileExists = await profileRepo.findOne({
                where: {
                    user_id: user.id
                }
            })
            const gender = await genderRepo.findOne({
                where: {
                    gender_id: genderId
                }
            })
            if (isProfileExists) {
                throw new WebRequestError('Esse profile já foi criado!', StatusCodes.CONFLICT)
            }
            if (gender) {
                var savedProfile = await profileRepo.save(new Profile(user, completeName, birthdate, gender))
            } else {
                var savedProfile = await profileRepo.save(new Profile(user, completeName, birthdate))
            }
            return res.json(savedProfile)
        } catch (err: any) {
            console.log(err)
            next(err)
        }

    }

}

export default new ProfileController();
