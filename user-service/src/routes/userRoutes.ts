import { Router } from "express"
import AuthController from "../controllers/AuthController"
import ProfileController from "../controllers/ProfileController"
import AuthMiddleware from "../middlewares/AuthMiddleware"

const userRoutes = Router()

// Cadastro
userRoutes.post('/auth/signup', AuthController.signup, ProfileController.createNewProfile)

// Login
userRoutes.post('/auth/signin', AuthMiddleware.validateUser, AuthController.signin)

// Get User Infos
userRoutes.get('/user/get/infos', AuthMiddleware.validateJWT)


export { userRoutes }