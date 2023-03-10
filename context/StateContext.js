import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import product from '../sanity-audio-master/schemas/product';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let selectedProduct;
    let selectedIndex;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.filter((item) => item._id === product._id);
        
        setTotalPrice((prev) => prev + product.price * quantity);
        setTotalQuantities((prev) => prev + quantity);
        
        if(checkProductInCart.length > 0) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
            return cartProduct;
          })
    
          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
          setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const toggleCartItemQuantity = (id, value) => {
        selectedProduct = cartItems.find((item) => item._id === id);
        selectedIndex = cartItems.findIndex((item) => item._id === id);

        if(value === 'inc'){
            setCartItems(cartItems.map((item) => {
                if(item._id === id) return {...item, quantity : item.quantity + 1};
                return item;
            }))
            // setCartItems([...newCartItems, {...selectedProduct, quantity: selectedProduct.quantity + 1}]);
            setTotalPrice((prev) => prev + selectedProduct.price);
            setTotalQuantities((prev) => prev + 1);
        } else if(value === 'dec') {
            if(selectedProduct.quantity > 1) {
                setCartItems(cartItems.map((item) => {
                    if(item._id === id) return {...item, quantity : item.quantity - 1};
                    return item;
                }))
                // setCartItems([...newCartItems, {...selectedProduct, quantity: selectedProduct.quantity - 1}]);
                setTotalPrice((prev) => prev - selectedProduct.price);
                setTotalQuantities((prev) => prev - 1);
            }     
        }
    };

    const onRemove = (id) => {
        selectedProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setTotalPrice((prev) => prev - selectedProduct.price*selectedProduct.quantity);
        setTotalQuantities((prev) => prev - selectedProduct.quantity);
        setCartItems(newCartItems);
    };

    const incQty = () => {
        setQty((prev) => prev+1);
    };
    const decQty = () => {
        setQty((prev) => {
            if(prev <= 1 ) return 1;
            return prev-1;
        });
    };

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
};

export const useStateContext = () => useContext(Context);