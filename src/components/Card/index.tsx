import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import {
  PokemonData as CardProps,
  PokemonStat,
  PokemonAbility,
  PokemonHeldItem
} from '../../types';

const Card = ({
  name,
  id,
  height,
  stats,
  abilities,
  held_items,
}: CardProps) => {
  const createStatListItem = useCallback(
    (stat: PokemonStat) => (
      <ListItem key={stat.url} sx={{ padding: "2px 4px" }}>
        <ListItemText
          primary={stat.stat.name}
          secondary={stat.base_stat}
          sx={{ margin: 0, fontSize: "4px" }}
        />
      </ListItem>
    ), [stats]
  );

  const createAbilityListItem = useCallback(
    (ability: PokemonAbility) => (
      <ListItem key={ability.slot} sx={{ padding: "2px 4px" }}>
        <ListItemText primary={ability.ability.name} />
      </ListItem>
    ), [abilities]
  );

  const createHeldItemListItem = useCallback(
    (heldItem: PokemonHeldItem) => (
      <ListItem key={heldItem.url} sx={{ padding: "2px 4px" }}>
        <ListItemText primary={heldItem.item.name} />
      </ListItem>
    ), [held_items]
  );

  return (
    <Box
      data-testid="POKE_CARD"
      role="contentinfo"
      sx={{
        flex: "1 0 20%",
        minHeight: "300px",
        maxHeight: "300px",
        margin: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        backgroundColor: "#EEE",
        overflowY: "scroll",
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Height: {height}</Typography>
      <Typography>Stats:</Typography>
      <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
        {stats.map(createStatListItem)}
      </List>
      <Typography>Abilities:</Typography>
      <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
        {abilities.map(createAbilityListItem)}
      </List>
      {!!held_items?.length && (
        <>
          <Typography>Items:</Typography>
          <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
            {held_items.map(createHeldItemListItem)}
          </List>
        </>
      )}
    </Box>
  )
}

export const CardPropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      stat: PropTypes.shape({ name: PropTypes.string }),
      base_stat: PropTypes.string
    })
  ).isRequired,
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      slot: PropTypes.string,
      ability: PropTypes.shape({ name: PropTypes.string }),
    })
  ).isRequired,
  held_items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      item: PropTypes.shape({ name: PropTypes.string })
    })
  )
};

Card.propTypes = CardPropTypes;

export default Card;
