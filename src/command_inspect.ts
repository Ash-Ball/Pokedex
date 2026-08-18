import { State } from "./state.js";

export async function commandInspect(state: State, pokemon: string): Promise<void> {
    if ( pokemon in state.pokedex.collection) {
        const obj = state.pokedex.collection[pokemon]
        console.log(`Name: ${obj.name}`)
        console.log(`Height: ${obj.height}`)
        console.log(`Weight: ${obj.weight}`)
        console.log("Stats:")
        for (let i = 0; i < obj.stats.length; i++) {
            console.log(`  -${obj.stats[i].stat.name}: ${obj.stats[i].base_stat}`)
        }
        console.log("Types:")
        for (let i = 0; i < obj.types.length; i++) {
            console.log(`  -${obj.types[i].type.name}`)
        }
    } else {
        console.log(`You haven't caught ${pokemon} yet.`)
    }
}