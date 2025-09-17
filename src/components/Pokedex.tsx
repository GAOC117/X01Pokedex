import { tipoColors } from "../helpers/tipoColors";
import { usePokedexStore } from "../store";
import type { tipoColorsType } from "../types";

export default function Pokedex() {
  const { image, name, tipos, id } = usePokedexStore();

  return (
    <div className="w-[500px] flex justify-center lg:mr-20 lg:ml-10">
      <div className="shadow-pokedex-body bg-pokedex w-[300px] pb-5 rounded-2xl relative border border-[5px] border-black overflow-hidden">
        <header className="pt-2 px-2 flex gap-4">
          <div className="flex justify-center items-center rounded-4xl border border-black border-2 bg-white w-15 h-15">
            <div className={`rounded-4xl border border-black border-2 ${id && id !== "" ? 'animate-IAPokedex': 'bg-[rgb(1,158,215)]' } w-[50px] h-[50px] m-auto`}></div>
          </div>
          <div className="linea-bisel"></div>
          <div className="flex gap-[8px]">
            <div className="rounded-4xl border border-black border-[2px] bg-red-700 w-[16px] h-[16px]"></div>
            <div className="rounded-4xl border border-black border-[2px] bg-yellow-300 w-[16px] h-[16px]"></div>
            <div className="rounded-4xl border border-black border-[2px] bg-green-600 w-[16px] h-[16px]"></div>
          </div>
        </header>
        <main>
          <div className="shadow-white-screen corner-shape w-[250px] h-[270px]  mx-auto mt-5 bg-gray-200 rounded-xl flex flex-col gap-1 justify-center items-center border border-3">
            <div className="flex gap-2 pt-1">
              <div className="rounded-4xl bg-red-700 w-[6px] h-[6px]"></div>
              <div className="rounded-4xl bg-red-700 w-[6px] h-[6px]"></div>
            </div>
            <div className="w-[220px] h-[270px] bg-[rgb(216,233,244)] overflow-hidden rounded border border-gray-500 border-3 flex flex-col justify-center items-center">
              <img
                className="w-[130px] h-[130px] object-cover"
                src={
                  id && id !== ""
                    ? image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                }
                alt=""
              />
              <div className="text-center text-sm flex flex-col gap-1">
                <p className="capitalize font-bold">{name}</p>
                <div className="flex justify-center gap-2">
                  {tipos?.map((tipo) => (
                    <div
                      key={tipo}
                      className="w-7 h-7 flex items-center justify-center rounded-full boder border-1"
                      style={{
                        backgroundColor:
                          tipoColors[tipo as keyof tipoColorsType],
                      }}
                    >
                      <img
                        src={`/assets/icons/${tipo}.png`}
                        alt={tipo}
                        className="w-5 h-5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full pr-5 my-2 pl-[30px]">
              <div className="rounded-4xl border border-2 bg-[rgb(224,4,4)] w-[25px] h-[25px]"></div>
              <div className="flex flex-col gap-1">
                <div className="rounded-4xl w-[50px] h-[3px] bg-black border border-[1.5px]"></div>
                <div className="rounded-4xl w-[50px] h-[3px] bg-black border border-[1.5px]"></div>
                <div className="rounded-4xl w-[50px] h-[3px] bg-black border border-[1.5px]"></div>
                <div className="rounded-4xl w-[50px] h-[3px] bg-black border border-[1.5px]"></div>
              </div>
            </div>
          </div>
        </main>
        <footer className="pr-[25px] pl-[5px]">
          <div className="flex justify-center">
            {" "}
            {/* revisar quitar */}
            <div className="flex flex-col gap-2">
              <div className="mt-2 px-[18px] flex items-center gap-2">
                <div className="shadow-button w-[35px] h-[35px] bg-gray-600 border border-gray-800 border-3 rounded-4xl"></div>
                <div className="flex gap-3">
                  <div className="w-[55px] h-[10px] rounded-4xl border border-black border-2 bg-[rgb(224,4,4)]"></div>
                  <div className="w-[55px] h-[10px] rounded-4xl border border-black border-2 bg-teal-600"></div>
                </div>
              </div>
              <div className="flex justify-end px-[18px]">
                <div className="w-[120px] h-[60px] bg-[rgb(57,181,73)] border border-2 rounded-lg scrollable ">
                  <div className="text-start text-[12px] overflow-hidden pl-1">
                    {id ? (
                      <div>
                        <p className="capitalize">
                          <span className="font-bold">Name: </span>
                          {name}
                        </p>
                        <p>
                          <span className="font-bold">#: </span>
                          {id}
                        </p>
                        <p className="capitalize">
                          <span className="font-bold">
                            {tipos?.length === 1 ? "Type:" : "Types:"}{" "}
                          </span>{" "}
                          {tipos?.join(", ")}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="shadow-button d-pad bg-gray-600 w-[65px] h-[65px] border border-2 border-gray-900 flex justify-center items-center">
                <div className="w-[15px] h-[15px] bg-gray-600 border border-2 rounded-4xl"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
