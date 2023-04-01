import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import PokemonCardList from '../CardList';
import PokemonList from '../List';

import styles from "/src/components/Pokemon/Pokemon.module.css";

function Pokemon() {
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [displayFormat, setDisplayFormat] = useState<string>("Card");

  // Gets the stats for a given pokemon
  const getPokemonStats = async (pokemon: {
    name: string;
    url: string;
  }): Promise<any> => {
    const response = await axios.get(pokemon.url);
    return response.data;
  };

  // Takes the initial pokemon list and gets the stats for each individual pokemon
  const buildPokemonList = useCallback(
    async (
      initialPokemonWithoutStats: Array<{
        name: string;
        url: string;
      }>
    ) => {
      const pokemonList = await Promise.all(
        initialPokemonWithoutStats.map(
          async (pokemon: { name: string; url: string }) => {
            const pokemonWithStats = await getPokemonStats(pokemon);
            return pokemonWithStats;
          }
        )
      );
      return pokemonList;
    },
    []
  );

  // gets all the data needed in order to display information
  const getPokemons = useCallback(async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon"); // gets initial pokemon without stats
    const pokemonList = await buildPokemonList(response.data.results); // runs a request for each pokemon to get their stats
    console.log({ pokemonList });
    setPokemons(pokemonList);
  }, [buildPokemonList]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

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
                if (displayFormat === "Card") {
                  setDisplayFormat("List");
                } else {
                  setDisplayFormat("Card");
                }
              }}
            />
          }
          label={displayFormat}
        />
      </FormGroup>
      {displayFormat === "Card" ? (
        <PokemonCardList pokemons={pokemons} />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </Box>
  );
}

export default Pokemon;
