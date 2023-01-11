import React from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiPlus, TiMinus, TiDeleteOutline } from "react-icons/ti";
import { TbCurrencyRupee } from "react-icons/tb";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const {
    setShowCart,
    totalQuantities,
    totalPrice,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const closeCart = (event) => {
    if (event.clientX < window.innerWidth - 600) setShowCart(false);
  };

  document.addEventListener("click", closeCart);

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                // item && (
                <div key={item._id} className="product">
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>
                        <TbCurrencyRupee size={16} />
                        {item.price}
                      </h4>
                    </div>
                    <div className="flex bottom">
                      <p className="quantity-desc">
                        <span
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <TiMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <TiPlus />
                        </span>
                      </p>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item?._id)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
                // )
              ))}
          </div>

          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Total: </h3>
                <h3>
                  <TbCurrencyRupee />
                  {totalPrice}
                </h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  PAY WITH STRIPE
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Cart;
