import ProductCard from "@/components/ProductCard";
import SideFilter from "@/components/SideFilter";
import { client } from "@/lib/client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/context/StateContext";

function product({ products }: any) {

  const { searchTerm } = useCart();

  const [checkboxes, setCheckboxes] = useState({
    inStock: false,
    preOrders: false,
    zero_to_forty: false,
    forty_to_eighty: false,
    above_eighty: false,
    anime: false,
    naruto: false,
    disney: false,
    one_piece: false,
    hentai: false,
  });

  const [displayProducts, setDisplayProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [sortOrder, setSortOrder] = useState("bestSelling");

  useEffect(() => {
    if (searchTerm === "") {
      setDisplayProducts(products);
    } else {
      const fetch = async () => {
        const query = `*[_type == "product" && (
        name match $searchTerm ||
        details match $searchTerm ||
        categories[] match $searchTerm
        )]`;

        const result = await client.fetch(query, {
          searchTerm: `*${searchTerm}*`,
        });
        setDisplayProducts(result);
      };

      fetch();
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = displayProducts.filter((product: any) => {
      const isAvailable =
        (!checkboxes.inStock && !checkboxes.preOrders) ||
        (checkboxes.inStock && product.inStock) ||
        (checkboxes.preOrders && !product.inStock);
      const isPriceInRange =
        (!checkboxes.zero_to_forty &&
          !checkboxes.forty_to_eighty &&
          !checkboxes.above_eighty) ||
        (checkboxes.zero_to_forty &&
          product.price >= 0 &&
          product.price <= 40) ||
        (checkboxes.forty_to_eighty &&
          product.price > 40 &&
          product.price <= 80) ||
        (checkboxes.above_eighty && product.price > 80);
      const isCategorySelected =
        (!checkboxes.anime &&
          !checkboxes.naruto &&
          !checkboxes.disney &&
          !checkboxes.one_piece &&
          !checkboxes.hentai) ||
        (checkboxes.anime && product.categories.includes("anime")) ||
        (checkboxes.naruto && product.categories.includes("naruto")) ||
        (checkboxes.disney && product.categories.includes("disney")) ||
        (checkboxes.one_piece && product.categories.includes("one piece")) ||
        (checkboxes.hentai && product.categories.includes("hentai"));

      return isAvailable && isPriceInRange && isCategorySelected;
    });

    // Apply sorting based on selected sort order
    let sorted = filtered.slice();
    if (sortOrder === "priceLowToHigh") {
      sorted = sorted.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOrder === "priceHighToLow") {
      sorted = sorted.sort((a: any, b: any) => b.price - a.price);
    } else if (sortOrder === "bestSelling") {
      // Calculate total amount sold for each product
      const totalSoldMap: { [key: string]: number } = {};
      filtered.forEach((product: any) => {
        const totalSold =
          product.bought?.reduce(
            (acc: any, curr: any) => acc + curr.amount,
            0
          ) || 0;
        totalSoldMap[product.name] = totalSold;
      });

      // Sort products by total amount sold
      sorted = sorted.sort(
        (a: any, b: any) => totalSoldMap[b.name] - totalSoldMap[a.name]
      );
    }

    setFilteredProducts(sorted);
  }, [checkboxes, displayProducts, sortOrder]);

  useEffect(() => {
    // Calculate product counts for each checkbox
    const counts = {
      inStock: filteredProducts.filter((product: any) => product.inStock)
        .length,
      preOrders: filteredProducts.filter((product: any) => !product.inStock)
        .length,
      zero_to_forty: filteredProducts.filter(
        (product: any) => product.price >= 0 && product.price <= 40
      ).length,
      forty_to_eighty: filteredProducts.filter(
        (product: any) => product.price > 40 && product.price <= 80
      ).length,
      above_eighty: filteredProducts.filter(
        (product: any) => product.price > 80
      ).length,
      anime: filteredProducts.filter((product: any) =>
        product.categories.includes("anime")
      ).length,
      naruto: filteredProducts.filter((product: any) =>
        product.categories.includes("naruto")
      ).length,
      disney: filteredProducts.filter((product: any) =>
        product.categories.includes("disney")
      ).length,
      one_piece: filteredProducts.filter((product: any) =>
        product.categories.includes("one piece")
      ).length,
      hentai: filteredProducts.filter((product: any) =>
        product.categories.includes("hentai")
      ).length,
    };
    setProductCounts(counts);
  }, [filteredProducts]);

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full px-6 2xl:px-0">
      <div className="w-full lg:w-[20%] ">
        <SideFilter
          checkboxes={checkboxes}
          handleCheckboxChange={handleCheckboxChange}
          productCounts={productCounts}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      <div className="w-full lg:w-[80%] lg:pl-10 pt-10 ">
        <div className="flex flex-wrap gap-10">
          <AnimatePresence initial={false}>
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default product;

export const getServerSideProps = async () => {
  const query = '*[_type == "product" ]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
