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
}
