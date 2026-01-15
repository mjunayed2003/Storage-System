import { Request, Response } from "express";
import { error_res, success_res } from "../ErrorHandleController";
import FoldersModel from "../../models/FoldersModel";

export const folderCreator = async (req: Request, res: Response) => {
  const user = req.user.email;
  const folderName = req.body?.folderName;
  if (!folderName)
    return error_res(res, {
      statusCode: 404,
      message: "folderName required",
    });

  await FoldersModel.insertOne({ userEmail: user, folderName });
  success_res(res, {
    statusCode: 201,
    message: `folder is created name: ${folderName}`,
  });
};

