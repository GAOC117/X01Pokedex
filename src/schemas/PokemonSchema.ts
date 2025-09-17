import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const PokemonsSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export const PokemonDetailsSchema = z.object({
 
  id: z.number(),
  name: z.string(),
  sprites: z.object({
     front_default: z.string()
  }),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    })
  ),
});


export const TipoPokemonSchema = z.object({
    results: z.array(
        z.object({
            name: z.string()
        })
    )
});



export const FilterPokemonsTypesSchema = z.object({
  pokemon: z.array(
    z.object({
      pokemon: z.object({
        name: z.string(),
        url: z.string(),
      }),
      slot: z.number()
    })
  )
});