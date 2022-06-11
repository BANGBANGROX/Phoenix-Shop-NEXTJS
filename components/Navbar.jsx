import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

// Components
import Cart from "./Cart";

// Context
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const {
    setCartItems,
    setTotalPrice,
    setTotalQuantity,
    showCart,
    setShowCart,
    totalQuantity,
  } = useStateContext();

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      setTotalPrice(Number(JSON.parse(localStorage.getItem("totalPrice"))));
      setTotalQuantity(
        Number(JSON.parse(localStorage.getItem("totalQuantity")))
      );
    }
  }, []);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Phoenix Shop</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
