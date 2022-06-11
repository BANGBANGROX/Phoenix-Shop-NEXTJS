import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    const setItems = () => {
        console.log("SET ITEMS");
        // console.log(cartItems);
        // console.log(totalPrice);
        // console.log(totalQuantity);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    }

    useEffect(() => {
        setItems();
    }, [cartItems, totalPrice, totalQuantity])

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + quantity }
                }
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart!`);
    }

    const onRemove = (id) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    }

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
        } else if (value == 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            } else {
                setCartItems(newCartItems);
            }
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
        }
    }

    const inQty = () => {
        setQty((prevQty) => prevQty + 1);
    }


    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty < 2) return 1;
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider value={{ showCart, cartItems, totalPrice, totalQuantity, qty, inQty, decQty, onAdd, setShowCart, toggleCartItemQuantity, onRemove, setCartItems, setTotalQuantity, setTotalPrice }}>
            {children}
        </Context.Provider>
    )
};

export const useStateContext = () => useContext(Context);