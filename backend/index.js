import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import pizzaRoute from './routes/pizzaRoute.js'
import authRoute from './routes/authRoute.js'
import cartRoute from './routes/cartRoute.js'
import couponRoute from './routes/couponRoute.js'
import orderRoute from './routes/orderRoute.js'


const app = express();

dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;
const URL_ = process.env.URL_;
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: `${FRONTEND}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use('/api/pizza',pizzaRoute);
app.use('/api/auth',authRoute);
app.use('/api/cart',cartRoute);
app.use('/api/coupon',couponRoute)
app.use('/api/order',orderRoute)

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
  console.log(`You can check => ${URL_}`);
});
