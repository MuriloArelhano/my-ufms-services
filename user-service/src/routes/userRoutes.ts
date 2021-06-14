import { Router } from "express"
import AuthController from "../controllers/AuthController"
import ProfileController from "../controllers/ProfileController"
import UserController from "../controllers/UserController"
import AuthMiddleware from "../middlewares/AuthMiddleware"

const userRoutes = Router()

userRoutes.get('/user', AuthMiddleware.validateJWT, UserController.getById)

userRoutes.put('/user', AuthMiddleware.validateJWT, UserController.update)

// Delete User
userRoutes.delete('/user', AuthMiddleware.validateJWT, UserController.delete)

// Cadastro
userRoutes.post('/auth/signup', AuthController.signup, ProfileController.createNewProfile)

// Login
userRoutes.post('/auth/signin', AuthMiddleware.validateUser, AuthController.signin)


export { userRoutes }