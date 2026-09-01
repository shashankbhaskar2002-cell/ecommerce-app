import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();


// Middlewares

app.use(express.json());

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(cookieParser());



// Routes

app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/products",
    productRoutes
);

app.use(

    "/api/cart",

    cartRoutes

);



app.use( "/api/address",addressRoutes);





app.use(

    "/api/orders",

    orderRoutes

);


app.use(

"/api/payment",

paymentRoutes

);


app.use(

"/api/reviews",

reviewRoutes

);




app.use(

"/api/wishlist",

wishlistRoutes

);





app.use("/api/admin", adminRoutes);


// Default Route

app.get("/",(req,res)=>{

    res.send(
        "E-Commerce Backend Running Successfully"
    );

});



// Error Middleware
// ALWAYS LAST

app.use(errorMiddleware);




export default app;