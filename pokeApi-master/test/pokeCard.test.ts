import {PokeCardService} from "../src/service/pokeCard.services";



const pokeCardService = PokeCardService.getInstance();

describe("pokeCard", () => {

    it("Should return list of pokemon", async () => {
        const pokeCardList = await pokeCardService.getAll();
        
    });
});