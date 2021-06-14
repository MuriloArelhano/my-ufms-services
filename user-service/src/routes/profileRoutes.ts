import { Router } from "express"
import ProfileController from "../controllers/ProfileController"
import AuthMiddleware from "../middlewares/AuthMiddleware"

const profileRoutes = Router()

profileRoutes.get('', AuthMiddleware.validateJWT, ProfileController.getOnlyProfileById)

profileRoutes.get('/complete',AuthMiddleware.validateJWT, ProfileController.getCompleteProfileById)

profileRoutes.put('',AuthMiddleware.validateJWT, ProfileController.update)

export { profileRoutes }