import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { Profile } from "./ProfileModel";

@Entity('user')
export class User implements IUser {

    @PrimaryGeneratedColumn("uuid", { name: 'user_id' })
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToOne(() => Profile, (profile: Profile) => profile.user)
    profile: Profile

    @Column({ name: "phone_number", unique: true, nullable: true })
    phoneNumber: number

    @CreateDateColumn({ type: "timestamp" })
    created_At?: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_At?: Date

    constructor(email: string, password: string, phone_number: number, id?: string) {
        this.id = id ? id : v4()
        this.email = email
        this.password = password
        this.phoneNumber = phone_number

    }

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }


}