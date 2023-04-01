import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useCallback } from 'react';

import PokemonCard, { CardProps as PokemonCardData, CardPropTypes } from '../Card';

const CardList = ({ pokemons }: {
  pokemons?: Array<PokemonCardData>
}) => {
  const renderPokemonCard = useCallback((pokemonData: PokemonCardData) =>
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