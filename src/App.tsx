import { useEffect } from "react";
import Pokedex from "./components/Pokedex";
import { usePokedexStore } from "./store";
import PokemonList from "./components/PokemonList";
import { DotLoader } from "react-spinners";
import TiposPokemon from "./components/TiposPokemon";
import Paginator from "./components/Paginator";

function App() {
  const {
    getPokemonList,
    paginaActual,
    limit,
    loading,
    getListadoTipos,
    filtrarPokemons,
    tipoFiltrado,
    totalPaginas,
    setPaginaActual,
    botonesPorPagina
  } = usePokedexStore();

  useEffect(() => {
    if (tipoFiltrado === "All") {
      getPokemonList(paginaActual, limit);
    } else {
      filtrarPokemons(tipoFiltrado); // ya maneja paginaActual internamente
    }
  }, [paginaActual, tipoFiltrado]);
  useEffect(() => {
    getListadoTipos();
  }, []);

  return (
    <>
  
<div className="flex flex-col lg:flex-row items-center justify-center mt-5">
  <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
    <TiposPokemon />

    <div className="h-[400px] md:h-[500px] lg:h-[600px]w-full flex items-center justify-center">
      {loading ? (
        <DotLoader color="rgb(176,176,176)" />
      ) : (
        <PokemonList />
      )}
    </div>

    <Paginator
      totalPaginas={totalPaginas}
      paginaActual={paginaActual}
      setPaginaActual={setPaginaActual}
      botonesPorPagina={botonesPorPagina}
    />
  </div>

  <Pokedex />
</div>


      {/* <div className="flex flex-col">
        
        {loading ? <DotLoader color="rgb(176,176,176)" /> : <PokemonList />}
        <Pokedex />
      </div> */}

      {/* <div className="flex flex-col justify-center items-center container mx-auto h-screen">
        <TiposPokemon />
        <div className="bg-blue-600 flex flex-col lg:flex-row gap-20 md:gap-20 justify-between items-center w-9/12 h-[700px] ">
          <div className="w-[600px] bg-amber-500 flex justify-center">
            {loading ? <DotLoader color="rgb(176,176,176)" /> : <PokemonList />}
          </div>
          <Pokedex />
        </div>
      </div> */}
    </>
  );
}

export default App;
