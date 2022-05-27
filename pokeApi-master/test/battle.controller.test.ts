import PokeAPI from "pokeapi-typescript";
import { BattleController} from "../src/service";
import { Pokemon } from "../src/models";
import {PokemonBuilder, MoveBuilder} from "../src/models/builder"


describe('whoIsMoreSpeed', () => {
    let random;

    it("Should return eevee when eevee attack bulbasaur", async () => {
        const pokeBuilder = await PokemonBuilder.getInstance();
        const pokemon = [
            await pokeBuilder.create("eevee"),
            await pokeBuilder.create("bulbasaur"),
        ];

        const battleController = new BattleController(pokemon);

        expect(battleController.whoIsMoreSpeed()).toBe(pokemon[0]);
    });

    it("Should return pokemon[0]", async () => {
        random = () => 0;
        const pokeBuilder = await PokemonBuilder.getInstance();
        const pokemon = [
            await pokeBuilder.create("eevee"),
            await pokeBuilder.create("eevee"),
        ];
        const battleController = new BattleController(pokemon);

        expect(battleController.whoIsMoreSpeed(random)).toBe(pokemon[0]);
    });

    it("Should return pokemon[1]", async () => {
        random = () => 1;
        const pokeBuilder = await PokemonBuilder.getInstance();
        const pokemon = [
            await pokeBuilder.create("eevee"),
            await pokeBuilder.create("eevee"),
        ];
        const battleController = new BattleController(pokemon);

        expect(battleController.whoIsMoreSpeed(random)).toBe(pokemon[1]);
    });
});

describe("asyncAttack", () => {

    it("Should return bulbasaur with  hp when eevee use tacker move", async () => {
        jest.runAllTimers();
        const pokeBuilder = await PokemonBuilder.getInstance();
        const moveBuilder = await MoveBuilder.getInstance();
        const pokemon = [
            await pokeBuilder.create("eevee"),
            await pokeBuilder.create("bulbasaur"),
        ];

        const battleController = new BattleController(pokemon);
        await battleController.asyncAttack(pokemon[0], pokemon[1], await moveBuilder.create("tackle"));
        expect(pokemon[1].hp).toBe(35);
    });
});