import Product from "../models/Product.js";

import deleteImage from "../utils/deleteImage.js";
import uploadImage from "../utils/uploadImage.js";



// =================================
// CREATE PRODUCT
// =================================

export const createProduct = async (req, res) => {

    try {


        const {

            name,
            description,
            price,
            category,
            stock

        } = req.body;



        // Required fields validation

        if(

            !name ||
            !description ||
            !price ||
            !category ||
            stock === undefined

        ){

            return res.status(400).json({

                success:false,

                message:"All fields are required."

            });

        }



        // Price validation

        if(price <= 0){

            return res.status(400).json({

                success:false,

                message:"Price must be greater than zero."

            });

        }



        // Stock validation

        if(stock < 0){

            return res.status(400).json({

                success:false,

                message:"Stock cannot be negative."

            });

        }



        // Image validation

        if(

            !req.files ||
            req.files.length === 0

        ){

            return res.status(400).json({

                success:false,

                message:"Please upload product images."

            });

        }



        let images = [];



        // Upload images to Cloudinary

        for(const file of req.files){


            const uploadedImage =

            await uploadImage(

                file,

                "products"

            );



            images.push({

                url:uploadedImage.url,

                publicId:uploadedImage.publicId

            });


        }




        const product = await Product.create({

            name,

            description,

            price,

            category,

            stock,

            images,

            createdBy:req.user._id

        });





        res.status(201).json({

            success:true,

            message:"Product created successfully.",

            product

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
// GET ALL PRODUCTS
// SEARCH + FILTER + PAGINATION
// =================================

export const getAllProducts = async(req,res)=>{

    try{

        const {

            keyword = "",
            category = "",
            minPrice,
            maxPrice,
            rating,
            inStock,
            sort,
            page = 1,
            limit = 10

        } = req.query;


        const skip = (Number(page)-1) * Number(limit);


        let filter = {};
        let sortOption = {};


        // Search

        if(keyword){

            filter.name = {

                $regex: keyword,

                $options:"i"

            };

        }



        // Category Filter

        if(category && category !== "All"){

            filter.category = category;

        }



        // Price Filter

        if(minPrice || maxPrice){

            filter.price = {};


            if(minPrice){

                filter.price.$gte = Number(minPrice);

            }


            if(maxPrice){

                filter.price.$lte = Number(maxPrice);

            }

        }



        // Rating Filter

        if(rating){

            filter.ratings = {

                $gte:Number(rating)

            };

        }



        // Stock Filter

        if(inStock === "true"){

            filter.stock = {

                $gt:0

            };

        }




        // Sorting

        if(sort==="price_asc"){

            sortOption.price = 1;

        }

        else if(sort==="price_desc"){

            sortOption.price = -1;

        }

        else if(sort==="latest"){

            sortOption.createdAt = -1;

        }



        const totalProducts = await Product.countDocuments(filter);



        const products = await Product.find(filter)

        .sort(sortOption)

        .skip(skip)

        .limit(Number(limit));




        res.status(200).json({

            success:true,

            products,

            totalProducts,

            currentPage:Number(page),

            totalPages:Math.ceil(

                totalProducts / Number(limit)

            )

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
// GET SINGLE PRODUCT
// =================================


export const getSingleProduct = async(req,res)=>{


    try{


        const product =

        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found."

            });


        }




        res.status(200).json({

            success:true,

            product

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
// DELETE PRODUCT
// =================================


export const deleteProduct = async(req,res)=>{


    try{


        const product =

        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found."

            });


        }




        // Ownership check

        if(

            product.createdBy.toString()

            !==

            req.user._id.toString()

        ){


            return res.status(403).json({

                success:false,

                message:"You cannot delete this product."

            });


        }





        // Delete Cloudinary images

        for(const image of product.images){


            await deleteImage(

                image.publicId

            );


        }





        await Product.findByIdAndDelete(

            req.params.id

        );






        res.status(200).json({

            success:true,

            message:"Product deleted successfully."

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
// UPDATE PRODUCT
// TEXT + IMAGE UPDATE
// =================================


export const updateProduct = async(req,res)=>{


    try{


        const product =

        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found."

            });


        }





        // Ownership check

       




        // Update fields


        product.name =

        req.body.name || product.name;



        product.description =

        req.body.description || product.description;



        product.price =

        req.body.price || product.price;



        product.category =

        req.body.category || product.category;



        product.stock =

        req.body.stock || product.stock;






        // Update Images

        if(

            req.files &&

            req.files.length > 0

        ){



            // Delete old images

            for(const image of product.images){


                await deleteImage(

                    image.publicId

                );


            }





            let newImages=[];





            for(const file of req.files){



                const uploadedImage =

                await uploadImage(

                    file,

                    "products"

                );




                newImages.push({

                    url:uploadedImage.url,

                    publicId:uploadedImage.publicId

                });


            }





            product.images = newImages;


        }





        await product.save();






        res.status(200).json({

            success:true,

            message:"Product updated successfully.",

            product

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
// SEARCH PRODUCTS
// =================================

export const searchProducts = async(req,res)=>{

    try{

        const keyword = req.query.keyword;


        if(!keyword){

            return res.json({

                success:true,

                products:[]

            });

        }


        const products = await Product.find({

            $or:[

                {
                    name:{
                        $regex:keyword,
                        $options:"i"
                    }
                },

                {
                    category:{
                        $regex:keyword,
                        $options:"i"
                    }
                }

            ]

        });



        res.json({

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


export const bulkDeleteProducts = async(req,res)=>{

    try{


        const {ids} = req.body;



        // Validation

        if(!ids || ids.length === 0){

            return res.status(400).json({

                success:false,

                message:"Please select products."

            });

        }



        // Pehle products nikalo

        const products = await Product.find({

            _id:{
                $in:ids
            }

        });



        // Cloudinary images delete karo

        for(const product of products){


            for(const image of product.images){


                await deleteImage(

                    image.publicId

                );


            }


        }




        // Ab MongoDB se products delete karo

        await Product.deleteMany({

            _id:{
                $in:ids
            }

        });




        res.status(200).json({

            success:true,

            message:"Products deleted successfully."

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};