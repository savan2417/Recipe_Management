import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://savanrathod1701:<db_password>@cluster0.sgxqs.mongodb.net/recipe_management?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`Mongo db connected`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;