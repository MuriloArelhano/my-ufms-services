import { Gender } from "./models/GenderModel";
import { Invite } from "./models/InviteModel";
import { User } from "./models/UserModel";



export type UserRequestBody = {
    email: string,
    password: string,
    phone: number,
    completeName: string
    birthdate: Date
    jwtUserId?: string,
    jwtUserToken?: string
}

export interface InviteRequestBody {
    inviteId: string,
    jwtUserId: string,
    userSenderId: string,
    userReceiverId: string,
    accepted?: boolean,
    rejected?: boolean
}

export type ProfileRequestBody = {
    user: User
    jwtUserId?: string
    completeName: string
    birthdate: Date
    genderId?: string,
    genderName?: string,
    biography?: string
    photo?: string
}

export type GenderUpdateRequestBody = {
    genderName: string
    genderId: string,
    newGenderName?: string
}


export interface IUser {
    id: string
    email: string
    password: string
    phoneNumber: number
    created_At?: Date
    updated_At?: Date
}


export interface IProfile {
    id: string
    user: User
    photo?: string
    completeName: string
    birthdate: Date
    gender?: Gender
    biography?: string
    created_At?: Date
    updated_At?: Date

}

export interface IGender {
    id: string
    name: string
}

export interface IInvite {
    id: string,
    userSender: User
    userReceiver: User
    confirmationDate?: Date
    accepted?: boolean
    rejected?: boolean
    created_At?: Date
    updated_At?: Date

}