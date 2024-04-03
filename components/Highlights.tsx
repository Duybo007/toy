import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Highlights({ highlightProducts }: any) {
  useGSAP(() => {
    gsap.to("#left-text", {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      stagger: 0.25,
      duration: 1.5,
      scrollTrigger: {
        trigger: "#left-text",
        start: "bottom bottom",
        scrub: true,
      },
    });
  });
  return (
    <section className="w-screen pb-20 lg:pb-0 lg:h-screen overflow-hidden">
      <div className="max-w-[1420px] h-full flex flex-col lg:flex-row px-6 2xl:px-0">
        <div className="flex flex-col justify-center px-8 gap-10 uppercase w-full lg:w-1/2">
          <div
            id="left-text"
            className="text-5xl lg:text-8xl font-bold opacity-0 translate-y-20"
          >
            bring your heros to life
          </div>
          <div
            id="left-text"
            className="text-xl lg:text-3xl opacity-0 translate-y-20"
          >
            step into a world of thrilling escapades and larger-than-life
            characters as you explore our impressive collection of action
            figures
          </div>
          <div
            id="left-text"
            className="py-4 px-6 lg:text-3xl bg-red w-fit opacity-0 translate-y-20 hover:bg-blue"
          >
            check our store
          </div>
          <div
            id="left-text"
            className="text-base lg:text-2xl text-red opacity-0 translate-y-20"
          >
            more than 1000+ collection in our store !
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex flex-row h-full">
          <div className="w-1/2 flex flex-col gap-4 track-small track">
            {[...highlightProducts, ...highlightProducts].map((img, i) => (
              <Link
                href={`/product/${img._id}`}
                key={`${img.imageUrl}-${i}`}
                className="product-card w-[280px] xl:w-[330px] relative"
              >
                <div className="w-full h-[500px] relative">
                  <Image
                    fill
                    src={img.imageUrl}
                    alt="highlight images"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="w-1/2 flex flex-col gap-4 track-rev justify-end">
            {[...highlightProducts, ...highlightProducts].map((img, i) => (
              <Link
                href={`/product/${img._id}`}
                key={`${img.imageUrl}_${i}`}
                className="product-card h-[500px] w-[280px] xl:w-[330px]"
              >
                <div className="w-full h-[500px] relative">
                  <Image
                    fill
                    loading="lazy"
                    src={img.imageUrl}
                    alt="highlight images"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
