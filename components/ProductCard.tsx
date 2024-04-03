import { urlFor } from "@/lib/client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/StateContext";
import { useToast } from "./ui/use-toast";
import Image from "next/image";

function ProductCard({ product }: any) {
  const { toast } = useToast();
  const { addCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageUrlPrimary: any = product.image[0]
    ? urlFor(product.image[0])?.url()
    : "";
  const imageUrlSecondary = product.image[1]
    ? urlFor(product.image[1])?.url()
    : undefined;

  const addItem = (event: any) => {
    event.stopPropagation();
    event.nativeEvent.preventDefault();
    addCart(product.name, product._id, imageUrlPrimary, 1, product.price);
    toast({
      description: `${product.name} has been added to your cart.`,
    });
  };
  return (
    <Link id="productCard" href={`/product/${product._id}`}>
      <motion.div
        layout
        className="w-80 rounded-md border-2 border-light overflow-hidden pb-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-[320px] h-[320px]">
          <Image
            width={320}
            height={320}
            src={isHovered ? imageUrlSecondary : imageUrlPrimary}
            alt={product.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col px-3 text-xl pt-3 gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div
                className={`py-1 px-2 min-w-[119px] ${
                  product.inStock ? "bg-yellow text-dark" : "bg-blue text-white"
                } font-bold rounded-md w-fit text-center`}
              >
                {product.inStock ? "In-Stock" : "Pre-Orders"}
              </div>
              <div className="overflow-hidden whitespace-pre-line break-words">
                <p>{product.name}</p>
              </div>
            </div>
            <div>${product.price}</div>
            <div
              onClick={(event) => addItem(event)}
              className="bg-blue text-center rounded-md py-1 hover:bg-yellow hover:text-dark"
            >
              Add to cart
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;
