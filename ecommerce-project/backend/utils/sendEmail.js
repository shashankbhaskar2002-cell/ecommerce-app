import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    console.log("Received email data:", options);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },

        family: 4
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    console.log("Sending mail:", {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
    });

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("EMAIL SENT SUCCESSFULLY");
        console.log("Message ID:", info.messageId);

        return info;

    } catch (error) {
        console.error("EMAIL SENDING FAILED");
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);

        throw error;
    }
};

export default sendEmail;