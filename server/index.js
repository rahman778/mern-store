//import dotenv from 'dotenv'
import * as dotenv from 'dotenv';
//import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import nodemailer from 'nodemailer'
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import path from 'path'
import url from 'url';
dotenv.config({ path: path.resolve('./config/config.env') })

//routes import
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'

const app = express();
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

// error middleware
app.use(errorMiddleware);

//connectDB();

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});