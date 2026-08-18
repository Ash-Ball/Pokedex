import { State } from "./state.js"

export async function commandHelp(state:State): Promise<void>  {
    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (let command in state.commands) {
        console.log(`${state.commands[command].name}: ${state.commands[command].description}`)
    }

}