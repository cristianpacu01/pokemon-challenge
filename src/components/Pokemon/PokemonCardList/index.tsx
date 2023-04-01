import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useCallback } from 'react';

import { CardPropTypes, PokemonCard } from '../PokemonCard';
import { PokemonData } from '../../../types'

export const PokemonCardList = ({ pokemons }: {
  pokemons?: Array<PokemonData>
}) => {
  const renderPokemonCard = useCallback((pokemonData: PokemonData) =>
    <PokemonCard {...pokemonData} key={pokemonData.id} />, [pokemons])

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
      { !!pokemons?.length && pokemons.map(renderPokemonCard) }
    </Box>
  )
}

PokemonCardList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape(CardPropTypes)
  )
};

export default PokemonCardList;
