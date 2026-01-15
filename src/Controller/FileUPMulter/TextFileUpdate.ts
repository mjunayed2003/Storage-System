import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import fs from "fs";
import { error_res, success_res } from "../ErrorHandleController";

export const TextFileUpdate = async (req: Request, res: Response) => {
  try {
    const { content, id }: { content: string; id: string } = req.body;
    const file = await FileModel.findOne({
      _id: id,
      userEmail: req.user.email,
    });
    if (!file) return res.status(404).json({ message: "File not found" });

    await fs.writeFile(file.path, content, "utf-8", (err: any) => {
      fs.stat(file.path, (err, state) => {
        file.size = state.size;

        file.save();
      });
      if (err) {
        error_res(res, { statusCode: err.status, message: err.message });
      }
    });

    success_res(res, { statusCode: 200, message: "file uploaded" });
  } catch (error: any) {
    error_res(res, { statusCode: error.status, message: error.message });
  }
};
