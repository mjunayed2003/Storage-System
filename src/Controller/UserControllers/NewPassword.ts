import { Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { error_res, success_res } from "../ErrorHandleController";
import UserModel from "../../models/UserModel";
import { hashTextGeneration } from "../../service/hashTextGeneraton";
export const NewPassword = async (req: Request, res: Response) => {
  try {
    const {
      token,
      email,
      password,
    }: { token: string; email: string; password: string } = req?.body;
    if (!token && !email && !password) {
      error_res(res, {
        statusCode: 404,
        message: "token,email,password are not found",
      });
    }
    const valideToken = jwt.verify(token, process.env.SECRETEKEYJWT! as string);

    if (!valideToken) {
      error_res(res, { statusCode: 401, message: "unAuthorize token" });
    }
    console.log(valideToken);

    const hash = await hashTextGeneration(password);

    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hash } },
      { new: true, projection: { password: 0 } }
    );

    success_res(res, {
      statusCode: 200,
      message: "password change",
      payload: { user },
    });
  } catch (error: any) {
    error_res(res, {
      statusCode: error.status,
      message: error?.message || "something went wrong",
    });
  }
};
