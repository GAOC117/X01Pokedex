import { z } from "zod";
import type { FilterPokemonsTypesSchema, PokemonDetailsSchema, PokemonsSchema, TipoPokemonSchema } from "../schemas/PokemonSchema";

export type PokemonsType = z.infer<typeof PokemonsSchema>
export type PokemonDetailsType = z.infer<typeof PokemonDetailsSchema>
export type TipoPokemonType = z.infer<typeof TipoPokemonSchema>
export type FilterPokemonsTypes = z.infer<typeof FilterPokemonsTypesSchema>


export type PokemonListType = {
  results: {
        id: string;
        name: string;
        imageUrl: string;
        types: string[];
    }[];
    count: number;
};




export type tipoColorsType = {
  normal: string,
  fighting: string,
  flying: string,
  poison: string,
  ground: string,
  rock: string,
  bug: string,
  ghost: string,
  steel: string,
  fire: string,
  water: string,
  grass: string,
  electric: string,
  psychic: string,
  ice: string,
  dragon: string,
  dark: string,
  fairy: string,

  // no oficiales
  stellar: string,
  unknown: string,
  shadow: string,
  All: string,
};
