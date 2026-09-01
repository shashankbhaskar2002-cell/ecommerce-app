import cloudinary from "../config/cloudinary.js";

import streamifier from "streamifier";



const uploadImage = (

    file,

    folder="ecommerce"

)=>{


    return new Promise(

        (resolve,reject)=>{


            const stream =
            cloudinary.uploader.upload_stream(


                {

                    folder

                },


                (error,result)=>{


                    if(error){


                        reject(error);


                    }

                    else{


                        resolve({

                            url:
                            result.secure_url,


                            publicId:
                            result.public_id


                        });


                    }


                }


            );



            streamifier

            .createReadStream(
                file.buffer
            )

            .pipe(stream);



        }

    );


};



export default uploadImage;