import { Router } from "express"
import GenderController from "../controllers/GenderController"
import AuthMiddleware from "../middlewares/AuthMiddleware"


const genderRoutes = Router()

genderRoutes.get('', GenderController.getByIdOrName)

genderRoutes.post('', AuthMiddleware.validateJWT, GenderController.createNewGender)

genderRoutes.delete('', AuthMiddleware.validateJWT, GenderController.deleteGender)

genderRoutes.put('', AuthMiddleware.validateJWT, GenderController.updateGender)

genderRoutes.get('/all', GenderController.getAllGenders)

export { genderRoutes }