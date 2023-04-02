import BaseAPI from "./BaseApi";
import { PokemonsResponse, PokemonData } from "src/types";

export type ListPokemonsRequestParams = {
}

export type FetchSinglePokemonProps = {
  pokemonName: string
}

class PokemonApi extends BaseAPI {
  public listPokemons = async (queryParams: ListPokemonsRequestParams): Promise<PokemonsResponse> => {
    const response = await this.request({
      method: 'GET',
      path: '/pokemon',
      query: queryParams
    });
    return response.json();
  }

  public fetchPokemonData = async ({ pokemonName }: FetchSinglePokemonProps): Promise<PokemonData | void> => {
    if (!pokemonName) return;
    const response = await this.request({
      method: 'GET',
      path: '/pokemon/' + pokemonName,
    });
    return response.json()
  }
}

export default PokemonApi;