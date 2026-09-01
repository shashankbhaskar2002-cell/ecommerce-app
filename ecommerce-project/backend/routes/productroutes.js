import express from "express";
import {

    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    bulkDeleteProducts

}

from "../controllers/productController.js";

import {

    protect,
    authorize

} from "../middleware/authMiddleware.js";


import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();


// GET ALL PRODUCTS

router.get(

    "/",

    getAllProducts

);


// SEARCH PRODUCTS

router.get(
    "/search",
    searchProducts
);


// CREATE PRODUCT

router.post(

    "/create",

    protect,

    authorize("admin"),

    upload.array("images", 5),

    createProduct

);


router.get(

    "/:id",

    getSingleProduct

);


// UPDATE PRODUCT

router.put(

    "/update/:id",

    protect,

    authorize("admin"),

    upload.array("images",5),

    updateProduct

);


// DELETE PRODUCT

router.delete("/delete/:id", protect, authorize("admin"), deleteProduct);



router.post(

"/bulk-delete",

protect,

authorize("admin"),

bulkDeleteProducts

);


export default router;