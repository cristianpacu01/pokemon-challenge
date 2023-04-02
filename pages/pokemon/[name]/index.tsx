import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image'

import { usePokemonData } from 'src/services';

const PokemonDetails = () => {
  const { query, back, isReady } = useRouter();
  const pokemonName = useMemo(() => String(query.name), [ query.name ]);
  const { pokemons: [ pokemon ] } = usePokemonData({
    pokemonNames: [pokemonName],
    isReady
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box
        boxShadow="2px 2px 8px 2px #ccc"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin={5}
        maxWidth="40%"
      >
        <Typography sx={{
          fontSize: "20px",
          fontWeight: 400,
          textTransform: 'capitalize',
          padding: "20px"
        }}>
          {pokemon?.name}
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          {pokemon && pokemon.sprites && (
            Object.keys(pokemon.sprites)
              .filter(spriteKey => (pokemon.sprites as any)[spriteKey] && typeof (pokemon.sprites as any)[spriteKey] === 'string')
              .map(spriteKey => (
                <Image unoptimized src={(pokemon.sprites as any)[spriteKey]} alt="pokemon img" width={100} height={100}/>
              ))
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={back}
      >
        Go Back
      </Button>
    </Box>
  )
}

export default PokemonDetails