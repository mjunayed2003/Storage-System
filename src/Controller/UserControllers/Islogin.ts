import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import UserModel from "../../models/UserModel";

export const Islogin = async (req: Request, res: Response) => {
  try {
    const user = req?.user;
    const userMain = await UserModel.findOne({ email: user?.email });
    
    success_res(res, {
      message: "user get successfully",
      statusCode: 200,
      payload: userMain,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 404, message: error.message });
  }
};
