
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import {
  useState,
  lazy,
  Suspense,
  useEffect,
} from "react";
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

import { pokemonsQueryService, usePokemonData } from '../../src/services';
import { PokemonsResponse } from '../../src/types'

import styles from "./Pokemon.module.css";

const PokemonCardList = lazy(() => import('../../src/components/Pokemon/PokemonCardList'));
const PokemonList = lazy(() => import('../../src/components/Pokemon/PokemonList'));

function PokemonHome({ initialResponse }: {
  initialResponse: PokemonsResponse
}) {
  const [isCardsDisplay, setIsCardsDisplay] = useState<boolean>(true);
  const { pokemons } = usePokemonData(initialResponse.results.map((result) => result.name));
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
        <Suspense fallback={null}>
          <PokemonCardList pokemons={pokemons} />
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <PokemonList pokemons={pokemons} />
        </Suspense>
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
