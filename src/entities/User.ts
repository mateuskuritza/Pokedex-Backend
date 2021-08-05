import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
}
