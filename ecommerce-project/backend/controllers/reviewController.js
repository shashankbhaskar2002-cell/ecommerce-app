import Review from "../models/Review.js";

import Product from "../models/Product.js";



// ======================================
// CREATE PRODUCT REVIEW
// ======================================

export const createReview = async(req,res)=>{


    try{


        const {

            productId,

            rating,

            comment

        } = req.body;




        if(!productId || !rating || !comment){


            return res.status(400).json({


                success:false,


                message:"All fields are required"


            });


        }





        const product = await Product.findById(

            productId

        );



        if(!product){


            return res.status(404).json({


                success:false,


                message:"Product not found"


            });


        }





        // Check duplicate review


        const existingReview = await Review.findOne({


            user:req.user._id,


            product:productId


        });




        if(existingReview){


            return res.status(400).json({


                success:false,


                message:"You already reviewed this product"


            });


        }





        const review = await Review.create({


            user:req.user._id,


            product:productId,


            rating,


            comment


        });






        // Calculate Product Rating

        await product.calculateRatings();





        res.status(201).json({


            success:true,


            message:"Review added successfully",


            review


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
// GET PRODUCT REVIEWS
// ======================================


export const getProductReviews = async(req,res)=>{


    try{


        const reviews = await Review.find({


            product:req.params.id


        })


        .populate(


            "user",

            "name profileImage"


        )


        .sort({


            createdAt:-1


        });






        res.status(200).json({


            success:true,


            totalReviews:reviews.length,


            reviews


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
// UPDATE REVIEW
// ======================================


export const updateReview = async(req,res)=>{


    try{


        const review = await Review.findById(

            req.params.id

        );



        if(!review){


            return res.status(404).json({


                success:false,


                message:"Review not found"


            });


        }






        // Check Review Owner


        if(


            review.user.toString()

            !==

            req.user._id.toString()


        ){


            return res.status(403).json({


                success:false,


                message:"You can update only your review"


            });


        }






        review.rating =

        req.body.rating || review.rating;



        review.comment =

        req.body.comment || review.comment;






        await review.save();






        const product = await Product.findById(

            review.product

        );




        // Recalculate Rating

        await product.calculateRatings();







        res.status(200).json({


            success:true,


            message:"Review updated successfully",


            review



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
// DELETE REVIEW
// ======================================


export const deleteReview = async(req,res)=>{


    try{


        const review = await Review.findById(

            req.params.id

        );



        if(!review){


            return res.status(404).json({


                success:false,


                message:"Review not found"


            });


        }






        // Check Owner


        if(


            review.user.toString()

            !==

            req.user._id.toString()


        ){


            return res.status(403).json({


                success:false,


                message:"You can delete only your review"


            });


        }






        const productId = review.product;






        await Review.findByIdAndDelete(

            req.params.id

        );






        const product = await Product.findById(

            productId

        );




        // Recalculate Rating

        await product.calculateRatings();







        res.status(200).json({


            success:true,


            message:"Review deleted successfully"


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
// ADMIN - GET ALL REVIEWS
// ======================================


export const getAllReviewsAdmin = async(req,res)=>{


    try{


        const reviews = await Review.find()

        .populate(

            "user",

            "name email"

        )

        .populate(

            "product",

            "name price"

        )

        .sort({

            createdAt:-1

        });





        res.status(200).json({


            success:true,


            totalReviews:reviews.length,


            reviews



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
// ADMIN - DELETE ANY REVIEW
// ======================================


export const deleteReviewAdmin = async(req,res)=>{


    try{


        const review = await Review.findById(

            req.params.id

        );




        if(!review){


            return res.status(404).json({


                success:false,


                message:"Review not found"


            });


        }





        const productId = review.product;





        await Review.findByIdAndDelete(

            req.params.id

        );





        // Update Product Rating


        const product = await Product.findById(

            productId

        );




        await product.calculateRatings();





        res.status(200).json({


            success:true,


            message:"Review deleted by admin"


        });



    }


    catch(error){


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};