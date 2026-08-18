import { State } from "./state.js";

export async function commandPokedex(state:State) {
    console.log("Your Pokedex:")
    for (let pokemon in state.pokedex.collection){
        console.log(` - ${pokemon}`)
    }
    
}