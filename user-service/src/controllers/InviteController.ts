import { getConnection, getRepository } from "typeorm"
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { WebRequestError } from "../utils/errors";
import { Invite } from "../models/InviteModel";
import { User } from "../models/UserModel";
import { InviteRequestBody, UserRequestBody } from "../types";


class InviteController {

    async getAllSentUserInvites(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId } = req.body as InviteRequestBody
        try {
            const inviteRepo = getRepository(Invite)
            const userInvites = await inviteRepo.createQueryBuilder("invite")
                .where({ userSender: jwtUserId })
                .leftJoinAndSelect('invite.userReceiver', 'user')
                .getMany()

            if (userInvites.length <= 0)
                return res.status(StatusCodes.OK).json({ msg: 'Você não enviou nenhuma solicitação de amizade' })

            return res.status(StatusCodes.OK).json(userInvites)

        } catch (err: any) {
            next(err)
        }

    }
    async getAllReceivedUserInvites(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId } = req.body as InviteRequestBody
        try {
            let inviteRepo = getRepository(Invite)
            const userInvites = await inviteRepo.createQueryBuilder("invite")
                .where({ userReceiver: jwtUserId })
                .leftJoinAndSelect('invite.userSender', 'user')
                .getMany()
            if (userInvites.length <= 0)
                return res.status(StatusCodes.OK).json({ msg: 'Você não possui nenhuma solicitação de amizade' })


            return res.status(StatusCodes.OK).json(userInvites)

        } catch (err: any) {
            next(err)
        }
    }

    async getUserAcceptedFriends(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId } = req.body as UserRequestBody
        try {
            let inviteRepo = getRepository(Invite)
            const invites = await inviteRepo.createQueryBuilder("invite")
                .where("(accepted = true AND (invite.userSender = :jwtUserId OR invite.userReceiver = :jwtUserId)) ", { jwtUserId })
                .getManyAndCount()

            const friendIds = invites[0].map(el => {
                if (el.userReceiverId == jwtUserId) {
                    return el.userSenderId
                } else {
                    return el.userReceiverId
                }
            })

            console.log(friendIds)

            return res.status(StatusCodes.OK).json({ msg: 'Buscando' })

        } catch (err: any) {
            next(err)
        }

    }

    async sendNewInvite(req: Request, res: Response, next: NextFunction) {
        const { jwtUserId, userReceiverId } = req.body as InviteRequestBody
        try {
            const userRepo = getRepository(User)
            const inviteRepo = getRepository(Invite)
            const userSender = await userRepo.findOne(jwtUserId)
            const userReceiver = await userRepo.findOne(userReceiverId)

            if (!userSender || !userReceiver)
                throw new WebRequestError('Algum dos usuários não foram encontrados', StatusCodes.NOT_FOUND)

            if (!userSender || !userReceiver)
                throw new WebRequestError('Algum dos usuários não foram encontrados', StatusCodes.NOT_FOUND)

            const userInvites = await inviteRepo.createQueryBuilder("invite")
                .where("invite.userSender = :jwtUserId  ", { jwtUserId })
                .getManyAndCount()


            if (userInvites[1] > 0)
                throw new WebRequestError('Você já enviou uma solicitação para esse usuário', StatusCodes.CONFLICT)

            const newInvite = new Invite(userSender, userReceiver)
            const resp = await inviteRepo.save(newInvite)
            return res.status(StatusCodes.OK).json({ msg: 'Pedido de amizade enviado com sucesso' })

        } catch (err: any) {
            next(err)

        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { inviteId, jwtUserId, userSenderId } = req.body as InviteRequestBody
        try {
            if (userSenderId != jwtUserId)
                throw new WebRequestError('Você não tem autorização para deletar esse convite', StatusCodes.NOT_FOUND)

            let inviteRepo = getRepository(Invite)
            const invite = await inviteRepo.findOne({ id: inviteId }, { where: { id: userSenderId } })
            if (!invite)
                throw new WebRequestError('Sua solicitação não encontrada', StatusCodes.NOT_FOUND)

            const resp = await inviteRepo.delete(invite)
            return res.status(StatusCodes.OK).json({ msg: 'Pedido de amizade deletado com sucesso' })

        } catch (err: any) {
            next(err)

        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { inviteId, jwtUserId, userReceiverId, accepted, rejected } = req.body as InviteRequestBody

        try {
            if (userReceiverId != jwtUserId)
                throw new WebRequestError('Você não tem autorização para aceitar esse convite', StatusCodes.NOT_FOUND)

            let inviteRepo = getRepository(Invite)
            const invite = await inviteRepo.findOne(inviteId)
            if (userReceiverId.length <= 1)
                throw new WebRequestError('Algum dos usuários não foram encontrados', StatusCodes.NOT_FOUND)

            let updatedInvite: Partial<Invite> = {
                id: invite.id,
                accepted: invite.accepted != accepted ? accepted : invite.accepted,
                rejected: invite.rejected != rejected ? rejected : invite.rejected
            }
            updatedInvite.accepted == true ? updatedInvite.confirmationDate = new Date(Date.now()) : null

            const resp = await inviteRepo.update(invite, {})
            return res.status(StatusCodes.OK).json({ msg: 'Pedido de amizade enviado com sucesso' })

        } catch (err: any) {
            next(err)

        }
    }

}

export default new InviteController()