import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getFilterPokemons, getPokemons, getTiposPokemon } from "./services/PokemonServices";
import type { PokemonListType, TipoPokemonType } from "./types";

type PokedexState = {
  // paginas: number[],
  paginaActual: number;
  totalPaginas: number;
  botonesPorPagina: number;
  limit: number;
  image: string;
  name: string;
  url: string;
  id: string;
  loading: boolean;
  tipos: string[];
  tipoFiltrado: string,
  pokemons: PokemonListType;
  tiposPokemon: TipoPokemonType
  setPaginaActual: (page: number) => void;
  mostrarEnPokedex: (
    image: string,
    name: string,
    id: string,
    pokemonTypes: string[]
  ) => void;

  getPagination: (
    actualPage: number,
    totalPages: number,
    buttonsPerPage: number
  ) => number[],
  getPokemonList: (actualPage: number, limit: number) => Promise<void>,

  getListadoTipos: () => void,
  filtrarPokemons: (tipo: string) => Promise<void>,
}

export const usePokedexStore = create<PokedexState>()(
  devtools((set, get) => ({
    limit: 20,
    paginaActual: 1,
    totalPaginas: 0,
    botonesPorPagina: 10,
    pokemons: {
      count: 0,
      results: [],
    },
    loading: false,
    tipoFiltrado: "All",

    getPagination: (paginaActual, totalPaginas, botonesPorPagina) => {
      const paginas: number[] = [];

      if (totalPaginas <= botonesPorPagina) {
        for (let i = 1; i <= totalPaginas; i++) {
          paginas.push(i);
        }

        return paginas;
      }
      const mitadConjunto = Math.floor(botonesPorPagina / 2);
      let rangoInicial = Math.max(1, paginaActual - mitadConjunto);
      let rangoFinal = Math.min(
        totalPaginas,
        rangoInicial + botonesPorPagina - 1
      );

      if (rangoFinal - rangoInicial + 1 < botonesPorPagina) {
        rangoInicial = Math.max(1, rangoFinal - botonesPorPagina + 1);
      }

      for (let i = rangoInicial; i <= rangoFinal; i++) {
        paginas.push(i);
      }

      return paginas;
    },

    getPokemonList: async (paginaActual: number, limit: number) => {
      set({ loading: true });
      const pokemonsList = await getPokemons(paginaActual, limit);
      // console.log(pokemonsList);
      set({
        pokemons: pokemonsList,
        loading: false,
        totalPaginas: Math.ceil(pokemonsList.count / limit),
      });
    },

    setPaginaActual: (page: number) => {
      set({ paginaActual: page });
    },


    mostrarEnPokedex: (
      image: string,
      name: string,
      id: string,
      tipos: string[]
    ) => {
      set({ image, name, id, tipos });
    },

    getListadoTipos: async () => {
      const tiposPokemon = await getTiposPokemon();
      console.log(tiposPokemon);
      set({tiposPokemon})
    },
    
filtrarPokemons: async (tipo: string) => {
  const limit = get().limit;
  const paginaActual = get().paginaActual; // usamos la página actual sin reiniciar
  set({ loading: true, tipoFiltrado: tipo });

  if (tipo === "All") {
    set({ loading: false });
    return;
  }

  const filteredPokemons = await getFilterPokemons(tipo);

  // Paginación local
  const start = (paginaActual - 1) * limit;
  const end = paginaActual * limit;
  const pagedPokemons = filteredPokemons.results.slice(start, end);

  set({
    pokemons: { count: filteredPokemons.count, results: pagedPokemons },
    loading: false,
    totalPaginas: Math.ceil(filteredPokemons.count / limit),
  });
},



  }))
);
