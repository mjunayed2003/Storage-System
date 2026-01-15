import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../../models/UserModel";
export const changePassword = async (req: Request, res: Response) => {
  console.log(req.user);
  const { email } = req?.user;
  console.log(req.body , "ami body data paichi ");
  
  const userDB: any = await UserModel.findOne({ email });

  const passwordValid: Boolean = await bcrypt.compare(
    req?.body?.oldPassword,
    userDB?.password
  );
  const hashedNewPassword = await bcrypt.hash(req.body?.newPassword, 10);
  if (passwordValid) {
    await UserModel.findOneAndUpdate(
      { email },
      { password: hashedNewPassword }
    );
  } else {
    error_res(res, { statusCode: 404, message: "old password not valid " });
  }
  success_res(res, { statusCode: 200, message: "changed password" });
};
