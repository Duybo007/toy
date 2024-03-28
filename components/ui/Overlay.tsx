import { useCart } from "@/context/StateContext";
import React from "react";

function Overlay() {
  const { openCart, closeCartModal } = useCart();
  return <div onClick={closeCartModal} className={`${openCart? "fixed" : "hidden"} fixed inset-0 bg-dark/50 z-20 `}></div>;
}

export default Overlay;
