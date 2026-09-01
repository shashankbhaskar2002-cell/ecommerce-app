import mongoose from "mongoose";


const productSchema = new mongoose.Schema(

{

    name:{

        type:String,

        required:true,

        trim:true

    },


    description:{

        type:String,

        required:true

    },


    price:{

        type:Number,

        required:true

    },


    category:{

        type:String,

        required:true

    },


    stock:{

        type:Number,

        required:true,

        default:0

    },


    images:[

        {

            url:{

                type:String,

                required:true

            },


            publicId:{

                type:String,

                required:true

            }

        }

    ],



    // Average Product Rating

    ratings:{

        type:Number,

        default:0

    },


    // Total Number Of Reviews

    numReviews:{

        type:Number,

        default:0

    },



    createdBy:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    }



},

{

    timestamps:true

}

);




// ======================================
// CALCULATE PRODUCT RATINGS
// ======================================

productSchema.methods.calculateRatings = async function(){


    const Review = mongoose.model("Review");



    const reviews = await Review.find({

        product:this._id

    });



    let totalRating = 0;



    reviews.forEach((review)=>{


        totalRating += review.rating;


    });




    if(reviews.length === 0){


        this.ratings = 0;


        this.numReviews = 0;


    }

    else{


        this.ratings =

        totalRating / reviews.length;



        this.numReviews =

        reviews.length;


    }



    await this.save();


};





const Product = mongoose.model(

    "Product",

    productSchema

);



export default Product;