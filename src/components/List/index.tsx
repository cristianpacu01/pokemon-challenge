import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PokemonListItem, {
  PokemonListItemProps,
} from '../ListItem';
import { CardPropTypes as PokemonDataPropTypes } from '../Card';
import { PokemonData } from '../../types';

const PokemonList = ({ pokemons }: {
  pokemons?: Array<PokemonData>
}) => {
  const [tableRows, setTableRows] = useState<Array<PokemonListItemProps>>([]);

  const renderPokemonListItem = useCallback(
    (pokemonListData: PokemonListItemProps) => (
      <PokemonListItem {...pokemonListData} key={pokemonListData.id} />
    ), [pokemons]
  );

  const getDataTableRows = useCallback(() => (
    pokemons?.map(({
      name,
      id,
      height,
      stats,
      abilities,
      held_items,
    }) => ({
      name,
      id,
      height,
      stats: stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`),
      abilities: abilities.map(ability => ability.ability.name),
      items: held_items?.map(item => item.item.name) || []
    })) || []
  ), [pokemons]);

  useEffect(() => {
    setTableRows(getDataTableRows());
  }, [getDataTableRows])

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#EEE" }}>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">height</TableCell>
            <TableCell align="right">stats</TableCell>
            <TableCell align="right">abilities</TableCell>
            <TableCell align="right">items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map(renderPokemonListItem)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape(PokemonDataPropTypes)
  )
};

export default PokemonList;
