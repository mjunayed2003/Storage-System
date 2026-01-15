import { NextFunction, Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import UserModel from "../../models/UserModel";
import { hashTextGeneration } from "../../service/hashTextGeneraton";

import bcryptjs from "bcryptjs";
import { tokenGenerator } from "../../service/tokenGenerator";
import { cookieGenerate } from "../../service/cookieGenerator";
import FoldersModel from "../../models/FoldersModel";

export const getUserControllers = (req: Request, res: Response) => {
  res.status(200).json({
    name: "shamim",
    Poly: "Sherpur polytechnic Institute",
    Department: "Computer Science & Technology",
  });
};

//signup user controller
export const SignUPController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { Email, userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
    user
      ? error_res(res, {
          statusCode: 409,
          message: "user already exist with this username",
        })
      : "";
    // email checking
    user?.email == Email
      ? error_res(res, {
          statusCode: 409,
          message: "email already exist with this username",
        })
      : "";

    const hashPassword = await hashTextGeneration(password);

    let newUser = await UserModel.insertOne({
      userName,
      email: Email,
      password: hashPassword,
    });
    FoldersModel.create({
      userEmail: Email,
      folderName: "root",
    });
    success_res(res, {
      statusCode: 201,
      message: "user register successfully",
      payload: newUser,
    });
  } catch (error: any) {
    error_res(res, { statusCode: error.status, message: error.message });
  }
};

// sin in user controller
export const signInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    interface loginBody {
      email: string;
      password: string;
    }
    const { email, password }: loginBody = req.body;

    const user: any = await UserModel.findOne({ email });

    if (!user) {
      return error_res(res, {
        statusCode: 404,
        message: "user not found with this email",
      });
    }

    const checkPassword: boolean = await bcryptjs.compare(
      password,
      user?.password
    );
    if (!checkPassword) {
      error_res(res, { statusCode: 404, message: "wrong credential" });
    }
    const token: string = tokenGenerator(user.toObject(), "30m");

    console.log(token);
    const isSecure: boolean = req.secure;
    cookieGenerate(res, {
      isSecure,
      cookieName: "token",
      cookieValue: token,
      maxAgeMinute: 30,
    });
    success_res(res, {
      statusCode: 200,
      message: "successfully user sign in",
      payload: { token },
    });
  } catch (error: any) {
    error_res(res, { statusCode: 500, message: error.message });
  }
};
