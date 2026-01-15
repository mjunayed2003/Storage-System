import { Request, Response } from "express";
import { error_res } from "../ErrorHandleController";
import FileModel from "../../models/FileModel";

export const GetFolderFileWithName = async (req: Request, res: Response) => {
  if (!req.params?.folderName)
    return error_res(res, {
      statusCode: 404,
      message: "folderName is required",
    });
  const files = await FileModel.find({
    userEmail: req.user.email,
    folderName: req.params?.folderName,
  }).sort({ createdAt: -1 });
  res.json({ files });
};
