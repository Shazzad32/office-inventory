import mongoose from "mongoose";

let isConnected = false;

console.log(process.env.MONGODB_URI);

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is Already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "inventoryDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};
