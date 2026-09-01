import razorpay from "../config/razorpay.js";

import Order from "../models/Order.js";

import Payment from "../models/Payment.js";

import crypto from "crypto";




// ======================================
// CREATE RAZORPAY ORDER
// ======================================


export const createPaymentOrder = async (req, res) => {


    try {


        const { orderId } = req.body;



        const order = await Order.findById(orderId);



        if (!order) {


            return res.status(404).json({

                success: false,

                message: "Order not found"

            });


        }





        if (

            order.user.toString()

            !==

            req.user._id.toString()

        ) {


            return res.status(403).json({

                success: false,

                message: "Not allowed"

            });


        }





        const options = {


            amount:

                order.totalAmount * 100,


            currency: "INR",


            receipt:

                `order_${order._id}`


        };





        const razorpayOrder = await razorpay.orders.create(

            options

        );




        const payment = await Payment.create({

            user: req.user._id,

            order: order._id,

            razorpayOrderId:
                razorpayOrder.id,

            amount:
                order.totalAmount,

            paymentStatus: "Pending"

        });





        res.status(201).json({


            success: true,


            message: "Payment order created",


            razorpayOrder,


            payment



        });



    }


    catch (error) {


        res.status(500).json({


            success: false,


            message: error.message


        });


    }


};








// ======================================
// VERIFY RAZORPAY PAYMENT
// ======================================


export const verifyPayment = async (req, res) => {


    try {


        const {


            razorpay_order_id,


            razorpay_payment_id,


            razorpay_signature



        } = req.body;





        const body =

            razorpay_order_id

            +

            "|"

            +

            razorpay_payment_id;






        const expectedSignature =

            crypto

                .createHmac(

                    "sha256",

                    process.env.RAZORPAY_SECRET

                )

                .update(body.toString())

                .digest("hex");







        if (

            expectedSignature !== razorpay_signature

        ) {


            return res.status(400).json({


                success: false,


                message: "Payment verification failed"


            });


        }








        const payment = await Payment.findOne({


            razorpayOrderId: razorpay_order_id


        });






        if (!payment) {


            return res.status(404).json({


                success: false,


                message: "Payment record not found"


            });


        }






        payment.paymentStatus = "Paid";


        payment.razorpayPaymentId =

            razorpay_payment_id;



        payment.transactionId =

            razorpay_payment_id;





        await payment.save();







        const order = await Order.findById(

            payment.order

        );






        if (order) {


            order.paymentStatus = "Paid";


            order.orderStatus = "Processing";


            await order.save();


        }







        res.status(200).json({


            success: true,


            message: "Payment verified successfully",


            payment,


            order



        });




    }


    catch (error) {



        res.status(500).json({


            success: false,


            message: error.message


        });



    }


};








// ======================================
// UPDATE PAYMENT STATUS (ADMIN)
// ======================================


export const updatePaymentStatus = async (req, res) => {


    try {


        const payment = await Payment.findById(

            req.params.id

        );



        if (!payment) {


            return res.status(404).json({


                success: false,


                message: "Payment not found"


            });


        }





        const { paymentStatus } = req.body;





        const allowedStatus = [


            "Pending",

            "Paid",

            "Failed",

            "Refunded"


        ];





        if (

            !allowedStatus.includes(paymentStatus)

        ) {


            return res.status(400).json({


                success: false,


                message: "Invalid payment status"


            });


        }





        payment.paymentStatus = paymentStatus;



        await payment.save();






        res.status(200).json({


            success: true,


            message: "Payment status updated successfully",


            payment



        });




    }


    catch (error) {



        res.status(500).json({


            success: false,


            message: error.message


        });


    }


};









// ======================================
// GET PAYMENT HISTORY
// ======================================


export const getPaymentHistory = async (req, res) => {


    try {


        const payments = await Payment.find({


            user: req.user._id


        })


            .populate(

                "order",

                "totalAmount orderStatus"

            )


            .sort({

                createdAt: -1

            });






        res.status(200).json({


            success: true,


            totalPayments: payments.length,


            payments



        });




    }


    catch (error) {


        res.status(500).json({


            success: false,


            message: error.message


        });


    }


};








// ======================================
// CREATE REFUND
// ======================================


export const createRefund = async (req, res) => {


    try {


        const payment = await Payment.findById(

            req.params.id

        );





        if (!payment) {


            return res.status(404).json({


                success: false,


                message: "Payment not found"


            });


        }







        if (

            payment.user.toString()

            !==

            req.user._id.toString()

        ) {


            return res.status(403).json({


                success: false,


                message: "You cannot refund this payment"


            });


        }







        if (

            payment.paymentStatus !== "Paid"

        ) {


            return res.status(400).json({


                success: false,


                message: "Only paid payments can be refunded"


            });


        }







        const refund = await razorpay.payments.refund(


            payment.transactionId,


            {


                amount:

                    payment.amount * 100


            }


        );






        payment.paymentStatus = "Refunded";

        await payment.save();

        const order = await Order.findById(payment.order);

        if (order) {

            order.paymentStatus = "Failed";

            order.orderStatus = "Cancelled";

            await order.save();

        }






        res.status(200).json({


            success: true,


            message: "Refund created successfully",


            refund,


            payment



        });





    }


    catch (error) {


        res.status(500).json({


            success: false,


            message: error.message


        });



    }


};