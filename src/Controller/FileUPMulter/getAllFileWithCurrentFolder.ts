import { Request, Response } from "express";
import FileModel from "../../models/FileModel";

export const getAllFileWithCurrentFolder = async (
  req: Request,
  res: Response
) => {
  const folderName = req.params.folderName || "root";
  const files = await FileModel.find({
    userEmail: req.user.email,
    folderName,
  });
  res.json({ files });
};
