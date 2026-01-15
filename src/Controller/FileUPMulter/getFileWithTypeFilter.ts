import { Request, Response } from "express";
import FileModel from "../../models/FileModel";

export const getFileWithTypeFilter = async (req: Request, res: Response) => {
  let type: string = req.params?.type;

  const files = await FileModel.find({
    userEmail: req.user.email,
    mimeType: { $regex: type, $options: "i" },
  }).sort({ createdAt: -1 });
  res.json({ files });
};
