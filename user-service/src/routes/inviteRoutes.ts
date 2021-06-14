import { Router } from "express"
import InviteController from "../controllers/InviteController"
import AuthMiddleware from "../middlewares/AuthMiddleware"


const inviteRoutes = Router()

inviteRoutes.get('/sent', AuthMiddleware.validateJWT, InviteController.getAllSentUserInvites)

inviteRoutes.get('/received', AuthMiddleware.validateJWT, InviteController.getAllReceivedUserInvites)

inviteRoutes.post('', AuthMiddleware.validateJWT, InviteController.sendNewInvite)

export { inviteRoutes }