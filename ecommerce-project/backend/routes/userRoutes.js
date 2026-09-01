import express from "express";


import {

    registerUser,

    verifyOTP,

    loginUser,

    getProfile,

    updateProfile,

    uploadProfileImage,

    deleteAccount,
        deleteAllUsers,

    forgotPassword,

    resetPassword,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUserByAdmin


} from "../controllers/userController.js";



import {
    protect,
    authorize
} from "../middleware/authMiddleware.js";



import upload from "../middleware/uploadMiddleware.js";



const router = express.Router();



// =============================
// AUTH ROUTES
// =============================



// Register

router.post(

    "/register",

    registerUser

);



// Verify OTP

router.post(

    "/verify-otp",

    verifyOTP

);



// Login

router.post(

    "/login",

    loginUser

);





// =============================
// PROFILE ROUTES
// =============================



// Get Profile

router.get(

    "/profile",

    protect,

    getProfile

);



// Update Profile

router.put(

    "/profile",

    protect,

    updateProfile

);





// Upload Profile Image

router.put(

    "/profile-image",

    protect,

    upload.single("image"),

    uploadProfileImage

);



// Delete Account

router.delete(

    "/delete-account",

    protect,

    deleteAccount

);





// =============================
// PASSWORD ROUTES
// =============================



// Forgot Password

router.post(

    "/forgot-password",

    forgotPassword

);




// Reset Password

router.put(

    "/reset-password/:token",

    resetPassword

);



// Delete all users (testing)

router.delete(
    "/delete-all",
    protect,
    authorize("admin"),
    deleteAllUsers
);


router.get(
    "/",
    protect,
    authorize("admin"),
    getAllUsers
);


router.put(

"/:id/role",

protect,

authorize("admin"),

updateUserRole

);


router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUserByAdmin
);


router.get(
    "/:id",
    protect,
    authorize("admin"),
    getUserById
);

export default router;

