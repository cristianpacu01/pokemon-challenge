import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@mui/material';

export type PokemonListItemProps = {
  name: string;
  id: string | number;
  height: string | number;
  stats: Array<string>;
  abilities: Array<string>;
  items: Array<string>;
}

const ListItem = ({
  name,
  id,
  height,
  stats,
  abilities,
  items,
}: PokemonListItemProps) => {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">{id}</TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{height}</TableCell>
      <TableCell align="right">{stats.join(", ")}</TableCell>
      <TableCell align="right">{abilities.join(", ")}</TableCell>
      <TableCell align="right">{items.join(", ")}</TableCell>
    </TableRow>
  )
}

export const ListItemProps = {
  name: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  stats: PropTypes.arrayOf(PropTypes.string),
  abilities: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.string),
};

ListItem.propTypes = ListItemProps;

export default ListItem
