import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    conn && console.log("DB Connected!");
  } catch (error) {
    console.log(error);
  }
};
