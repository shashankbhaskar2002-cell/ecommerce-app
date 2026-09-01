import sendEmail from "../utils/sendEmail.js";


export const testEmail = async(req,res)=>{

    try{


        await sendEmail({

            email:"shashankbhaskar2006@gmail.com",

            subject:"Test Email",

            message:"Ecommerce Backend Email Working Successfully"

        });


        res.status(200).json({

            success:true,

            message:"Email Sent Successfully"

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};