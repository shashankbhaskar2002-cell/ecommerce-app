import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true,

            trim: true

        },


        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },



phone: {

    type: String,

    default: "",

    trim: true

},


        password: {

            type: String,

            required: true,

            minlength: 6

        },


        role: {

            type: String,

            enum: [
                "user",
                "admin"
            ],

            default: "user"

        },


        isVerified: {

            type: Boolean,

            default: false

        },


        otp: {

            type: String,

            default: null

        },


        otpExpire: {

            type: Date,

            default: null

        },


        resetPasswordToken: {

            type: String,

            default: null

        },


        resetPasswordExpire: {

            type: Date,

            default: null

        },


        profileImage: {

            url: {

                type: String,

                default: ""

            },


            publicId: {

                type: String,

                default: ""

            }

        }


    },


    {

        timestamps:true

    }


);



const User = mongoose.model(

    "User",

    userSchema

);



export default User;