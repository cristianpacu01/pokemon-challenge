export type PokemonStat = {
  url: string;
  stat: { name: string };
  base_stat: string | number;
}

export type PokemonAbility = {
  slot: string | number;
  ability: { name: string }
}

export type PokemonHeldItem = {
  url: string;
  item: { name: string };
}

export type PokemonData = {
  name: string;
  id: number | string;
  height: number | string;
  stats: Array<PokemonStat>;
  abilities: Array<PokemonAbility>;
  held_items?: Array<PokemonHeldItem>;
  sprites: {
    front_default?: string;
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
  }
}

export type PokemonsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>
}
