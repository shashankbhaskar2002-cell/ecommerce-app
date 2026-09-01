import cloudinary from "../config/cloudinary.js";


const deleteImage = async(publicId)=>{


    if(!publicId){

        return;

    }



    await cloudinary.uploader.destroy(

        publicId

    );


};



export default deleteImage;