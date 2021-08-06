import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Message from "./Message";
import pokemonsUser from "./PokemonsUser";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => pokemonsUser, pokemonsUser => pokemonsUser.user)
    pokemonsUser: pokemonsUser[];

    @OneToMany(() => Message, message => message.user)
    messages: Message[];
}
