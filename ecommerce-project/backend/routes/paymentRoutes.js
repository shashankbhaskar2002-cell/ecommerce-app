import express from "express";


import {

    createPaymentOrder,
    verifyPayment,
    updatePaymentStatus,
    getPaymentHistory,
    createRefund


}

from "../controllers/paymentController.js";



import {

    protect,
    authorize

}

from "../middleware/authMiddleware.js";



const router = express.Router();





// CREATE PAYMENT ORDER

router.post(

    "/create-order",

    protect,

    createPaymentOrder

);






// VERIFY PAYMENT

router.post(

    "/verify",

    protect,

    verifyPayment

);






// ADMIN UPDATE PAYMENT STATUS

router.put(

    "/update-status/:id",

    protect,

    authorize("admin"),

    updatePaymentStatus

);






// USER PAYMENT HISTORY

router.get(

    "/history",

    protect,

    getPaymentHistory

);






// REFUND PAYMENT

router.post(

    "/refund/:id",

    protect,

    createRefund

);





export default router;