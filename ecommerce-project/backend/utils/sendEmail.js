import nodemailer from "nodemailer";


const sendEmail = async(options)=>{

    console.log("Received email data:", options);


    const transporter =
    nodemailer.createTransport({

        service:"gmail",

        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }

    });


    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: options.email,

        subject: options.subject,

        text: options.message

    };


    console.log("Sending mail:", mailOptions);


    await transporter.sendMail(mailOptions);

};


export default sendEmail;