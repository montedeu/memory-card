import { MAX_POKEMON_ID } from "../constants/pokemon";

export function getRandomPokemonIds(count) {
    const ids = new Set();

    while(ids.size < count) {
        const id = 1 + Math.floor(Math.random() * MAX_POKEMON_ID);
        ids.add(id);    
    }

    return Array.from(ids);
}