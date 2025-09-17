import { usePokedexStore } from "../store";
// import Paginator from "./Paginator";

export default function PokemonList() {
  const {
    pokemons,
    // totalPaginas,
    // paginaActual,
    // setPaginaActual,
    // botonesPorPagina,
    mostrarEnPokedex,
    tipoFiltrado,
  } = usePokedexStore();

  return (
    <>
      <div className="w-full 2xl:w-[800px]  h-[400px] md:h-[500px] lg:h-[700px] flex justify-center items-center lg:px-10 lg:mt-10">
        {pokemons.count ? (
          <>
            <div className="grid grid-cols-5 gap-1 lg:gap-x-25 xl:gap-x-10  mx-auto place-items-center py-2 2xl:px-16 xl:px-0">
             {pokemons.results.map((pokemon) => (
              
                <button
                  key={pokemon.id}
                    className="w-full max-w-[120px] aspect-square 
             bg-[rgb(216,233,244)] rounded-xl 
             hover:scale-105 transition-all duration-200 
             flex justify-center items-center pokeshadow"
                  onClick={() =>
                    mostrarEnPokedex(
                      pokemon.imageUrl,
                      pokemon.name,
                      pokemon.id,
                      pokemon.types
                    )
                  }
                >
                  <div className="flex flex-col">
                    <img
                      className={pokemon.id !== "" ? "" : "w-full"}
                      src={
                        pokemon.id !== ""
                          ? pokemon.imageUrl
                          : "assets/icons/unknown.png"
                      }
                      alt={pokemon.name}
                    />
                    {pokemon.id === "" ? <p>Unknown</p> : ""}
                  </div>
                </button>
              
            ))}
          </div>

            {/* <Paginator
            totalPaginas={totalPaginas}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
            botonesPorPagina={botonesPorPagina}
          /> */}
          </>
        ) : (
         <p className=" text-gray-600 text-center p-3">
          La API no tiene resultados para el tipo{" "}
          <span className="capitalize font-bold">{tipoFiltrado} </span>
          seleccionado.
        </p>
        )}
      </div>
{/* 
      {pokemons.count ? (
        <div className="flex flex-col justify-center">
          <div className="bg-red-400 grid grid-cols-5 gap-5">
            {pokemons.results.map((pokemon) => (
              <div key={pokemon.id}>
                <button
                  className="w-15 h-15 md:w-30 md:h-30 bg-[rgb(216,233,244)] rounded-xl hover:scale-105 transition-all duration-200 flex justify-center items-center pokeshadow"
                  onClick={() =>
                    mostrarEnPokedex(
                      pokemon.imageUrl,
                      pokemon.name,
                      pokemon.id,
                      pokemon.types
                    )
                  }
                >
                  <div className="flex flex-col">
                    <img
                      className={pokemon.id !== "" ? "" : "w-8 h-8 mx-auto"}
                      src={
                        pokemon.id !== ""
                          ? pokemon.imageUrl
                          : "assets/icons/unknown.png"
                      }
                      alt={pokemon.name}
                    />
                    {pokemon.id === "" ? <p>Unknown</p> : ""}
                  </div>
                </button>
              </div>
            ))}
          </div>

          <Paginator
            totalPaginas={totalPaginas}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
            botonesPorPagina={botonesPorPagina}
          />
        </div>
      ) : (
        <p className=" text-gray-600 mt-5">
          La API no tiene resultados para el tipo{" "}
          <span className="capitalize font-bold">{tipoFiltrado} </span>
          seleccionado.
        </p>
      )} */}
    </>
  );
}
