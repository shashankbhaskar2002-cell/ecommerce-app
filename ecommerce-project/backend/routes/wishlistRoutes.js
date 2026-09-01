import express from "express";


import {

    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist


}

from "../controllers/wishlistController.js";


import {

    protect

}

from "../middleware/authMiddleware.js";



const router = express.Router();




// ADD TO WISHLIST


router.post(

    "/add",

    protect,

    addToWishlist

);

// GET USER WISHLIST


router.get(

"/",

protect,

getWishlist

);



// REMOVE PRODUCT FROM WISHLIST


router.delete(

"/remove/:id",

protect,

removeFromWishlist

);


// CLEAR WISHLIST


router.delete(

"/clear",

protect,

clearWishlist

);




export default router;