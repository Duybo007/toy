import { useCart } from "@/context/StateContext";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";

function CartItem({ item }: any) {
  const { removeCartItem, adjustCartItemAmount } = useCart();

  const handleAmountChange = (event: any) => {
    const newAmount = parseInt(event.target.value, 10); // Parse the input value as an integer

    // Ensure that the new amount is greater than 0
    if (newAmount > 0) {
      adjustCartItemAmount(item.productId, newAmount); // Call the adjustCartItemAmount function
    } else {
      // Optionally, you can provide feedback to the user or prevent the change
      console.error('New amount must be greater than 0');
    }
  };
  return (
    <div className="flex justify-between  lg:gap-10">
      <div className="flex gap-5">
        <div className="w-40 h-40 rounded-md bg-dark overflow-hidden">
          <img
            src={item.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between text-xl font-bold max-w-[220px] whitespace-pre-line break-words">
          <div>{item.name}</div>
          <div>
            QTY:
            <input
              type="number"
              onChange={handleAmountChange}
              value={item.amount}
              className="w-12 lg:w-20 border-[1px] border-light ml-1 px-1 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between text-2xl font-bold items-center">
        <div>${item.price}</div>
        <CiCircleRemove
          onClick={() => removeCartItem(item.productId)}
          className="w-7 h-7 text-red cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CartItem;
