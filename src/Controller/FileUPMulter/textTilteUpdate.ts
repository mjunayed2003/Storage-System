import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import { error_res, success_res } from "../ErrorHandleController";

export const textTilteUpdate = 
  async (req: Request, res:Response) => {
    try {
      const { title, id }: { title: string; id: string } = req.body;
      const file = await FileModel.findOne({
        _id: id,
        userEmail: req.user.email,
      });
      if (!file) return res.status(404).json({ message: "File not found" });

      file.Title = title;
      await file.save();

      success_res(res, { statusCode: 200, message: "file uploaded" });
    } catch (error: any) {
      error_res(res, { statusCode: error.status, message: error.message });
    }
  }