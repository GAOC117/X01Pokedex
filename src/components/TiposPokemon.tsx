import { usePokedexStore } from "../store";
import { tipoColors } from "../helpers/tipoColors";
import { DotLoader } from "react-spinners";
import type { tipoColorsType } from "../types";

export default function TiposPokemon() {
  const { tiposPokemon, filtrarPokemons, setPaginaActual } = usePokedexStore();

const handleClickTipo = (tipo: string) => {
  setPaginaActual(1); // reinicia la página **fuera de filtrarPokemons**
  filtrarPokemons(tipo);
};

  if (!tiposPokemon) return <DotLoader color="rgb(176,176,176)" />;

  return (

   
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-full px-10 mb-30 md:mb-10">
      {tiposPokemon.results?.map((tipo) => (
        <button
          onClick={() => handleClickTipo(tipo.name)}
          key={tipo.name}
          className="flex items-center rounded-2xl text-white cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(105deg, ${
              tipoColors[tipo.name as keyof tipoColorsType]
            } 30px, #B3B3B3 31px, #000)`,
          }}
        >
          <img
            src={`/assets/icons/${tipo.name}.png`}
            alt={tipo.name}
            className="w-5 h-5 ml-1"
          />
          <span className="px-3 m-auto capitalize">{tipo.name}</span>
        </button>
      ))}
    </div>
  );
}
