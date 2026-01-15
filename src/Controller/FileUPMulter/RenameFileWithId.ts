import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import fs from "fs"
import path from "path";
import { error_res, success_res } from "../ErrorHandleController";

export const RenameFileWithId = 
  async (req: Request, res:Response) => {
    try {
      const { newName }: { newName: string } = req.body;
      const file = await FileModel.findOne({
        _id: req.params.fileId,
        userEmail: req.user.email,
      });
      if (!file) return res.status(404).json({ message: "File not found" });

      const newPath = path.join(path.dirname(file.path), newName);
      fs.renameSync(file.path, newPath);

      const fileURL =
        process.env.BASE_URL +
        "/" +
        newPath
          .split("\\")
          .join("/")
          .split("src/")[1]
          .split("/")
          .map((ed) => encodeURIComponent(ed))
          .join("/");

      file.fileName = newName;
      file.path = newPath;
      file.fileURL = fileURL;
      await file.save();

      success_res(res, { statusCode: 200, message: "file uploaded" });
    } catch (error: any) {
      error_res(res, { statusCode: error.status, message: error.message });
    }
  }