import { Cache } from "./pokecache.js";


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  apiCache: Cache

  constructor(cache:Cache) {
    this.apiCache = cache
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`

    if (this.apiCache.has(url)){
        return this.apiCache.get(url)?.val
    } else {
        console.log("Not in cache - getting from server")
        const response = await fetch(url, {
            method: "GET"
        });
        this.apiCache.add(url, response.json())
        return this.apiCache.get(url)?.val
    }
    
  }

  async fetchLocation(locationName: string): Promise<Location | undefined> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName.toLowerCase()}`

    if (this.apiCache.has(url)){
      return this.apiCache.get(url)?.val
    } else {
      console.log("Not in cache - getting from server")
      const response = await fetch(url, {
          method: "GET"
      })
      if (response.status === 200){ 
        this.apiCache.add(url, response.json())
        return await this.apiCache.get(url)?.val
      } else if (response.status === 404) {
        console.log(`Oops! ${locationName.toLowerCase()} doesn't exist!`)
        return undefined
      }else {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon | undefined> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName.toLowerCase()}`;

    if (this.apiCache.has(url)){
      return this.apiCache.get(url)?.val
    } else {
      console.log("Not in cache - getting from server")
      const response = await fetch(url, {
          method: "GET"
      })
      if (response.status === 200){ 
        this.apiCache.add(url, response.json())
        return await this.apiCache.get(url)?.val
      } else if (response.status === 404) {
        console.log(`Oops! ${pokemonName.toLowerCase()} doesn't exist!`)
        return undefined
      }
      else {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
    }
  }

}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: {name: string; url:string}[];

};

type NamedAPIResource = {
  name: string;
  url: string
}
type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: [{
    rate: number;
    version: NamedAPIResource }]
  }
type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource;
  chance: number;
  method: NamedAPIResource
}

type pokemonEncounters = {
  pokemon: NamedAPIResource
  version_details: [{
    version: NamedAPIResource;
    max_chance: number;
    encounter_detials: [Encounter]
  }]
}
type pokemonStat = {
  stat: {
    id: number;
    name: string
  };
  effort: number;
  base_stat: number;
}

type pokemonTypes = {
  slot: number;
  type: NamedAPIResource
}

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: [EncounterMethodRate]
  location: NamedAPIResource;
  names: [{name: string; language: NamedAPIResource}];
  pokemon_encounters: [pokemonEncounters]
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean
  order: number;
  weight: number;
  abilities: [{
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource
  }];
  forms: [NamedAPIResource];
  stats: [pokemonStat]
  types: [pokemonTypes]




}
