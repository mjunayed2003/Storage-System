import { Request, Response } from "express";
import FoldersModel from "../../models/FoldersModel";
import { error_res, success_res } from "../ErrorHandleController";

export const GetAllFolder =  async (req: Request, res:Response) => {
    const Folders = await FoldersModel.find({
      userEmail: req.user.email,
    }).sort({ createdAt: -1 });
    res.json({ Folders });
  }
