import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

//routes import
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'

const app = express();
dotenv.config({ path: `config/config.env` })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// error middleware
app.use(errorMiddleware);

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});