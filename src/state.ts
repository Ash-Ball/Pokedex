import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args:string[]) => Promise<void>;
}

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand> ;
    api: PokeAPI;
    nextLocationURL: string;
    prevLocationURL: string;
    pokedex: {count: number; collection: Record<string, Pokemon>}

}

export function initState(): State {
    const rl: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
    });

    const commands = {
            exit: {
                name: "exit",
                description: "Exit the Pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp
            },
            map: {
                name: "map",
                description: "Displays a list of 20 locations",
                callback: commandMap
            },
            mapb: {
                name: "map back",
                description: "Displays the previous list of 20 locations",
                callback: commandMapB
            },
            explore: {
                name: "explore",
                description: "Displays the Pokemon that are in a given area",
                callback: commandExplore
            },
            catch: {
                name: "catch",
                description: "Attempt to catch a pokemon",
                callback: commandCatch
            },
            inspect: {
                name: "inspect",
                description: "inspect a pokemon's stats",
                callback: commandInspect
            },
            pokedex: {
                name: "pokedex",
                description: "list all pokemon in your collection",
                callback: commandPokedex
            }
        };

    
    const apiCache = new Cache(50000)
    const api = new PokeAPI(apiCache)


    return {interface: rl, commands: commands, api: api, nextLocationURL: "", prevLocationURL: "", pokedex:{count: 0, collection: {}}, } 


}