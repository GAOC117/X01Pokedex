import clienteAxios from "../config/axios";
import {
  FilterPokemonsTypesSchema,
  PokemonDetailsSchema,
  PokemonsSchema,
  TipoPokemonSchema,
} from "../schemas/PokemonSchema";

async function getPokemonDetails(url: string) {
  try {
    const { data } = await clienteAxios(url);
    //  console.log(data);
    const result = PokemonDetailsSchema.safeParse(data);
    //  console.log(result.data);
    if (result.success) {
      return {
        id: result.data.id.toString(),
        name: result.data.name,
        imageUrl: result.data.sprites.front_default ?? "",
        types: result.data.types.map((t) => t.type.name),
      };
    }

    return {
      id: "",
      name: "Unknown",
      imageUrl: "",
      types: [],
    };
  } catch (error) {
    console.log("Error cargando detalles de Pokémon", error);
    return {
      id: "",
      name: "Unknown",
      imageUrl: "",
      types: [],
    };
  }
}

export async function getPokemons(paginaActual: number, limit: number) {
  const offset = (paginaActual - 1) * limit;

  const url = `pokemon/?offset=${offset}&limit=${limit}`;

  try {
    const { data } = await clienteAxios(url);
    // console.log(data);
    const result = PokemonsSchema.safeParse(data);

    //en result.data esta count y result con name y url

    if (result.success) {
      const pokemonsDetails = await Promise.all(
        result.data.results.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      //   console.log(pokemonsDetails);

      return { ...result.data, results: pokemonsDetails.filter(Boolean) };
    }
    return { count: 0, results: [] };
  } catch (error) {
    console.log(error);
    return { count: 0, results: [] };
  }
}

export async function getFilterPokemons(tipo: string) {
  try {
    // 1️⃣ Traer todos los Pokémon del tipo
    const { data } = await clienteAxios.get(`type/${tipo}`);
    const result = FilterPokemonsTypesSchema.safeParse(data);

    if (!result.success) return { count: 0, results: [] };

    // 2️⃣ Obtener detalles de cada Pokémon
    const allPokemons = await Promise.all(
      result.data.pokemon.map((p) => getPokemonDetails(p.pokemon.url))
    );

    // 3️⃣ Devolver **todos** sin paginar
    return { count: allPokemons.length, results: allPokemons.filter(Boolean) };
  } catch (error) {
    console.error("Error fetching filtered Pokémon:", error);
    return { count: 0, results: [] };
  }
}


export async function getTiposPokemon() {
  try {
    const url = "type?limit=100";
    const { data } = await clienteAxios(url);
    console.log(data);
    const result = TipoPokemonSchema.safeParse(data);
    console.log(result.data?.results);
    if (result.success) {
      return {
        results: [
          ...result.data.results, //el spread operator recuerda que desempaqueta lo de adentro del arreglo y usa solo lo de adentro en este caso lo objetos
          { name: "All" },
        ],
      };
    }
    return { results: [{ name: "All" }] }; // fallback
  } catch (error) {
    console.log(error);
    return { results: [{ name: "All" }] }; // fallback
  }
}
