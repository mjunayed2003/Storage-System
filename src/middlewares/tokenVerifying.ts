import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { error_res } from "../Controller/ErrorHandleController";
import UserModel from "../models/UserModel";

const secrete: string = process.env.SECRETEKEYJWT!;

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const tokenVerifyingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.token;

    if (!token)
      return error_res(res, { statusCode: 401, message: "user unauthorize" });
    const decoded: any = jwt.verify(token, secrete as string);

    if (!decoded) {
      error_res(res, { statusCode: 404, message: "user token not valid" });
    }

    const user = await UserModel.findOne({ email: decoded?.email });
    req.user = user;
    next();
  } catch (error: any) {
    error_res(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
