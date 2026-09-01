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

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ecommerce-frontend-1lxe.onrender.com"
];

const corsOptions = {
    origin: function (origin, callback) {

        // Allow requests without an Origin
        // Example: Postman, server-to-server requests
        if (!origin) {
            return callback(null, true);
        }

        // Allow only trusted frontend origins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.log("Blocked CORS origin:", origin);

        return callback(
            new Error(`CORS Error: Origin ${origin} is not allowed`)
        );
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
};

// Apply CORS
app.use(cors(corsOptions));

// IMPORTANT:
// Do NOT use:
// app.options("*", cors(corsOptions))
//
// Express 5 + path-to-regexp can cause:
// PathError: Missing parameter name at index 1: *
// =====================================================


// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// =====================================================
// COOKIE PARSER
// =====================================================

app.use(cookieParser());


// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Commerce Backend Running Successfully"
    });
});


// =====================================================
// API ROUTES
// =====================================================

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

app.use(
    "/api/address",
    addressRoutes
);

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

app.use(
    "/api/admin",
    adminRoutes
);


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});


// =====================================================
// ERROR MIDDLEWARE
// MUST BE LAST
// =====================================================

app.use(errorMiddleware);


// =====================================================
// EXPORT APP
// =====================================================

export default app;