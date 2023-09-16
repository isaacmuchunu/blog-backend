import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected@${conn.connection.host} `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // If there's an error, kill the app
    process.exit(1);
  }
};

export default connectDB;
