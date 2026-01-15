import mongoose from "mongoose";
import "dotenv/config";
const db_url = process.env.DB_URL;

const mongoDVConFunction = async () => {
  try {
    if (!db_url) {
      const error = new Error("db url is not found from evn file") as Error & {
        statusCode: number;
      };
      error.statusCode = 400;

      throw error;
    }
    await mongoose.connect(db_url);
    console.log("mongodb is connected");
  } catch (error) {
    throw error;
  }
};

export { mongoDVConFunction };
