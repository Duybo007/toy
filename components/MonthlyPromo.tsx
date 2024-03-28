import { monthlyPromo } from "@/constants";
import ImagesDisplay from "./ImagesDisplay";

function MonthlyPromo() {
  return (
    <section className="w-screen overflow-hidden">
      <div className="max-w-[1420px] h-full flex flex-col lg:flex-row px-6 2xl:px-0 py-28">
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="text-red text-6xl font-bold uppercase leading-[50px]">
            monthly promo
          </div>
          <ImagesDisplay images={monthlyPromo}/>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center pl-0 lg:pl-28 text-white uppercase mt-7 lg:mt-0">
          <div className="font-bold text-5xl lg:text-7xl">
            Uchiha Itachi
          </div>
          <div className="font-bold text-4xl pt-5">
            Three Artisan Studio
          </div>
          <div className="pt-8 text-xl lg:text-3xl leading-10">
          Embodying the essence of Itachi&apos;s enigmatic persona, this meticulously crafted collectible captures the iconic presence of the beloved Naruto character. A must-have for fans and collectors alike.
          </div>
          <div className="pt-16 flex items-center justify-between">
            <div className="text-4xl lg:text-5xl xl:text-6xl font-bold underline underline-offset-2">$ 123.45</div>
            <div className="bg-red px-6 py-4 text-xl  xl:text-3xl hover:bg-blue">pre order now</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonthlyPromo;


