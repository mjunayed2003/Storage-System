import { Request, Response } from "express";
import { uploadFiles } from "../../Config/MulterManyfileWithFolder";
import FileModel from "../../models/FileModel";

export const uploadFileWithFolderName = async(req: Request, res:Response) => {
    const folderName = req.params.folderName || "root";
    const upload = uploadFiles(folderName);

    upload(req, res, async (err: any) => {
      if (err) return res.status(500).json({ message: err.message });

      const filesToInsert: any[] = [];

      for (const file of req.files as Express.Multer.File[]) {
        const fileURL: string =
          process.env.BASE_URL +
          "/" +
          file.path
            .split("\\")
            .join("/")
            .split("src/")[1]
            .split("/")
            .map((ed) => encodeURIComponent(ed))
            .join("/");

        const already = await FileModel.findOne({
          userEmail: req.user.email,
          fileURL: fileURL,
        });

        if (already) {
          continue;
        }

        filesToInsert.push({
          userEmail: req.user.email,
          folderName,
          originalName: file.originalname,
          fileName: file.filename,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path,
          fileURL,
        });
      }

      if (filesToInsert.length > 0) {
        await FileModel.insertMany(filesToInsert);
      }

      res.json({ message: "Files uploaded", files: filesToInsert });
    });
  }