import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { PokeCardProps } from "../models";
export class PokeCardService{

    private static instance: PokeCardService;

    public static getInstance(): PokeCardService{
        if(!PokeCardService.instance){
            PokeCardService.instance = new PokeCardService();
            return PokeCardService.instance;
        }
        return PokeCardService.instance;
    }

    public async getAll(): Promise<Array<PokeCardProps>>{
        const pokeList = await PokeAPI.Pokemon.listAll();
        const pokeListMap: Array<PokeCardProps> = pokeList.results.map(x => {
            let info = {
                name: x.name,
                id: Number(x.url.split("/")[6])
            }
            return info;
        });

        return pokeListMap;
    }
}