import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import path from "path";
import fs from "fs"
import { success_res } from "../ErrorHandleController";

export const DuplicateFile = 
  async (req: Request, res:Response) => {
    try {
      const file = await FileModel.findOne({
        _id: req.params.id,
        userEmail: req.user.email,
      });

      if (!file) return res.status(404).json({ error: "File not found" });

      const newFileName = "copy_" + file.fileName;
      const newPath = path.join(path.dirname(file.path), newFileName);

      fs.copyFileSync(file.path, newPath);
      const newFileURL =
        process.env.BASE_URL +
        "/" +
        newPath.split("\\").join("/").split("src/")[1];
      const newFile = await FileModel.insertOne({
        userEmail: req.user.email,
        folderName: file.folderName,
        originalName: newFileName,
        fileName: newFileName,
        mimeType: file.mimeType,
        size: file.size,
        path: newPath,
        fileURL: newFileURL,
      });

      success_res(res, { statusCode: 201, message: "duplicate successfully" });
    } catch (err) {
      console.log(err);

      res.status(500).json({ error: err });
    }
  }