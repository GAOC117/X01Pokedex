import { useEffect, useState } from "react";
import { usePokedexStore } from "../store";


type PaginadorProps = {
  totalPaginas: number;
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
  botonesPorPagina: number;
};

export default function Paginator({
  totalPaginas,
  paginaActual,
  setPaginaActual,
  botonesPorPagina,
}: PaginadorProps) {
  const { getPagination } = usePokedexStore();

  const [paginaInput, setPaginaInput] = useState<number | string>(paginaActual);

  useEffect(() => {
    setPaginaInput(paginaActual);
  }, [paginaActual]);

  const paginas = getPagination(paginaActual, totalPaginas, botonesPorPagina);
  return (
    <>
      <nav className="flex flex-col items-center space-y-4w-full p-5 mt-20 sm:mt-15">
        {/* Versión móvil - solo botones anterior/siguiente */}
        <div className="flex justify-between  sm:hidden">
          <button
            disabled={paginaActual === 1}
            className="flex items-center justify-center px-3 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-1 border border-gray-200 mr-1"
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>

          <div className="flex items-center justify-center mx-1">
            <input
              type="number"
              min="1"
              max={totalPaginas}
              value={paginaInput || ""}
              onChange={(e) => {
                const inputVal = e.target.value;
                if (inputVal === "") {
                  setPaginaInput("");
                } else {
                  const num = parseInt(inputVal, 10);
                  if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                    setPaginaInput(num);
                    setPaginaActual(num);
                  }
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setPaginaInput(paginaActual);
                }
              }}
              className="w-16 px-2 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={paginaActual.toString()}
            />
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-sm text-gray-600">{totalPaginas}</span>
          </div>

          <button
            disabled={paginaActual === totalPaginas}
            className="flex items-center justify-center px-3 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-1 border border-gray-200 ml-1"
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Versión desktop - paginación completa */}
        <div className="hidden sm:flex sm:flex-col sm:items-center">
          <div className="flex items-center -space-x-px rounded-lg shadow-sm h-10">
            <button
              disabled={paginaActual === 1}
              className="flex items-center justify-center px-3 h-full rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {paginas.map((pagina) => (
              <button
                key={pagina}
                className={`flex items-center justify-center px-4 h-full border border-gray-300 transition-colors duration-200 ${
                  pagina === paginaActual
                    ? "bg-blue-100 text-blue-700 border-blue-200 font-semibold hover:bg-blue-200"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setPaginaActual(pagina)}
              >
                {pagina}
              </button>
            ))}

            <button
              disabled={paginaActual === totalPaginas}
              className="flex items-center justify-center px-3 h-full rounded-r-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Selector de página para desktop */}
          <div className="mt-3 flex items-center justify-center">
            <span className="text-sm text-gray-600 mr-2">Ir a la página:</span>
            <input
              type="number"
              min="1"
              max={totalPaginas}
              value={paginaInput || ""}
              onChange={(e) => {
                const inputVal = e.target.value;
                if (inputVal === "") {
                  setPaginaInput("");
                } else {
                  const num = parseInt(inputVal, 10);
                  if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                    setPaginaInput(num);
                    setPaginaActual(num);
                  }
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setPaginaInput(paginaActual);
                }
              }}
              className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={paginaActual.toString()}
            />
            <span className="text-sm text-gray-600 ml-2">
              de {totalPaginas}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
