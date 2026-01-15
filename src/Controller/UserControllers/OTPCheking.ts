import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import "dotenv/config";
import { error_res, success_res } from "../ErrorHandleController";
import jwt from "jsonwebtoken";
export const otpCheckerController = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req?.body;
    const otpUser: any = await UserModel.findOne({ email });
    if (!otpUser) {
      error_res(res, { statusCode: 404, message: "user not valid" });
      return;
    }
    if (!(otpUser?.OTP?.value == otp)) {
      error_res(res, { statusCode: 400, message: "otp not valid" });
      return;
    }
    if (new Date(otpUser?.OTP?.createAT).getTime() < Date.now()) {
      error_res(res, { statusCode: 408, message: "expire otp" });
      return;
    }

    const token = jwt.sign(
      { otp, email },
      process.env.SECRETEKEYJWT! as string,
      {
        expiresIn: "5m",
      }
    );
    success_res(res, {
      statusCode: 200,
      message: "otp valid",
      payload: { token },
    });
  } catch (error: any) {
    console.log(error);
    
    error_res(res, { statusCode: error?.status, message: error?.message });
  }
};
