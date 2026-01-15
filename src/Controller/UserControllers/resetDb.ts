import { Request, Response } from "express";
import { success_res } from "../ErrorHandleController";
import mongoose from "mongoose";

export const resetDBcontrollar = async (req: Request, res: Response) => {
  await mongoose.connection.dropDatabase().then(() => {
    success_res(res, { statusCode: 200, message: "reset db successfully" });
  });
};
