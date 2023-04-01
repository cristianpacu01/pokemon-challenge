import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useCallback } from 'react';

import PokemonCard, { CardPropTypes } from '../Card';
import { PokemonData } from '../../types'

const CardList = ({ pokemons }: {
  pokemons?: Array<PokemonData>
}) => {
  const renderPokemonCard = useCallback((pokemonData: PokemonData) =>
    <PokemonCard {...pokemonData} />, [pokemons])

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
      { !!pokemons?.length && pokemons.map(renderPokemonCard) }
    </Box>
  )
}

CardList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape(CardPropTypes)
  )
};

export default CardList