import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";


// ======================================
// PLACE ORDER
// ======================================

export const placeOrder = async (req, res) => {

    try {

        const {

            shippingAddress,

            paymentMethod

        } = req.body;



        // Find User Cart

        const cart = await Cart.findOne({

            user: req.user._id

        }).populate("items.product");



        if (!cart || cart.items.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Cart is empty."

            });

        }



        // Check Address

        const address = await Address.findById(

            shippingAddress

        );


        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found."

            });

        }



        // Prepare Order Items

        let orderItems = [];

        let totalAmount = 0;



        for (const item of cart.items) {


            // =============================
            // CHECK STOCK
            // =============================

            if (item.product.stock < item.quantity) {

                return res.status(400).json({

                    success: false,

                    message: `${item.product.name} is out of stock.`

                });

            }



            // =============================
            // REDUCE PRODUCT STOCK
            // =============================

            item.product.stock -= item.quantity;


            await item.product.save();




            // =============================
            // ADD ORDER ITEM
            // =============================

            orderItems.push({

                product: item.product._id,

                quantity: item.quantity,

                price: item.product.price

            });



            totalAmount +=

                item.product.price *

                item.quantity;

        }




        // Create Order

        const order = await Order.create({

            user: req.user._id,

            orderItems,

            shippingAddress,

            paymentMethod,

            totalAmount

        });



        // =============================
        // CLEAR CART AFTER ORDER
        // =============================

        cart.items = [];

        cart.totalPrice = 0;

        await cart.save();




        res.status(201).json({

            success: true,

            message: "Order placed successfully.",

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
// GET MY ORDERS
// ======================================

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user._id

        })

        .populate("orderItems.product")

        .populate("shippingAddress")

        .sort({

            createdAt: -1

        });



        res.status(200).json({

            success: true,

            totalOrders: orders.length,

            orders

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
// GET SINGLE ORDER
// ======================================

export const getSingleOrder = async (req, res) => {

    try {

        const order = await Order.findById(

            req.params.id

        )

        .populate("orderItems.product")

        .populate("shippingAddress")

        .populate("user", "name email");



        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }



        // Ownership Check

      if(

    req.user.role !== "admin" &&

    order.user._id.toString() !== req.user._id.toString()

){

    return res.status(403).json({

        success:false,

        message:"Access denied."

    });

}



        res.status(200).json({

            success: true,

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
// CANCEL ORDER
// ======================================

export const cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(

            req.params.id

        );



        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }



        // Ownership Check

        if (

            order.user.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied."

            });

        }



        // Only Processing Orders Can Be Cancelled

        if (

            order.orderStatus !== "Processing"

        ) {

            return res.status(400).json({

                success: false,

                message: "Only processing orders can be cancelled."

            });

        }



        // Restore Stock

        for (const item of order.orderItems) {

            const product = await Product.findById(

                item.product

            );



            if (product) {

                product.stock += item.quantity;

                await product.save();

            }

        }



        order.orderStatus = "Cancelled";



        await order.save();



        res.status(200).json({

            success: true,

            message: "Order cancelled successfully.",

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
// ADMIN - GET ALL ORDERS
// ======================================


export const getAllOrders = async (req,res)=>{


    try{
const {date}=req.query;


let filter={};


if(date){

    filter.createdAt={

        $gte:new Date(date),

        $lt:new Date(
            new Date(date).getTime()+86400000
        )

    };

}

       const orders = await Order.find(filter)


        .populate(

            "user",

            "name email"

        )


        .populate(

            "orderItems.product"

        )


        .populate(

            "shippingAddress"

        )


        .sort({

            createdAt:-1

        });



        res.status(200).json({


            success:true,


            totalOrders:orders.length,


            orders


        });



    }

    catch(error){


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};



// ======================================
// ADMIN - UPDATE ORDER STATUS
// ======================================


export const updateOrderStatus = async(req,res)=>{


    try{


        const order = await Order.findById(

            req.params.id

        );



        if(!order){


            return res.status(404).json({

                success:false,

                message:"Order not found"

            });


        }



        const {

            orderStatus

        } = req.body;


const allowedStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
    "Cancelled"
];

        if(

            !allowedStatus.includes(orderStatus)

        ){


            return res.status(400).json({

                success:false,

                message:"Invalid order status"

            });


        }





        order.orderStatus = orderStatus;




        // Payment update

        if(

            orderStatus === "Delivered"

        ){


            order.paymentStatus = "Paid";


        }




        await order.save();




        res.status(200).json({


            success:true,


            message:"Order status updated successfully",


            order



        });



    }


    catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });


    }


};





// ======================================
// ADMIN - ORDER STATISTICS
// ======================================


export const getOrderStats = async(req,res)=>{


    try{


        const totalOrders = await Order.countDocuments();



        const deliveredOrders = await Order.countDocuments({

            orderStatus:"Delivered"

        });



        const pendingOrders = await Order.countDocuments({

            orderStatus:"Processing"

        });



        const cancelledOrders = await Order.countDocuments({

            orderStatus:"Cancelled"

        });



        const shippedOrders = await Order.countDocuments({

            orderStatus:"Shipped"

        });




        const revenueData = await Order.aggregate([


            {

                $match:{

                    orderStatus:"Delivered"

                }

            },


            {

                $group:{


                    _id:null,


                    totalRevenue:{

                        $sum:"$totalAmount"

                    }


                }


            }


        ]);



        const totalRevenue =

        revenueData.length > 0

        ?

        revenueData[0].totalRevenue

        :

        0;




        res.status(200).json({


            success:true,


            statistics:{


                totalOrders,


                deliveredOrders,


                pendingOrders,


                shippedOrders,


                cancelledOrders,


                totalRevenue


            }


        });



    }


    catch(error){


        res.status(500).json({


            success:false,

            message:error.message


        });


    }


};





// ======================================
// ADMIN - MONTHLY SALES REPORT
// ======================================


export const getMonthlySales = async(req,res)=>{


    try{


        const sales = await Order.aggregate([



            {

                $match:{


                    orderStatus:"Delivered"


                }


            },


            {


                $group:{


                    _id:{


                        month:{

                            $month:"$createdAt"

                        },


                        year:{

                            $year:"$createdAt"

                        }


                    },


                    totalSales:{


                        $sum:"$totalAmount"


                    },


                    totalOrders:{


                        $sum:1


                    }


                }


            },



            {


                $sort:{


                    "_id.year":1,


                    "_id.month":1


                }


            }



        ]);




        res.status(200).json({


            success:true,


            sales



        });



    }


    catch(error){


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};


// ======================================
// ADMIN - TOP SELLING PRODUCTS
// ======================================


export const getTopProducts = async(req,res)=>{


    try{


        const products = await Order.aggregate([



            {

                $match:{

                    orderStatus:"Delivered"

                }

            },



            {

                $unwind:

                "$orderItems"

            },



            {


                $group:{


                    _id:"$orderItems.product",


                    totalSold:{


                        $sum:"$orderItems.quantity"


                    }


                }


            },



            {

                $sort:{


                    totalSold:-1


                }

            },


            {


                $limit:10


            },



            {


                $lookup:{


                    from:"products",


                    localField:"_id",


                    foreignField:"_id",


                    as:"product"


                }


            },


            {


                $unwind:"$product"


            }


        ]);




        res.status(200).json({


            success:true,


            products



        });



    }


    catch(error){


        res.status(500).json({


            success:false,

            message:error.message


        });


    }


};



// ======================================
// ADMIN - RECENT ORDERS
// ======================================


export const getRecentOrders = async(req,res)=>{


    try{


        const orders = await Order.find()


        .populate(

            "user",

            "name email"

        )


        .populate(

            "orderItems.product",

            "name price images"

        )


        .sort({

            createdAt:-1

        })


        .limit(5);




        res.status(200).json({


            success:true,


            orders



        });



    }


    catch(error){


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};

export const updatePaymentStatus = async(req,res)=>{

    try{

        const { paymentStatus } = req.body;

const allowedPaymentStatus = [

    "Pending",

    "Paid",

    "Refunded"

];


if(!allowedPaymentStatus.includes(paymentStatus)){

    return res.status(400).json({

        success:false,

        message:"Invalid payment status"

    });

}

        const order = await Order.findById(
            req.params.id
        );


        if(!order){

            return res.status(404).json({

                success:false,
                message:"Order not found"

            });

        }


        order.paymentStatus = paymentStatus;


        await order.save();


        res.status(200).json({

            success:true,

            message:"Payment Updated",

            order

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};