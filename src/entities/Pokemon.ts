import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import pokemonsUser from "./PokemonsUser";

@Entity("pokemons")
export default class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @Column()
    image: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    baseExp: number;

    @Column()
    description: string;

    @OneToMany(() => pokemonsUser, pokemonsUser => pokemonsUser.pokemon)
    pokemonsUser: pokemonsUser[];
}
