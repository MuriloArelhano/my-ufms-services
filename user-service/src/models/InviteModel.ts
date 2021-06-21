import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinTable, Index } from "typeorm";
import { v4 } from "uuid";
import { IInvite } from "../types";
import { User } from "./UserModel";

@Entity('invite')
export class Invite extends BaseEntity implements IInvite {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true })
    userSenderId: string

    @ManyToOne(() => User, (user: User) => user.inviteSender, { onDelete: 'CASCADE' })
    @Index()
    @JoinTable()
    userSender: User

    @Column({ nullable: true })
    userReceiverId: string

    @ManyToOne(() => User, (user: User) => user.inviteReceiver, { onDelete: 'CASCADE' })
    @Index()
    @JoinTable()
    userReceiver: User

    @Column({ name: 'confirmation_date', nullable: true, default: null })
    confirmationDate?: Date

    @Column({ type: "boolean", default: false })
    accepted?: boolean

    @Column({ default: false })
    rejected?: boolean

    @CreateDateColumn({ type: "timestamp" })
    created_At?: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_At?: Date

    constructor(userSender: User, userReceiver: User, confirmationDate?: Date, accepted?: boolean, rejected?: boolean) {
        super()
        if (!this.id) { this.id = v4() }

        this.userSender = userSender
        this.userReceiver = userReceiver
        this.accepted = accepted
        this.rejected = rejected

    }

}