import mongoose from "mongoose";



const wishlistSchema = new mongoose.Schema(

{

    user:{


        type:mongoose.Schema.Types.ObjectId,


        ref:"User",


        required:true,


        unique:true


    },



    products:[

        {


            type:mongoose.Schema.Types.ObjectId,


            ref:"Product"


        }

    ]

},


{

    timestamps:true

}

);




// ======================================
// REMOVE DUPLICATE PRODUCTS
// ======================================


wishlistSchema.pre(

"save",

function(){



    this.products = [


        ...new Set(


            this.products.map(


                id => id.toString()


            )


        )


    ];



});





// ======================================
// MODEL
// ======================================


const Wishlist = mongoose.model(

    "Wishlist",

    wishlistSchema

);



export default Wishlist;