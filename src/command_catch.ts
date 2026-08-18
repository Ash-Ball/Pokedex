import { State } from "./state.js";

function randomGenerator(): number {
    if (Math.random() > 0.5) {
        return Math.random() * 500
    } else {
        return (Math.random() * (700 - 1) + 1)
    }
}

export async function commandCatch(state:State, pokemonInput: string): Promise<void> {
    const pokemonData = await state.api.fetchPokemon(pokemonInput.toLowerCase())
    if (pokemonData === undefined) {
        return
    }
    console.log(`Throwing a Pokeball at ${pokemonData.name}...`)
    const random = randomGenerator()
    if (random > pokemonData.base_experience) {
        console.log(`${pokemonData.name} was caught!`)
        state.pokedex.collection[pokemonData.name] = pokemonData
        state.pokedex.count++
    } else {console.log(`${pokemonData.name} escaped!`)}
}
