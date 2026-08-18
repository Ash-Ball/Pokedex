import { createInterface } from "node:readline"
import { commandExit } from "./command_exit.js"
import { get } from "node:http"
import { commandHelp } from "./command_help.js"
import { State } from "./state.js"

export function cleanInput(input: string): string[] {
    const arr = input.split(" ")
    let clean = []
    for (let i in arr){
        if (arr[i] !== ""){
            clean.push(arr[i])
        }
    }
    return clean
}



export async function startREPL(state:State): Promise<void>{

    state.interface.prompt()

    state.interface.on('line',async(input:string) => {
        const clean = cleanInput(input)
        const cmd = clean[0]
        const args = clean.slice(1)
        if (cmd in state.commands) {
            try {
                await state.commands[cmd].callback(state, ...args)
                state.interface.prompt()
                
            } catch (error) {
                console.log(error)
                state.interface.prompt()
            }
            
        } else {
            console.log("Unknown command")
            state.interface.prompt()
        }
});
       

}   