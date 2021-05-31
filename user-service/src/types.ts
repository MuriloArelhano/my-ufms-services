import { Gender } from "./models/GenderModel";
import { User } from "./models/UserModel";



export type UserRequestBody = {
    email: string,
    password: string,
    phone: number
}

export type ProfileRequestBody = {
    user: User
    completeName: string
    birthdate: Date
    genderId?: string
}

export type GenderUpdateRequestBody = {
    genderName: string
    genderId: string
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
    userSenderId: string
    userReceiverId: string
    confirmationDate?: Date
    accepted?: boolean
    rejected?: boolean
    created_At?: Date
    updated_At?: Date

}