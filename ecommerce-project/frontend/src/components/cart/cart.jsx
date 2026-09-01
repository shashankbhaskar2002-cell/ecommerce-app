import React from "react";
import { useCart } from "../context/CartContext.jsx";

function Cart() {

    const {
        cartItems,
        cartTotal,
        updateCart,
        removeFromCart,
        clearCart,
        loading
    } = useCart();


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (!cartItems || cartItems.length === 0) {

        return (

            <div className="cart-page">

                <h1>My Cart 🛒</h1>

                <div className="empty-cart">

                    <h2>Your cart is empty</h2>

                    <p>
                        Add some products to your cart.
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="cart-page">

            <h1>My Cart 🛒</h1>


            {/* =====================================
                CART ITEMS
            ===================================== */}

            <div className="cart-container">


                <div className="cart-items">


                    {cartItems.map((item) => {

                        const product =
                            item.product;


                        // Safety check

                        if (!product) {

                            return null;

                        }


                        return (

                            <div
                                className="cart-item"
                                key={product._id}
                            >


                                {/* PRODUCT IMAGE */}

                                <div className="cart-image">

                                    <img
                                        src={
                                            product.image ||
                                            product.images?.[0]
                                        }
                                        alt={product.name}
                                    />

                                </div>


                                {/* PRODUCT INFO */}

                                <div className="cart-info">

                                    <h2>
                                        {product.name}
                                    </h2>

                                    <p className="cart-price">

                                        ₹
                                        {product.price}

                                    </p>


                                    <p>

                                        Subtotal: ₹
                                        {
                                            Number(
                                                product.price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        }

                                    </p>


                                    {/* QUANTITY */}

                                    <div className="quantity-controls">

                                        <button
                                            type="button"
                                            disabled={
                                                loading ||
                                                item.quantity <= 1
                                            }
                                            onClick={() =>
                                                updateCart(
                                                    product._id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            −
                                        </button>


                                        <span>
                                            {item.quantity}
                                        </span>


                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() =>
                                                updateCart(
                                                    product._id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    {/* =================================
                                        REMOVE ITEM BUTTON
                                    ================================= */}

                                    <button
                                        type="button"
                                        className="remove-cart-button"
                                        disabled={loading}
                                        onClick={() => {

                                            console.log(
                                                "REMOVE CLICKED:",
                                                product._id
                                            );

                                            removeFromCart(
                                                product._id
                                            );

                                        }}
                                    >

                                        🗑️ Remove Item

                                    </button>


                                </div>

                            </div>

                        );

                    })}

                </div>


                {/* =====================================
                    CART SUMMARY
                ===================================== */}

                <div className="cart-summary">

                    <h2>
                        Cart Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {cartItems.reduce(
                                (total, item) =>
                                    total +
                                    Number(
                                        item.quantity || 0
                                    ),
                                0
                            )}
                        </span>

                    </div>


                    <div className="summary-row total">

                        <span>
                            Total
                        </span>

                        <span>
                            ₹{cartTotal}
                        </span>

                    </div>


                    {/* CLEAR CART */}

                    <button
                        type="button"
                        className="clear-cart-button"
                        disabled={loading}
                        onClick={() => {

                            const confirmClear =
                                window.confirm(
                                    "Are you sure you want to clear your cart?"
                                );

                            if (confirmClear) {

                                clearCart();

                            }

                        }}
                    >

                        🗑️ Clear Cart

                    </button>


                    {/* CHECKOUT */}

                    <button
                        type="button"
                        className="checkout-button"
                        onClick={() =>
                            window.location.href =
                                "/checkout"
                        }
                    >

                        Proceed to Checkout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Cart;
