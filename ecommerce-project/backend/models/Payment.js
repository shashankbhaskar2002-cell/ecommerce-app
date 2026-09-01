import mongoose from "mongoose";



const paymentSchema = new mongoose.Schema(

{

    user:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"User",


        required:true


    },



    order:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"Order",


        required:true


    },



    // Razorpay Order ID
    // Created when payment starts

    razorpayOrderId:{


        type:String,


        default:""


    },




    // Razorpay Payment ID
    // Received after successful payment

    razorpayPaymentId:{


        type:String,


        default:""


    },




    // Transaction Reference

    transactionId:{


        type:String,


        default:""


    },




    paymentMethod:{


        type:String,


        enum:[

            "Razorpay",

            "COD"

        ],


        default:"Razorpay"


    },




    amount:{


        type:Number,


        required:true


    },




    currency:{


        type:String,


        default:"INR"


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


    }



},


{

    timestamps:true

}


);





const Payment = mongoose.model(

    "Payment",

    paymentSchema

);



export default Payment;