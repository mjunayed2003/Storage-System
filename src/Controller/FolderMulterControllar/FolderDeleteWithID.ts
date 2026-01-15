import { Request, Response } from "express";
import FoldersModel from "../../models/FoldersModel";
import path from "path";
import FileModel from "../../models/FileModel";
import fs from "fs";

export const FolderDeleteWithID = async (req: Request, res: Response) => {
  const folder: any = await FoldersModel.findOne({
    _id: req.params.id,
    userEmail: req.user?.email,
  });

  const folderPath = path.join(
    __dirname,
    `../../uploads/${req.user.email}/${folder?.folderName}`
  );

  console.log(folderPath);

  const filsINFolder = await FileModel.deleteMany({
    folderName: folder?.folderName,
    userEmail: req.user?.email,
  });

  if (!folder) return res.status(404).json({ message: "folder not found" });

  await folder.deleteOne();
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  res.json({
    message: "folder deleted",
    payload: { folderPath, filsINFolder },
  });
};
