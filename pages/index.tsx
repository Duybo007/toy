import Contact from "@/components/Contact";
import Epic from "@/components/Epic";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import MonthlyPromo from "@/components/MonthlyPromo";
import Quote from "@/components/Quote";
import { heroImageBg } from "@/constants";
import { client, urlFor } from "@/lib/client";
import { useEffect } from "react";

export default function Home({ highlightProducts, heroImagesArray }: any) {
  // console.log(heroImages);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <Hero heroImages={heroImagesArray} />
      <Highlights />
      <Epic />
      <MonthlyPromo />
      <Quote />
      <Contact />
    </main>
  );
}

export const getServerSideProps = async () => {
  const query =
    '*[_type == "product" ]{ image, name, slug, price, details, categories ,"highlight": true}';
  const highlightProducts = await client.fetch(query);

  let heroImagesArray: any = [];
  const queryHero = '*[_type == "heroImgs" ]';
  const heroImages = await client.fetch(queryHero);

  heroImages.map((img: any, index: number) => {
    const image = img.image[0]? urlFor(img.image[0])?.url() : "";
    heroImagesArray.push({"url":image, "bg": heroImageBg[index]});
  });
  return {
    props: { highlightProducts, heroImagesArray },
  };
};
