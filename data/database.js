import mongoose from "mongoose";

export const connectDB = () =>mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "apna_store",
  })
  .then((c) => console.log(`Database connected on ${c.connection.host}`))
  .catch((e) => console.log(e));
