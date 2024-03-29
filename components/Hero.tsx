import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GiMineTruck } from "react-icons/gi";
import { useCart } from "@/context/StateContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroImage from "./ui/heroImage";
import { heroImage } from "@/constants";

function Hero({ heroImagesArray }: any) {
  const { cart, openCartModal } = useCart();

  //Get total amount from cart
  const getTotalAmount = () => {
    return cart.reduce((total, item: any) => total + item.amount, 0);
  };

  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
      duration: 1,
    });

    gsap.to("#bottom-text", {
      opacity: 1,
      duration: 3,
    });

    gsap.to("#logo", {
      opacity: 1,
      duration: 1.8,
    });

    gsap.to("#img", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.25,
    });

    gsap.to("#sub-title", {
      width: 0,
      duration: 1.5,
      delay: 0.5,
    });
  });

  return (
    <section className="w-screen relative">
      <div className="w-full max-w-[1420px] h-screen px-6 xl:px-0 pt-10">
        <div className="flex flex-col-reverse lg:flex-row w-full lg:h-[15%] ">
          <div className="w-full lg:w-[80%] uppercase ">
            <div className="flex flex-wrap gap-6 text-3xl lg:text-6xl font-bold overflow-hidden">
              <div id="title" className="translate-y-20 opacity-0">
                where
              </div>
              <div id="title" className="text-red -translate-y-20 opacity-0">
                imagination
              </div>
              <div id="title" className="translate-y-20 opacity-0">
                soars
              </div>
            </div>
            <div className="text-xl lg:text-2xl mt-5 text-light w-full overflow-hidden relative">
              unlease fun and advventure with our world of{" "}
              <span className="text-red">toyzz</span>
              <div
                id="sub-title"
                className="h-full w-full bg-[#121212] absolute top-0 right-0"
              ></div>
            </div>
          </div>
          <div
            id="logo"
            className="w-full md:w-[20%] uppercase text-6xl flex justify-between opacity-0"
          >
            <div></div>
            <div className="flex gap-3">
              <div
                className="border-2 h-fit rounded-full relative cursor-pointer text-4xl lg:text-6xl"
                onClick={openCartModal}
              >
                <GiMineTruck />
                {getTotalAmount() > 0 && (
                  <div className="absolute top-[-15px] text-base lg:text-xl right-[-10px] border-2 border-red text-red rounded-full w-8 bg-[#121212] text-center">
                    {getTotalAmount()}
                  </div>
                )}
              </div>
              <div className="text-3xl lg:text-6xl flex items-center lg:items-start">
                toyzz
              </div>
            </div>
          </div>
        </div>

        <div
          id="img"
          className="pt-5 lg:pt-10 flex items-center w-full md:hidden justify-center h-[58%] opacity-0"
        >
          <Carousel className="w-[80%]">
            <CarouselContent>
              {heroImage.map((img: any) => (
                <CarouselItem key={img}>
                  <div className="bg-white">
                    <img src={img} alt="" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="pt-10 hidden md:flex justify-between h-[65%] lg:h-[72%]">
          {heroImagesArray.map((img: any) => (
            <HeroImage key={img.url} src={img.url} bg={img.bg} />
          ))}
        </div>

        <div id="bottom-text" className="h-[13%] relative uppercase opacity-0">
          <div className="flex flex-col w-full absolute bottom-0 left-[-1.8%] text-red text-3xl md:text-7xl lg:text-[8rem] font-bold whitespace-nowrap">
            <div>everything about toys</div>
            <div className="flex mt-6 w-[1600px]">
              <div className="h-3 w-[60%] bg-red" />
              <div className="h-3 w-[20%] " />
              <div className="h-3 w-[20%] bg-red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
