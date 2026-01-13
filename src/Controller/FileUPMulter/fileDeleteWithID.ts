import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import fs from "fs"

export const fileDeleteWithID = async (req: Request, res:Response) => {
  const file = await FileModel.findOne({
    _id: req.params.id,
    userEmail: req.user?.email,
  });
  if (!file) return res.status(404).json({ message: "File not found" });

  if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
  await file.deleteOne();

  res.json({ message: "File deleted" });
};
