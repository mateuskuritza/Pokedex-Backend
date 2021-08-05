import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from "./Pokemon";
import User from "./User";

@Entity("pokemonsUser")
export default class pokemonsUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(type => Pokemon, pokemon => pokemon.pokemonsUser)
    pokemon: Pokemon;

    @ManyToOne(type => User, user => user.pokemonsUser)
    user: User;
}
