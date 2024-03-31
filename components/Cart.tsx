import { useCart } from "@/context/StateContext";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import CartItem from "./CartItem";
import getStripe from "@/lib/getStripe";

function Cart() {
  const { cart, openCart, closeCartModal, setStateLoading, loading } =
    useCart();

  // Function to calculate the total cost of all items in the cart
  const calculateTotalCost = () => {
    const total = cart.reduce((total, item: any) => {
      return total + item.price * item.amount;
    }, 0);
  
    // Round the total to two decimal places
    return parseFloat(total.toFixed(2));
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (response.status === 500) return;

    const data = await response.json();
    localStorage.setItem('checkoutSession', JSON.stringify(data));

    stripe.redirectToCheckout({ sessionId: data.id });

    localStorage.removeItem("toyzCart");
  };


  return (
    <div
      className={`bg-white ${
        openCart ? "" : "translate-x-full"
      } h-full fixed right-0 top-0 px-3 lg:px-10 md:px-8 text-blue py-20 flex flex-col justify-between w-full md:w-fit lg:min-w-[400px] duration-300 ease-out transition-all z-30`}
    >
      <div className="h-[83%]">
        <div className="text-xl font-semibold flex items-center gap-3">
          <FaAngleLeft onClick={closeCartModal} className="cursor-pointer" />
          <div>
            Your Cart{" "}
            <span className="text-red">
              ({cart.length} {cart.length > 1 ? "items" : "item"})
            </span>
          </div>
        </div>

        <div className="h-full pt-4 flex flex-col lg:gap-8 overflow-y-scroll no-scrollbar">
          {cart.length > 0 ? (
            cart.map((item: any) => <CartItem key={item.name} item={item} />)
          ) : (
            <div className="text-center uppercase text-xl font-semibold">
              Your Cart is Empty
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="text-2xl mb-3 flex justify-between">
          <div>Subtotal</div>
          <div className="font-bold">${calculateTotalCost()}</div>
        </div>
        <div
          onClick={handleCheckout}
          className="bg-red text-white text-center py-3 text-xl rounded-md hover:bg-blue cursor-pointer"
        >
          Pay With Stripe
        </div>
      </div>
    </div>
  );
}

export default Cart;
