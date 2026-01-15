import { Request, Response } from "express";
import FileModel from "../../models/FileModel";

export const getFavoriteFile = async (req: Request, res: Response) => {
  const files = await FileModel.find({
    userEmail: req.user.email,
    favorite: true,
  }).sort({ createdAt: -1 });
  res.json({ files });
};
