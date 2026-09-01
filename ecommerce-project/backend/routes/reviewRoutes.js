import express from "express";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviewsAdmin,
    deleteReviewAdmin
} from "../controllers/reviewController.js";

import {
    protect,
    authorize
} from "../middleware/authMiddleware.js";


const router = express.Router();


// ======================================
// CREATE REVIEW
// ======================================

router.post(
    "/create",
    protect,
    createReview
);


// ======================================
// GET PRODUCT REVIEWS
// ======================================

router.get(
    "/product/:id",
    getProductReviews
);


// ======================================
// UPDATE USER REVIEW
// ======================================

router.put(
    "/update/:id",
    protect,
    updateReview
);


// ======================================
// DELETE USER REVIEW
// ======================================

router.delete(
    "/delete/:id",
    protect,
    deleteReview
);


// ======================================
// ADMIN ROUTES
// ======================================


// GET ALL REVIEWS ADMIN

router.get(
    "/admin/all",
    protect,
    authorize("admin"),
    getAllReviewsAdmin
);


// DELETE ANY REVIEW ADMIN

router.delete(
    "/admin/delete/:id",
    protect,
    authorize("admin"),
    deleteReviewAdmin
);



export default router;