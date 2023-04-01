import { ApiConfiguration } from '../../types';
import PokemonApi from './PokemonApi';

const configParams: ApiConfiguration = {
  basePath: 'https://pokeapi.co/api/v2'
};

export const pokemonApi = new PokemonApi(configParams);
