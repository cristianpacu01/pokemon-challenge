
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

import PokemonCardList from 'src/components/Pokemon/PokemonCardList';
import PokemonList from 'src/components/Pokemon/PokemonList';
import { pokemonsQueryService, usePokemonData } from 'src/services';
import { PokemonsResponse } from 'src/types'

import styles from "./Pokemon.module.css";

function PokemonHome({ initialResponse }: {
  initialResponse: PokemonsResponse
}) {
  const [isCardsDisplay, setIsCardsDisplay] = useState<boolean>(true);
  const { pokemons } = usePokemonData({
    pokemonNames: initialResponse.results.map((result) => result.name),
    isReady: !!initialResponse.results.length
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(['pokemons', { page: 1 }], initialResponse);
  }, [initialResponse]);

  return (
    <Box className={styles.container}>
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        Welcome to a very simple pokemon page
      </Typography>
      <Typography>
        We are pulling all data from the{" "}
        <a href="https://pokeapi.co/">PokeApi</a> if you would like to explore
      </Typography>
      <FormGroup>
        <FormLabel>Display Format</FormLabel>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={() => {
                setIsCardsDisplay((oldValue) => !oldValue);
              }}
            />
          }
          label={isCardsDisplay ? 'Card' : 'List'}
        />
      </FormGroup>
      {isCardsDisplay ? (
        <PokemonCardList pokemons={pokemons} />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </Box>
  );
}

PokemonHome.propTypes = {
  initialResponse: PropTypes.shape({
    count: PropTypes.number.isRequired,
    next: PropTypes.string,
    previous: PropTypes.string,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    )
  })
};

export const getServerSideProps = async () => {
  const response = await pokemonsQueryService.fetch();
  return {
    props: {
      initialResponse: response
    }
  };
}

export default PokemonHome;
