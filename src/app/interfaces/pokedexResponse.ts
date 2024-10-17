export interface PokedexResponse {
  pokemon_entries: PokemonEntry[];
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: ApiDescription;
}

export interface ApiDescription {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  sprites: Sprite;
}

export interface Sprite {
  other: OtherSprite;
}

export interface OtherSprite {
  'official-artwork': {
    front_default: string;
    back_default: string;
  };
}

interface FlavourTextEntry {
  flavor_text: string;
}

export interface PokemonSpecies {
  flavor_text_entries: FlavourTextEntry[]
}
