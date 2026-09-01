import express from "express";

import {

    placeOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    getOrderStats,
    getMonthlySales,
    getTopProducts,
    getRecentOrders,
    updatePaymentStatus

} from "../controllers/orderController.js";


import {

    protect,
    authorize

} from "../middleware/authMiddleware.js";



const router = express.Router();



// =============================
// PLACE ORDER
// =============================

router.post(

    "/place",

    protect,

    placeOrder

);




// =============================
// GET MY ORDERS
// =============================

router.get(

    "/my-orders",

    protect,

    getMyOrders

);




// =============================
// ADMIN GET ALL ORDERS
// =============================

router.get(

    "/admin/all",

    protect,

    authorize("admin"),

    getAllOrders

);

// =============================
// ADMIN UPDATE ORDER STATUS
// =============================

router.put(
"/admin/update-status/:id",
protect,
authorize("admin"),
updateOrderStatus
);



router.put(

"/:id/status",

protect,

authorize("admin"),

updateOrderStatus

);




// =============================
// ADMIN UPDATE PAYMENT STATUS
// =============================

router.put(

    "/:id/payment",

    protect,

    authorize("admin"),

    updatePaymentStatus

);



// =============================
// ADMIN ORDER STATISTICS
// =============================


router.get(

"/admin/stats",

protect,

authorize("admin"),

getOrderStats

);




// =============================
// ADMIN MONTHLY SALES
// =============================


router.get(

"/admin/monthly-sales",

protect,

authorize("admin"),

getMonthlySales

);

// =============================
// ADMIN TOP PRODUCTS
// =============================


router.get(

"/admin/top-products",

protect,

authorize("admin"),

getTopProducts

);



router.get(

"/admin/recent",

protect,

authorize("admin"),

getRecentOrders

);





// =============================
// GET SINGLE ORDER
// =============================

router.get(

    "/:id",

    protect,

    getSingleOrder

);




// =============================
// CANCEL ORDER
// =============================

router.put(

    "/cancel/:id",

    protect,

    cancelOrder

);



export default router;