import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { v4 } from "uuid";
import { IProfile } from "../types";
import { Gender } from "./GenderModel";
import { User } from "./UserModel";

@Entity('profile')
export class Profile extends BaseEntity implements IProfile {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => User, (user: User) => user.profile)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @Column()
    photo?: string

    @Column({ name: 'complete_name' })
    completeName: string

    @Column({ type: "date" })
    birthdate: Date

    @OneToOne(() => Gender, { nullable: true })
    @JoinColumn({ name: 'gender_id', referencedColumnName: 'id' })
    gender?: Gender

    @Column()
    biography?: string

    @CreateDateColumn({ type: "timestamp" })
    created_At?: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_At?: Date

    constructor(user: User, complete_name: string, birthdate: Date, gender?: Gender, biography?: string) {
        super()
        if (!this.id) {
            this.id = v4()
        }
        this.user = user
        this.completeName = complete_name
        this.birthdate = birthdate
        this.gender = gender
        this.biography = biography

    }

}