import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext({
  loading: false,
  setStateLoading: (value: boolean) => {},
  searchTerm: "",
  setStateSearchTerm: (newSearchTerm: string) => {},
  openCart: false,
  cart: [],
  openCartModal: () => {},
  closeCartModal: () => {},
  addCart: (
    name: string,
    productId: string,
    imageUrl: string,
    amount: number,
    price: number
  ) => {},
  adjustCartItemAmount: (productId: any, newAmount: any) => {},
  removeCartItem: (productId: any) => {},
});

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any>([]);
  const [openCart, setOpenCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localCart = localStorage.getItem("toyzCart");

    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("toyzCart", JSON.stringify(cart));
    }
  }, [cart]);

  const openCartModal = () => {
    setOpenCart(true);
  };

  const closeCartModal = () => {
    setOpenCart(false);
  };

  const setStateLoading = (value: boolean) => {
    setLoading(value);
  };

  const setStateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  };

  // Function to add a new item to the cart
  const addCart = (
    name: string,
    productId: string,
    imageUrl: string,
    amount: number,
    price: number
  ) => {
    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex(
      (item: any) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      // If the product exists, update the amount
      setCart((prevCart: any) => {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].amount += amount;
        return updatedCart;
      });
    } else {
      // If the product does not exist, add it to the cart
      const newItem = { name, productId, imageUrl, amount, price };
      setCart((prevCart: any) => [...prevCart, newItem]);
    }
  };

  // Function to adjust the amount of an existing item in the cart
  const adjustCartItemAmount = (productId: any, newAmount: any) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item.productId === productId ? { ...item, amount: newAmount } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeCartItem = (productId: any) => {
    setCart((prevCart: any) =>
      prevCart.filter((item: any) => item.productId !== productId)
    );
  };

  const value = {
    loading,
    setStateLoading,
    searchTerm,
    setStateSearchTerm,
    openCart,
    openCartModal,
    closeCartModal,
    cart,
    addCart,
    adjustCartItemAmount,
    removeCartItem,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useCart = () => {
  return useContext(AuthContext);
};
