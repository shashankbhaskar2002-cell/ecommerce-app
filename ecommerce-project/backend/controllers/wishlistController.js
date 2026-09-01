import Wishlist from "../models/Wishlist.js";

import Product from "../models/Product.js";



// ======================================
// ADD PRODUCT TO WISHLIST
// ======================================


export const addToWishlist = async(req,res)=>{


    try{


        const {

            productId

        } = req.body;




        if(!productId){


            return res.status(400).json({


                success:false,


                message:"Product ID is required"


            });


        }





        // Check Product Exists


        const product = await Product.findById(

            productId

        );



        if(!product){


            return res.status(404).json({


                success:false,


                message:"Product not found"


            });


        }






        // Find User Wishlist


        let wishlist = await Wishlist.findOne({

            user:req.user._id

        });





        // Create Wishlist First Time


        if(!wishlist){


            wishlist = await Wishlist.create({


                user:req.user._id,


                products:[productId]


            });



        }

        else{



            // Duplicate Check


            const alreadyAdded =

            wishlist.products.includes(

                productId

            );





            if(alreadyAdded){


                return res.status(400).json({


                    success:false,


                    message:"Product already in wishlist"


                });


            }





            wishlist.products.push(

                productId

            );



            await wishlist.save();


        }





        res.status(200).json({


            success:true,


            message:"Product added to wishlist",


            wishlist



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
// GET USER WISHLIST
// ======================================


export const getWishlist = async(req,res)=>{


    try{


        const wishlist = await Wishlist.findOne({

            user:req.user._id

        })

        .populate(

            "products"

        );





        if(!wishlist){


            return res.status(200).json({


                success:true,


                products:[]



            });


        }





        res.status(200).json({


            success:true,


            wishlist



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
// REMOVE PRODUCT FROM WISHLIST
// ======================================


export const removeFromWishlist = async(req,res)=>{


    try{


        const productId = req.params.id;




        const wishlist = await Wishlist.findOne({

            user:req.user._id

        });





        if(!wishlist){


            return res.status(404).json({


                success:false,


                message:"Wishlist not found"


            });


        }





        // Remove Product


        wishlist.products =

        wishlist.products.filter(

            (product)=>


            product.toString() !== productId


        );





        await wishlist.save();





        res.status(200).json({


            success:true,


            message:"Product removed from wishlist",


            wishlist



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
// CLEAR USER WISHLIST
// ======================================


export const clearWishlist = async(req,res)=>{


    try{


        const wishlist = await Wishlist.findOne({

            user:req.user._id

        });





        if(!wishlist){


            return res.status(404).json({


                success:false,


                message:"Wishlist not found"


            });


        }





        wishlist.products = [];



        await wishlist.save();





        res.status(200).json({


            success:true,


            message:"Wishlist cleared successfully",


            wishlist



        });



    }


    catch(error){



        res.status(500).json({


            success:false,


            message:error.message


        });



    }


};