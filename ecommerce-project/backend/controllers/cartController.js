import Cart from "../models/Cart.js";
import Product from "../models/Product.js";



// =================================
// ADD PRODUCT TO CART
// =================================

export const addToCart = async(req,res)=>{


    try{


        const {

            productId,

            quantity

        } = req.body;



        // Product check

        const product = await Product.findById(

            productId

        );



        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found"

            });


        }




        // Find user's cart

        let cart = await Cart.findOne({

            user:req.user._id

        });





        // If cart does not exist

        if(!cart){


            cart = await Cart.create({

                user:req.user._id,

                items:[

                    {

                        product:productId,

                        quantity:quantity || 1

                    }

                ]

            });



        }



        else{


            // Check product already exists

            const itemIndex = cart.items.findIndex(

                item =>

                item.product.toString()

                ===

                productId

            );





            if(itemIndex > -1){


                // Update quantity

                cart.items[itemIndex].quantity +=

                quantity || 1;


            }


            else{


                // Add new product


                cart.items.push({

                    product:productId,

                    quantity:quantity || 1

                });


            }



        }





        // Calculate total price


        let totalPrice = 0;



        for(const item of cart.items){


            const itemProduct =

            await Product.findById(

                item.product

            );


            totalPrice +=

            itemProduct.price *

            item.quantity;


        }



        cart.totalPrice = totalPrice;




        await cart.save();





        res.status(200).json({

            success:true,

            message:"Product added to cart",

            cart

        });



    }



    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};



// =================================
// GET USER CART
// =================================


export const getCart = async(req,res)=>{


    try{


        const cart = await Cart.findOne({

            user:req.user._id

        })

        .populate(

            "items.product"

        );





        if(!cart){


            return res.status(200).json({

                success:true,

                message:"Cart is empty",

                cart:{

                    items:[],

                    totalPrice:0

                }

            });


        }





        res.status(200).json({

            success:true,

            cart

        });



    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

// =================================
// UPDATE CART QUANTITY
// =================================

export const updateCartQuantity = async (req, res) => {

    try {

        const {

            productId,

            quantity

        } = req.body;



        // Validation

        if (!productId || quantity < 1) {

            return res.status(400).json({

                success: false,

                message: "Valid productId and quantity are required."

            });

        }



        // Find Cart

        const cart = await Cart.findOne({

            user: req.user._id

        });



        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart not found."

            });

        }



        // Find Product in Cart

        const cartItem = cart.items.find(

            item =>

                item.product.toString() === productId

        );



        if (!cartItem) {

            return res.status(404).json({

                success: false,

                message: "Product not found in cart."

            });

        }



        // Update Quantity

        cartItem.quantity = quantity;



        // Recalculate Total Price

        let totalPrice = 0;



        for (const item of cart.items) {

            const product = await Product.findById(

                item.product

            );



            totalPrice +=

                product.price *

                item.quantity;

        }



        cart.totalPrice = totalPrice;



        await cart.save();



        res.status(200).json({

            success: true,

            message: "Cart updated successfully.",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =================================
// REMOVE PRODUCT FROM CART
// =================================

export const removeFromCart = async (req, res) => {

    try {

        const { productId } = req.params;

        // Find User Cart

        const cart = await Cart.findOne({

            user: req.user._id

        });

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart not found."

            });

        }

        // Product Exists?

        const productExists = cart.items.some(

            item =>

                item.product.toString() === productId

        );

        if (!productExists) {

            return res.status(404).json({

                success: false,

                message: "Product not found in cart."

            });

        }

        // Remove Product

        cart.items = cart.items.filter(

            item =>

                item.product.toString() !== productId

        );

        // Recalculate Total

        let totalPrice = 0;

        for (const item of cart.items) {

            const product = await Product.findById(

                item.product

            );

            totalPrice +=

                product.price *

                item.quantity;

        }

        cart.totalPrice = totalPrice;

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Product removed from cart.",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// =================================
// CLEAR CART
// =================================

export const clearCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({

            user: req.user._id

        });

        if (!cart) {

            return res.status(404).json({

                success: false,

                message: "Cart not found."

            });

        }

        // Remove all products

        cart.items = [];

        // Reset total price

        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Cart cleared successfully.",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};