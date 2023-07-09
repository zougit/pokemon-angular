import PokeAPI from "pokeapi-typescript";
import { Move } from "..";


export class MoveBuilder{
    private static instance: MoveBuilder;

    public static async getInstance(): Promise<MoveBuilder>{
        if(!MoveBuilder.instance){
            MoveBuilder.instance = new MoveBuilder();
            return MoveBuilder.instance;
        }
        return MoveBuilder.instance;
    }

    public async create(name: string): Promise<Move> {
        const move = await PokeAPI.Move.resolve(name);
        return new Move({
            name: move.name,
            accuracy: move.accuracy,
            power: move.power,
            pp: move.pp,
            type: move.type.name
        })


    }
}