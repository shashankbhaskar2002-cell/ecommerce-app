import express from "express";

import {

    addAddress,
        getAddresses,

    updateAddress,

    deleteAddress,
        setDefaultAddress



} from "../controllers/addressController.js";

import {

    protect

} from "../middleware/authMiddleware.js";

const router = express.Router();

// =============================
// ADD ADDRESS
// =============================

router.post(

    "/add",

    protect,

    addAddress

);


// =============================
// GET ALL ADDRESSES
// =============================

router.get(

    "/",

    protect,

    getAddresses

);




// =============================
// UPDATE ADDRESS
// =============================

router.put(

    "/update/:id",

    protect,

    updateAddress

);




// =============================
// DELETE ADDRESS
// =============================

router.delete(

    "/delete/:id",

    protect,

    deleteAddress

);



// =============================
// SET DEFAULT ADDRESS
// =============================

router.put(

    "/default/:id",

    protect,

    setDefaultAddress

);



export default router;