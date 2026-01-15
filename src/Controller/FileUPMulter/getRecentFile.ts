import { Request, Response } from "express";
import FileModel from "../../models/FileModel";

export const getRecentFile = async (req: Request, res: Response) => {
  const files = await FileModel.find({
    userEmail: req.user.email,
  })
    .sort({ createdAt: -1 })
    .limit(3);
  res.json({ files });
};
