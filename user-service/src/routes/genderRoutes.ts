import { Router } from "express"
import { StatusCodes } from "http-status-codes"
import GenderController from "../controllers/GenderController"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import { WebRequestError } from "../utils/errors"

const genderRoutes = Router()


genderRoutes.post('/create', AuthMiddleware.validateJWT, GenderController.createNewGender)

genderRoutes.delete('/delete', AuthMiddleware.validateJWT, GenderController.deleteGender)

genderRoutes.patch('/update', AuthMiddleware.validateJWT, GenderController.updateGender)

genderRoutes.get('/get/all', AuthMiddleware.validateJWT, GenderController.getAllGenders)

genderRoutes.get('/get', ((req, res, next) => {
    next(new WebRequestError('Rota não implementada', StatusCodes.NOT_FOUND))
}))


export { genderRoutes }