import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose Connected");
    }).catch((error) => {
        console.log(error);
    });
}

export default connectDB