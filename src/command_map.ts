import { State } from "./state.js";

export async function commandMap(state:State): Promise<void>  {
    
    const locations = await state.api.fetchLocations(state.nextLocationURL !== "" ? state.nextLocationURL : "");
    for (let i = 0; i < locations.results.length; i++){
        console.log(locations.results[i].name)
    }
    state.nextLocationURL = locations.next
    state.prevLocationURL = locations.previous ? locations.previous : ""
}

export async function commandMapB(state:State): Promise<void> {
    if (state.prevLocationURL === "") {
        console.log("you're on the first page")
    } else {
        const locations = await state.api.fetchLocations(state.prevLocationURL);
        for (let i = 0; i < locations.results.length; i++){
            console.log(locations.results[i].name)
        }
        state.nextLocationURL = locations.next
        state.prevLocationURL = locations.previous ? locations.previous : ""
    }
}

