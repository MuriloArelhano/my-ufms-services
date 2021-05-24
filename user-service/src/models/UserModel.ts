import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

interface IUser{
    id: string
    email: string
    password: string
    phone_number: number
    created_At?: Date
    updated_At?: Date
}

@Entity({ name: "users" })
class User implements IUser {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    password: string
    
    @Column()
    phone_number: number

    @CreateDateColumn({ type: "timestamp" })
    created_At?: Date

    @UpdateDateColumn({ type: "timestamp" })
    updated_At?: Date

    constructor(email: string, password: string, phone_number: number) {
        this.id = v4()
        this.email = email
        this.password = password
        this.phone_number = phone_number
        
    }

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }


}

export { User }