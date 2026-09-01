import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(

{

    user:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"User",


        required:true


    },



    orderItems:[

        {

            product:{


                type:mongoose.Schema.Types.ObjectId,


                ref:"Product",


                required:true


            },



            quantity:{


                type:Number,


                required:true,


                min:1


            },



            price:{


                type:Number,


                required:true


            }

        }

    ],




    shippingAddress:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"Address",


        required:true


    },




    totalAmount:{


        type:Number,


        required:true,


        default:0


    },




    paymentMethod:{


        type:String,


        enum:[

            "COD",

            "Razorpay"

        ],


        default:"COD"


    },




    paymentStatus:{


        type:String,


        enum:[

            "Pending",

            "Paid",

            "Failed",

            "Refunded"

        ],


        default:"Pending"


    },




    orderStatus:{


        type:String,


        enum:[

            "Pending",

            "Processing",

            "Shipped",

            "Delivered",

            "Cancelled"

        ],


        default:"Pending"


    }


},


{


    timestamps:true


}


);



const Order = mongoose.model(

    "Order",

    orderSchema

);



export default Order;