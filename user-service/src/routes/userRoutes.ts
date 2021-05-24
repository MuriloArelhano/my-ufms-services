import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { AuthMiddleware } from "../middlewares/AuthMiddleware"

const userRoutes = Router()

// Cadastro
userRoutes.post('/signup', UserController.signup)
// Login
userRoutes.post('/signin', AuthMiddleware.validateUser,  UserController.signin)

export { userRoutes }