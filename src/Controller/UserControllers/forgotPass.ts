import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import { SendMail } from "../../service/EmailerSender";
import UserModel from "../../models/UserModel";

export const forgotPass = async (req: Request, res: Response) => {
  try {
    const { email } = req?.body;
    console.log(email);
    console.log("geted");

    if (!email) {
      error_res(res, { statusCode: 404, message: "email required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      error_res(res, {
        statusCode: 404,
        message: "you wasn't register please register or give me right email",
      });
    }

    const OTP: string = Math.floor(Math.random() * 999999 + 100000).toString();

    const newUser = await UserModel.findOneAndUpdate(
      { email },
      {
        OTP: {
          value: OTP,
          createAT: new Date(Date.now() + 5 * 60 * 1000),
        },
      },
      { new: true }
    );

    await SendMail(
      email,
      "forgot password otp",
      ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Hello ${email},</h2>
    <p style="color: #555; font-size: 16px;">
      Your One-Time Password (OTP) for verification is:
    </p>
    <h1 style="text-align: center; color: #1a73e8; letter-spacing: 5px;">${OTP}</h1>
    <p style="color: #555; font-size: 14px;">
      This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
    </p>
    <p style="color: #777; font-size: 14px;">
      If you did not request this, please ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
    </p>
  </div>`
    );

    success_res(res, {
      statusCode: 200,
      message: "otp send successfully check your email",
    });
  } catch (error: any) {
    error_res(res, {
      statusCode: 404,
      message: error.message || "something went wrong",
    });
  }
};
