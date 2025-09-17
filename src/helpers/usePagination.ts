export default function obtenerPaginasPaginacion(
  paginaActual: number,
  totalPaginas: number,
  botonesPorPagina: number
)

{
  const paginas: number[] = [];

  if (totalPaginas <= botonesPorPagina) {
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(i);
    }
    return { paginas };
  }

  const mitadConjunto = Math.floor(botonesPorPagina / 2);
  let rangoInicial = Math.max(1, paginaActual - mitadConjunto);
  let rangoFinal = Math.min(totalPaginas, rangoInicial + botonesPorPagina - 1);

  if (rangoFinal - rangoInicial + 1 < botonesPorPagina) {
    rangoInicial = Math.max(1, rangoFinal - botonesPorPagina + 1);
  }

  for (let i = rangoInicial; i <= rangoFinal; i++) {
    paginas.push(i);
  }

  return { paginas };
}
