import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { v4 } from "uuid";
import { IInvite } from "../types";
import { User } from "./UserModel";

@Entity('invite')
export class InviteModel implements IInvite {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => User)
    @Column({name: 'user_sender_id'})
    userSenderId: string

    @OneToOne(() => User)
    @Column({name: 'user_receiver_id'})
    userReceiverId: string

    @Column({name: 'confirmation_date'})
    confirmationDate?: Date

    @Column()
    accepted?: boolean

    @Column()
    rejected?: boolean

    @CreateDateColumn({ type: "timestamp" })
    created_At?: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_At?: Date


    constructor() {
        if (!this.id) {
            this.id = v4()
        }

    }

}