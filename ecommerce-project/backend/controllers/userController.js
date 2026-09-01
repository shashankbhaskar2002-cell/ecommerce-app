import bcrypt from "bcryptjs";

import crypto from "crypto";

import User from "../models/User.js";

import generateOTP from "../utils/generateOTP.js";

import generateToken from "../utils/generateToken.js";

import sendEmail from "../utils/sendEmail.js";

import uploadImage from "../utils/uploadImage.js";

import deleteImage from "../utils/deleteImage.js";



// =================================
// REGISTER USER
// =================================

export const registerUser = async (req, res) => {


    try {


        const {
            name,
            email,
            password
        } = req.body;



        const existingUser =
            await User.findOne({ email });



        if (existingUser) {


            return res.status(400).json({

                success: false,

                message: "User already exists"

            });


        }



        const hashedPassword =
            await bcrypt.hash(

                password,

                10

            );



        const otp =
            generateOTP();



        const user =
            await User.create({

                name,

                email,

                password: hashedPassword,

                otp,

                otpExpire:
                    Date.now() + 10 * 60 * 1000

            });

        console.log("Created User:", user);

        await sendEmail({


            email: user.email,


            subject: "Verify Your Account",


            message:
                `Your OTP is ${otp}`


        });



        res.status(201).json({


            success: true,


            message:
                "Registration successful. Verify OTP."


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
// VERIFY OTP
// =================================

export const verifyOTP = async (req, res) => {


    try {


        const {
            email,
            otp
        } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {


            return res.status(404).json({

                success: false,

                message: "User not found"

            });


        }



        if (

            user.otp !== otp ||

            user.otpExpire < Date.now()

        ) {


            return res.status(400).json({

                success: false,

                message: "Invalid or expired OTP"

            });


        }



        user.isVerified = true;

        user.otp = null;

        user.otpExpire = null;



        await user.save();



        res.json({

            success: true,

            message: "Account verified"

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
// LOGIN USER
// =================================

export const loginUser = async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {


            return res.status(400).json({

                success: false,

                message: "Invalid credentials"

            });


        }



        const isMatch =
            await bcrypt.compare(

                password,

                user.password

            );



        if (!isMatch) {


            return res.status(400).json({

                success: false,

                message: "Invalid credentials"

            });


        }



        if (!user.isVerified) {


            return res.status(400).json({

                success: false,

                message: "Verify your account first"

            });


        }



        const token =
            generateToken(user._id);



        res.json({


            success: true,


            token,


            user: {


                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role


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




// =================================
// GET PROFILE
// =================================

export const getProfile = async (req, res) => {


    try {


        const user =
            await User.findById(req.user._id)
                .select("-password");



        res.json({

            success: true,

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




// =================================
// UPDATE PROFILE
// =================================

export const updateProfile = async (req, res) => {


    try {


        const user =
            await User.findById(req.user._id);



        user.name =
            req.body.name || user.name;



        user.email =
            req.body.email || user.email;


        user.phone =
            req.body.phone || user.phone;


        await user.save();



        res.json({

            success: true,

            message: "Profile updated",

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




// =================================
// UPLOAD PROFILE IMAGE
// =================================

export const uploadProfileImage = async (req, res) => {


    try {


        const user =
            await User.findById(req.user._id);



        if (!req.file) {


            return res.status(400).json({

                success: false,

                message: "Image required"

            });


        }



        if (user.profileImage.publicId) {


            await deleteImage(

                user.profileImage.publicId

            );


        }



        const image =
            await uploadImage(

                req.file,

                "profiles"

            );



        user.profileImage = {


            url: image.url,


            publicId: image.publicId


        };



        await user.save();



        res.json({

            success: true,

            message: "Profile image updated",

            image: user.profileImage

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
// DELETE ACCOUNT
// =================================

export const deleteAccount = async (req, res) => {


    try {


        const user =
            await User.findById(req.user._id);



        if (user.profileImage.publicId) {


            await deleteImage(

                user.profileImage.publicId

            );


        }



        await User.findByIdAndDelete(

            req.user._id

        );



        res.json({

            success: true,

            message: "Account deleted"

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
// FORGOT PASSWORD
// =================================

export const forgotPassword = async (req, res) => {


    try {


        const user =
            await User.findOne({

                email: req.body.email

            });



        if (!user) {


            return res.status(404).json({

                success: false,

                message: "User not found"

            });


        }



        const resetToken =
            crypto.randomBytes(20)
                .toString("hex");



        user.resetPasswordToken =
            resetToken;



        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;



        await user.save();



        await sendEmail({

            email: user.email,

            subject: "Password Reset",

            message:
                `Reset Token: ${resetToken}`

        });



        res.json({

            success: true,

            message: "Reset email sent"

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
// RESET PASSWORD
// =================================

export const resetPassword = async (req, res) => {


    try {


        const user =
            await User.findOne({

                resetPasswordToken:
                    req.params.token,


                resetPasswordExpire: {
                    $gt: Date.now()
                }

            });



        if (!user) {


            return res.status(400).json({

                success: false,

                message: "Invalid token"

            });


        }



        user.password =
            await bcrypt.hash(

                req.body.password,

                10

            );



        user.resetPasswordToken = null;

        user.resetPasswordExpire = null;



        await user.save();



        res.json({

            success: true,

            message: "Password reset successful"

        });



    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};

export const deleteAllUsers = async (req, res) => {

    try {

        await User.deleteMany({});

        res.json({
            success: true,
            message: "All users deleted"
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};





export const getAllUsers = async(req,res)=>{

try{


const page = Number(req.query.page) || 1;

const limit = 10;

const skip = (page-1)*limit;


const search = req.query.search || "";


const query = {

$or:[

{
name:{
$regex:search,
$options:"i"
}
},

{
email:{
$regex:search,
$options:"i"
}
}

]

};


const users = await User.find(query)

.select("-password -otp -otpExpire -resetPasswordToken -resetPasswordExpire")

.sort({
    createdAt:-1
})

.skip(skip)

.limit(limit);


const total = await User.countDocuments(query);


const verifiedUsers = await User.countDocuments({
isVerified:true
});


const admins = await User.countDocuments({
role:"admin"
});



res.json({

success:true,

users,

totalPages:Math.ceil(total/limit),

stats:{

totalUsers:total,

verifiedUsers,

admins

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



export const getUserById = async(req,res)=>{


try{


const user = await User.findById(
    req.params.id
)
.select(
"-password -otp -otpExpire -resetPasswordToken -resetPasswordExpire"
);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



res.status(200).json({

success:true,

user

});


}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};




export const updateUserRole = async(req,res)=>{

try{


const {role}=req.body;


if(!["user","admin"].includes(role)){

return res.status(400).json({

success:false,

message:"Invalid role"

});

}



const user = await User.findById(
req.params.id
);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



if(

req.user._id.toString() === user._id.toString()

&&

role==="user"

){

return res.status(400).json({

success:false,

message:"You cannot remove your own admin role"

});

}



user.role = role;


await user.save();



res.status(200).json({

success:true,

message:"Role updated successfully",

user

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

export const deleteUserByAdmin = async(req,res)=>{

try{


const user = await User.findById(
    req.params.id
);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



// Prevent self delete

if(
req.user._id.toString() === user._id.toString()
){

return res.status(400).json({

success:false,

message:"You cannot delete your own account"

});

}



// Delete Cloudinary Profile Image

if(user.profileImage?.publicId){

    await deleteImage(
        user.profileImage.publicId
    );

}



// Delete User From MongoDB

await user.deleteOne();



res.status(200).json({

success:true,

message:"User deleted successfully"

});


}


catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};