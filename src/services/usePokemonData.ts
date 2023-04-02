import { useQueries } from "@tanstack/react-query";

import { pokemonApi } from "./api";
import { PokemonsResponse, PokemonData } from 'src/types';

export const pokemonsQueryService = ({
  fetch: async (): Promise<PokemonsResponse> => {
    try {
      const pokemons = await pokemonApi.listPokemons({});
      return pokemons;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          message: "Something happened while fetching pokemons",
          error
        })
      )
    }
  },
  fetchOne: async (pokemonName: string): Promise<PokemonData | void>=> {
    try {
      const pokemon = await pokemonApi.fetchPokemonData({ pokemonName });
      return pokemon
    } catch (error) {
      throw new Error(
        JSON.stringify({
          message: "Something happened while fetching pokemon " + pokemonName,
          error
        })
      )
    }
  }
})

export const usePokemonData = ({
  pokemonNames,
  isReady,
}: {
  pokemonNames: Array<string>,
  isReady: boolean
}): {
  pokemons: Array<PokemonData>
} => {
  const QUERY_KEY = 'pokemon';
  const queries = useQueries({
    queries: pokemonNames.map(name => ({
      queryKey: [QUERY_KEY, name],
      queryFn: () => pokemonsQueryService.fetchOne(name),
      enabled: isReady
    })),
  })
  const pokemons = queries
    .filter(query => query.isSuccess)
    .map(query => query.data) as Array<PokemonData>
  return {
    pokemons
  }
};
