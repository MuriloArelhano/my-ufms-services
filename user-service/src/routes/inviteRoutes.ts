import { Router } from "express"
import InviteController from "../controllers/InviteController"
import AuthMiddleware from "../middlewares/AuthMiddleware"


const inviteRoutes = Router()

inviteRoutes.use('', AuthMiddleware.validateJWT)

inviteRoutes.get('/sent', InviteController.getAllSentUserInvites)

inviteRoutes.get('/received', InviteController.getAllReceivedUserInvites)

inviteRoutes.get('/friends/accepted', InviteController.getUserAcceptedFriends)

inviteRoutes.post('', InviteController.sendNewInvite)

export { inviteRoutes }