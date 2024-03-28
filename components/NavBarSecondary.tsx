import { navLists } from "@/constants";
import React, { useEffect, useState } from "react";
import { GiMineTruck } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/context/StateContext";
import { FaSearchengin } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBarSecondary() {
  const { cart, openCartModal, setStateSearchTerm } = useCart();
  const [route, setRoute] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [clickMenu, setClickMenu] = useState(false);

  const router = useRouter();

  //Get total amount from cart
  const getTotalAmount = () => {
    return cart.reduce((total, item: any) => total + item.amount, 0);
  };

  useEffect(() => {
    setRoute(router.pathname);
  }, [router]);

  const onSearch = async (event: any) => {
    event.preventDefault();
    setStateSearchTerm(searchTerm);
  };

  return (
    <div className="pt-7 shadow-md shadow-dark flex">
      <div className="max-w-[1420px] mx-auto w-full flex justify-around pb-3 items-center">
        <Link href="/" className=" text-red text-2xl">
          TOYZZ
        </Link>
        <div className="hidden md:flex gap-12 uppercase">
          {navLists.map((nav, index) => (
            <Link
              key={`${nav.name}-${index}`}
              href={nav.path}
              className={`hover:text-yellow ${
                route === nav.path && "text-yellow font-bold"
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>
        <form
          onSubmit={onSearch}
          className="border-2 border-light py-1 px-2 rounded-md flex items-center w-[170px] lg:w-fit"
        >
          <FaSearchengin />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="search"
            className="bg-transparent focus:outline-none pl-2"
          />
        </form>
        <div className="w-10 h-10 md:border-2 relative border-light rounded-full flex items-center justify-center cursor-pointer hover:border-yellow hover:text-yellow">
          <GiHamburgerMenu
            onClick={() => setClickMenu(!clickMenu)}
            className="md:hidden"
          />
          <GiMineTruck
            onClick={openCartModal}
            className="hidden md:block w-8 h-8"
          />
          {getTotalAmount() > 0 && (
            <div className="hidden md:absolute top-[-15px] right-[-10px] border-2 border-light rounded-full w-6 bg-[#121212] text-center">
              {getTotalAmount()}
            </div>
          )}
        </div>
        {clickMenu && (
          <div className="absolute bg-[#121212] right-5 top-[80px] z-20 rounded-md border-2 border-dark">
            <div className="flex flex-col gap-4 px-3 w-[200px] py-8">
              {navLists.map((nav, index) => (
                <Link
                  key={`${nav.name}+${index}`}
                  href={nav.path}
                  className={`hover:text-yellow px-3 py-2 rounded-md ${
                    route === nav.path && "text-white font-bold bg-black"
                  }`}
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBarSecondary;
