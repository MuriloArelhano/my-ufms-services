import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { v4 } from "uuid";
import { IGender } from "../types";

@Entity('gender')
export class Gender implements IGender {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    constructor(name: string) {
        if (!this.id) { this.id = v4() }
        this.name = name
    }

}