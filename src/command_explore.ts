import { State } from "./state.js"

export async function commandExplore(state: State, locationName: string): Promise<void> {
    const locationData = await state.api.fetchLocation(locationName)
    if (locationData === undefined) {
        return
    }
    console.log("Found Fokemon:")
    for (let i = 0; i < locationData.pokemon_encounters.length; i++)
    console.log(` - ${locationData.pokemon_encounters[i].pokemon.name}`)

    }
