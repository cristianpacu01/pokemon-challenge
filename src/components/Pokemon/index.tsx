import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "/src/components/Pokemon/Pokemon.module.css";

function Pokemon() {
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [displayFormat, setDisplayFormat] = useState<string>("Card");
  const [tableRows, setTableRows] = useState<Array<any>>([]);

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

  // gets all rows for the data table
  const getDataTableRows = useCallback((): Array<any> => {
    let rows: Array<any> = [];
    pokemons.forEach((pokemon) => {
      const row = {
        name: pokemon.name,
        id: pokemon.id,
        height: pokemon.height,
        stats: pokemon.stats.map((stat: any) => {
          return `${stat.stat.name}: ${stat.base_stat}`;
        }),
        abilities: pokemon.abilities.map((ability: any) => {
          return ability.ability.name;
        }),
        items: pokemon.held_items.map((held_item: any) => {
          return held_item.item.name;
        }),
      };
      rows.push(row);
    });
    return rows;
  }, [pokemons]);

  useEffect(() => {
    setTableRows(getDataTableRows());
  }, [getDataTableRows, pokemons]);

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
        <Box sx={{ display: "flex", flexWrap: "wrap", overflowY: "hidden" }}>
          {pokemons &&
            pokemons.length > 0 &&
            pokemons.map((pokemon) => {
              return (
                <Box
                  data-testid="POKE_CARD"
                  role="contentinfo"
                  key={pokemon.name}
                  sx={{
                    flex: "1 0 20%", // ensures 4 items per row
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
                    {pokemon.name}
                  </Typography>
                  <Typography>ID: {pokemon.id}</Typography>
                  <Typography>Height: {pokemon.height}</Typography>
                  <Typography>Stats:</Typography>
                  <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
                    {pokemon.stats.map((stat: any) => (
                      <ListItem key={stat.url} sx={{ padding: "2px 4px" }}>
                        <ListItemText
                          primary={stat.stat.name}
                          secondary={stat.base_stat}
                          sx={{ margin: 0, fontSize: "4px" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography>Abilities:</Typography>
                  <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
                    {pokemon.abilities.map((ability: any) => (
                      <ListItem key={ability.slot} sx={{ padding: "2px 4px" }}>
                        <ListItemText primary={ability.ability.name} />
                      </ListItem>
                    ))}
                  </List>
                  {pokemon.held_items.length > 0 && (
                    <>
                      <Typography>Items:</Typography>
                      <List sx={{ paddingTop: "2px", paddingBottom: "2px" }}>
                        {pokemon.held_items.map((held_item: any) => (
                          <ListItem
                            key={held_item.url}
                            sx={{ padding: "2px 4px" }}
                          >
                            <ListItemText primary={held_item.item.name} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Box>
              );
            })}
        </Box>
      ) : (
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
              {tableRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.height}</TableCell>
                  <TableCell align="right">{row.stats.join(", ")}</TableCell>
                  <TableCell align="right">
                    {row.abilities.join(", ")}
                  </TableCell>
                  <TableCell align="right">{row.items.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Pokemon;
