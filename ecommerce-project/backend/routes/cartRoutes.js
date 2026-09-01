import express from "express";


import {

    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
    

} from "../controllers/cartController.js";


import {

    protect

} from "../middleware/authMiddleware.js";



const router = express.Router();



// =============================
// ADD PRODUCT TO CART
// =============================


router.post(

    "/add",

    protect,

    addToCart

);




// =============================
// GET USER CART
// =============================


router.get(

    "/",

    protect,

    getCart

);




// =============================
// UPDATE CART QUANTITY
// =============================

router.put(

    "/update",

    protect,

    updateCartQuantity

);


// =============================
// REMOVE PRODUCT FROM CART
// =============================

router.delete(

    "/remove/:productId",

    protect,

    removeFromCart

);


// =============================
// CLEAR CART
// =============================

router.delete(

    "/clear",

    protect,

    clearCart

);






export default router;