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
  console.log(highlightProducts)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <Hero heroImagesArray={heroImagesArray} />
      <Highlights highlightProducts={highlightProducts}/>
      <Epic />
      <MonthlyPromo />
      <Quote />
      <Contact />
    </main>
  );
}

export const getServerSideProps = async () => {
  const query =
    '*[_type == "product" ]{ _id, image, name, slug, price, details, categories ,"highlight": true, bought}';
  const highlightProducts = await client.fetch(query);
  highlightProducts.map((product: any) => {
    const image = product.image[0]? urlFor(product.image[0])?.url() : ""
    product.imageUrl = image
  })

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
