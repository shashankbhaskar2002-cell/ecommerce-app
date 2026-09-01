import "dotenv/config";
import connectDB from "./config/db.js";

const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});