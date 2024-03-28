import React, { useState } from "react";
import { client, urlFor } from "@/lib/client";
import ImagesDisplay from "@/components/ImagesDisplay";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "@/context/StateContext";
import { useToast } from "@/components/ui/use-toast";

function ProductDetail({ product }: any) {
  const { toast } = useToast();
  const { addCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  let images: any = [];

  product.image.forEach((image: any) => {
    const imageUrl = urlFor(image)?.url() || "";
    images.push(imageUrl);
  });

  const addItem = (event: any) => {
    event.stopPropagation();
    event.nativeEvent.preventDefault();
    addCart(product.name, product._id, images[0], quantity, product.price);
    toast({
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="px-6 2xl:px-0 pt-10 lg:pt-40">
      <div className="flex flex-col lg:flex-row gap-12">
        <ImagesDisplay images={images} />
        <div className="flex flex-col gap-10">
          <div className="uppercase text-4xl lg:text-6xl font-bold">{product.name}</div>
          <div className="flex flex-col gap-2 text-xl">
            <div className="font-bold ">Details:</div>
            <div className="text-light">{product.details}</div>
          </div>
          <div className="text-red text-3xl lg:text-4xl font-bold">${product.price}</div>
          <div className="text-xl ">
            <div className="font-bold mb-5">Quanity:</div>
            <div className="flex gap-5 border-2 border-light py-3 px-5 w-fit rounded-md items-center">
              <FaMinus
              className="cursor-pointer"
                onClick={() =>
                  setQuantity((prevCount) =>
                    prevCount > 1 ? prevCount - 1 : 0
                  )
                }
              />
              <div className="text-center">{quantity}</div>
              <FaPlus
              className="cursor-pointer"
                onClick={() => setQuantity((prevCount) => prevCount + 1)}
              />
            </div>
          </div>
          <div className="uppercase flex gap-6 text-2xl">
            <div
              onClick={(event) => addItem(event)}
              className="w-[217px] text-center border-2 border-red py-3 px-8 rounded-md hover:bg-red cursor-pointer"
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40 uppercase text-2xl font-bold">
        Frequently Purchased With
      </div>
    </div>
  );
}

export default ProductDetail;

export const getServerSideProps = async ({ params }: any) => {
  const product = await client.getDocument(params.productId);
  return {
    props: { product },
  };
};
