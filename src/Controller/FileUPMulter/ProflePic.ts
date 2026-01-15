import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import UserModel from "../../models/UserModel";
import "dotenv/config";

export const profilePictureController = async (req: Request, res: Response) => {
  try {
    console.log(req.file?.filename);

    const fileURL = req.file?.path
      .split("\\")
      .join("/")
      .split("src/")[1]
      .split("/")
      .map((ed) => encodeURIComponent(ed))
      .join("/");

    await UserModel.findOneAndUpdate(
      { email: req?.user?.email },
      {
        $set: {
          profilePic: process.env.BASE_URL! + "/" + fileURL,
        },
      }
    );

    success_res(res, {
      statusCode: 200,
      message: "profile photo update successfully",
    });
  } catch (error: any) {
    error_res(res, { statusCode: error.status, message: error.message });
  }
};
