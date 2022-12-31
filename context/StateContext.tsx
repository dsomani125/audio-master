import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import product from '../sanity-audio-master/schemas/product';

const Context = createContext();

export const StateContext = ({children}: any) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let selectedProduct: any;
    let selectedIndex;

    const incQty = () => {
        setQty((prev) => prev+1);
    };
    const decQty = () => {
        setQty((prev) => {
            if(prev === 1 ) return 1;
            return prev-1;
        });
    };

    const onAdd = (product: any, quantity: number) => {
        const checkProductInCart = cartItems.find((item: any) => item._id === product._id);

        setTotalQuantities((prev) => prev+quantity);
        setTotalPrice((prev) => prev + product.price*quantity);

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((item: any) => {
                if(item._id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            });
            setCartItems(updatedCartItems);
        } else{
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const toggleCartItemQuantity = (id: number, value: string) => {
        selectedProduct = cartItems.find((item: any) => item._id === id);
        selectedIndex = cartItems.findIndex((item: any) => item._id === id);
        const newCartItems = cartItems.filter((item: any) => item._id !== id);

        if(value === 'inc'){
            setCartItems([...newCartItems, {...selectedProduct, quantity: selectedProduct.quantity + 1}]);
            setTotalPrice((prev) => prev + selectedProduct.price);
            setTotalQuantities((prev) => prev + 1);
        } else if(value === 'dec') {
            if(selectedProduct.quantity > 1) {
                selectedProduct.quantity -= 1;
                setCartItems([...newCartItems, {...selectedProduct, quantity: selectedProduct.quantity - 1}]);
                setTotalPrice((prev) => prev - selectedProduct.price);
                setTotalQuantities((prev) => prev - 1);
            }     
        }
    };

    const onRemove = (id: number) => {
        selectedProduct = cartItems.find((item: any) => item._id === id);
        const newCartItems = cartItems.filter((item: any) => item._id !== id);
        setTotalPrice((prev) => prev - selectedProduct.price*selectedProduct.quantity);
        setTotalQuantities((prev) => prev - selectedProduct.quantity);
        setCartItems(newCartItems);
    }

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