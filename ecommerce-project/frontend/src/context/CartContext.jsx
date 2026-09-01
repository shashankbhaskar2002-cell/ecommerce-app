import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import API from "../api/axios";


// ==========================================
// CREATE CONTEXT
// ==========================================

const CartContext = createContext(null);


// ==========================================
// CART PROVIDER
// ==========================================

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(false);


    // ==========================================
    // CART COUNT
    // ==========================================

    const cartCount = (cartItems || []).reduce(
        (total, item) => {

            return total + Number(
                item.quantity || 0
            );

        },
        0
    );


    // ==========================================
    // CART TOTAL
    // ==========================================

    const cartTotal = (cartItems || []).reduce(
        (total, item) => {

            const price =
                Number(item.product?.price || 0);

            const quantity =
                Number(item.quantity || 0);

            return total + price * quantity;

        },
        0
    );


    // ==========================================
    // GET CART
    // ==========================================

    const getCart = async () => {

        try {

            setLoading(true);

            const response =
                await API.get("/cart");

            console.log(
                "CART DATA:",
                response.data
            );

            setCartItems(
                response.data.cart?.items || []
            );

        } catch (error) {

            console.error(
                "GET CART ERROR:",
                error.response?.data ||
                error.message
            );

            setCartItems([]);

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UPDATE CART
    // ==========================================

    const updateCart = async (
        productId,
        quantity
    ) => {

        try {

            setLoading(true);

            await API.put(
                "/cart/update",
                {
                    productId,
                    quantity
                }
            );

            await getCart();

        } catch (error) {

            console.error(
                "UPDATE CART ERROR:",
                error.response?.data ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // REMOVE FROM CART
    // ==========================================

    const removeFromCart = async (
        productId
    ) => {

        try {

            setLoading(true);

            await API.delete(
                `/cart/remove/${productId}`
            );

            await getCart();

        } catch (error) {

            console.error(
                "REMOVE CART ERROR:",
                error.response?.data ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = async () => {

        try {

            setLoading(true);

            await API.delete(
                "/cart/clear"
            );

            await getCart();

        } catch (error) {

            console.error(
                "CLEAR CART ERROR:",
                error.response?.data ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // GET CART ON APP LOAD
    // ==========================================

    useEffect(() => {

        getCart();

    }, []);


    // ==========================================
    // PROVIDER
    // ==========================================

    return (

        <CartContext.Provider
            value={{

                cartItems,

                setCartItems,

                loading,

                setLoading,

                cartCount,

                cartTotal,

                getCart,

                updateCart,

                removeFromCart,

                clearCart

            }}
        >

            {children}

        </CartContext.Provider>

    );

};


// ==========================================
// USE CART
// ==========================================

export const useCart = () => {

    const context =
        useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }


    return context;

};
