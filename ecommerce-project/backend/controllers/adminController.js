import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import Wishlist from "../models/Wishlist.js";
import deleteImage from "../utils/deleteImage.js";

// ======================================
// ADMIN DASHBOARD
// ======================================

export const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalReviews = await Review.countDocuments();

        const totalWishlist = await Wishlist.countDocuments();
        // Recent Orders

        const recentOrders = await Order.find()

            .populate(
                "user",
                "name email"
            )

            .sort({
                createdAt: -1
            })

            .limit(5);



        // Latest Users

        const latestUsers = await User.find()

            .select(
                "name email createdAt"
            )

            .sort({
                createdAt: -1
            })

            .limit(5);




        // Low Stock Products

        const lowStockProducts = await Product.find({

            stock: {
                $lte: 5
            }

        })

            .select(
                "name stock price"
            )

            .sort({

                stock: 1

            })

            .limit(5);


        const revenue = await Order.aggregate([

            {

                $match: {

                    paymentStatus: "Paid"

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalAmount"

                    }

                }

            }

        ]);


        res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalProducts,

                totalOrders,

                totalReviews,

                totalWishlist,

                totalRevenue:

                    revenue.length > 0

                        ? revenue[0].totalRevenue

                        : 0

            }

        });
        recentOrders,

            latestUsers,

            lowStockProducts
    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// ADMIN - GET ALL USERS
// ======================================

export const getAllUsers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = 10;

        const keyword = req.query.keyword || "";

        let searchQuery = {};

        if (keyword) {

            searchQuery.$or = [

                {

                    name: {

                        $regex: keyword,

                        $options: "i"

                    }

                },

                {

                    email: {

                        $regex: keyword,

                        $options: "i"

                    }

                }

            ];

        }

        const totalUsers = await User.countDocuments(searchQuery);

        const users = await User.find(searchQuery)

            .select("-password")

            .sort({

                createdAt: -1

            })

            .skip((page - 1) * limit)

            .limit(limit);

        res.status(200).json({

            success: true,

            totalUsers,

            currentPage: page,

            totalPages: Math.ceil(totalUsers / limit),

            users

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
// ADMIN - UPDATE USER ROLE
// ======================================

export const updateUserRole = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const { role } = req.body;

        const allowedRoles = [

            "user",

            "admin"

        ];

        if (!allowedRoles.includes(role)) {

            return res.status(400).json({

                success: false,

                message: "Invalid role"

            });

        }

        user.role = role;

        await user.save();

        res.status(200).json({

            success: true,

            message: "User role updated successfully",

            user

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
// ADMIN - DELETE USER
// ======================================

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }


        // Admin cannot delete himself

        if (

            user._id.toString()

            ===

            req.user._id.toString()

        ) {

            return res.status(400).json({

                success: false,

                message: "You cannot delete your own account."

            });

        }


        // Delete Profile Image

        if (

            user.profileImage &&

            user.profileImage.publicId

        ) {

            await deleteImage(

                user.profileImage.publicId

            );

        }


        await User.findByIdAndDelete(

            req.params.id

        );


        res.status(200).json({

            success: true,

            message: "User deleted successfully."

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
// ADMIN - PRODUCT ANALYTICS
// ======================================

export const getProductAnalytics = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        // Category Wise Products
        const categoryAnalytics = await Product.aggregate([

            {

                $group: {

                    _id: "$category",

                    totalProducts: {

                        $sum: 1

                    }

                }

            },

            {

                $sort: {

                    totalProducts: -1

                }

            }

        ]);


        // Out Of Stock
        const outOfStockProducts = await Product.find({

            stock: 0

        }).select(

            "name stock price"

        );


        // Low Stock
        const lowStockProducts = await Product.find({

            stock: {

                $gt: 0,

                $lte: 5

            }

        }).select(

            "name stock price"

        );


        // Top Rated Products
        const topRatedProducts = await Product.find()

            .sort({

                averageRating: -1

            })

            .limit(5)

            .select(

                "name price averageRating totalReviews"

            );


        res.status(200).json({

            success: true,

            analytics: {

                totalProducts,

                categoryAnalytics,

                outOfStockProducts,

                lowStockProducts,

                topRatedProducts

            }

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
// ADMIN - ORDER ANALYTICS
// ======================================

export const getOrderAnalytics = async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        const processingOrders =
            await Order.countDocuments({
                orderStatus: "Processing"
            });

        const shippedOrders =
            await Order.countDocuments({
                orderStatus: "Shipped"
            });

        const deliveredOrders =
            await Order.countDocuments({
                orderStatus: "Delivered"
            });

        const cancelledOrders =
            await Order.countDocuments({
                orderStatus: "Cancelled"
            });


        const revenue = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }

        ]);


        const monthlySales = await Order.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {

                    _id: {
                        year: {
                            $year: "$createdAt"
                        },

                        month: {
                            $month: "$createdAt"
                        }
                    },

                    revenue: {
                        $sum: "$totalAmount"
                    },

                    totalOrders: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }

        ]);


        res.status(200).json({

            success: true,

            analytics: {

                totalOrders,

                processingOrders,

                shippedOrders,

                deliveredOrders,

                cancelledOrders,

                totalRevenue:

                    revenue.length > 0
                        ? revenue[0].totalRevenue
                        : 0,

                monthlySales

            }

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
// ADMIN DASHBOARD WIDGETS
// ======================================

export const getDashboardWidgets = async (req,res)=>{

    try{


        const recentOrders = await Order.find()

        .populate(
            "user",
            "name email"
        )

        .sort({
            createdAt:-1
        })

        .limit(5);



        const latestUsers = await User.find()

        .select(
            "name email createdAt"
        )

        .sort({
            createdAt:-1
        })

        .limit(5);



        const lowStockProducts = await Product.find({

            stock:{
                $lte:5
            }

        })

        .select(
            "name stock price"
        )

        .limit(5);



        res.status(200).json({

            success:true,

            widgets:{

                recentOrders,

                latestUsers,

                lowStockProducts

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