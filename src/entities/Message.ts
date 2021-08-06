import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("messages")
export default class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @ManyToOne(type => User, user => user.messages)
    user: User;
}
