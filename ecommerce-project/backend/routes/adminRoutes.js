import express from "express";

import {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getProductAnalytics,
    getOrderAnalytics,
    getDashboardWidgets

} from "../controllers/adminController.js";

import {
    protect,
    authorize
} from "../middleware/authMiddleware.js";


const router = express.Router();


// =============================
// ADMIN DASHBOARD
// =============================

router.get(

    "/dashboard",

    protect,

    authorize("admin"),

    getDashboardStats

);


// =============================
// ADMIN - GET ALL USERS
// =============================

router.get(

    "/users",

    protect,

    authorize("admin"),

    getAllUsers

);


// =============================
// ADMIN - UPDATE USER ROLE
// =============================

router.put(

    "/users/role/:id",

    protect,

    authorize("admin"),

    updateUserRole

);


// =============================
// ADMIN - DELETE USER
// =============================

router.delete(

"/users/:id",

protect,

authorize("admin"),

deleteUser

);



// =============================
// ADMIN - PRODUCT ANALYTICS
// =============================

router.get(

"/products/analytics",

protect,

authorize("admin"),

getProductAnalytics

);

router.get(

    "/orders/analytics",

    protect,

    authorize("admin"),

    getOrderAnalytics

);




router.get(

"/dashboard/widgets",

protect,

authorize("admin"),

getDashboardWidgets

);


export default router;