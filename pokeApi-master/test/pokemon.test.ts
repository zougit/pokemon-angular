import { PokemonBuilder } from "../src/models/builder";
import {Pokemon} from "../src/models"


const pokeBuilder = new PokemonBuilder();


describe("isDead", () => {

    it("Should return true when pokemon have 0 hp", async () =>{
        const eevee = await pokeBuilder.create("eevee");
        eevee.hp = 0;
        expect(eevee.isDead()).toBe(true);
    });

    it("Should return true when pokemon have less of 0 hp", async () =>{
        const eevee = await pokeBuilder.create("eevee");
        eevee.hp = -1;
        expect(eevee.isDead()).toBe(true);
    });

    it("Should return false when pokemon have more of 0 hp", async () =>{
        const eevee = await pokeBuilder.create("eevee");
        expect(eevee.isDead()).toBe(false);
    });


});