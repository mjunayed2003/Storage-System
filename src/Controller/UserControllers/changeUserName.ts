import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import UserModel from "../../models/UserModel";

export const changeUsername = async (req: Request, res: Response) => {
  console.log(req.user);
  const { email } = req?.user;
  const { userName } = req?.body;
  // console.log(req.body, "ami body data paichi ");
  if (!userName) {
    error_res(res, { statusCode: 404, message: "username required" });
  }

  try {
    const userIO = await UserModel.findOne({ userName });

    if (userIO) {
      error_res(res, {
        statusCode: 409,
        message: "this username is already used",
      });
    }
    const NewUser = await UserModel.findOneAndUpdate(
      { email },
      { userName },
      { new: true }
    );
    success_res(res, {
      statusCode: 200,
      message: "username changed",
      payload: NewUser,
    });
  } catch (error: any) {
    console.log(error);

    error_res(res, { statusCode: 400, message: error.message });
  }
};
