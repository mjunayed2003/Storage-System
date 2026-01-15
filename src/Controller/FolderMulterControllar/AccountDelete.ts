import { Request, Response } from "express";
import fs from "fs"
import path from "path";
import UserModel from "../../models/UserModel";
import FileModel from "../../models/FileModel";
import FoldersModel from "../../models/FoldersModel";
import { error_res, success_res } from "../ErrorHandleController";


export const AccountDelete = async (req: Request, res:Response) => {
    try {
      const AccountPath = path.join(
        __dirname,
        `../../uploads/${req.user.email}`
      );
      console.log(AccountPath);

      // userModel theke user delete kora
      const userDeleting = await UserModel.findOneAndDelete({
        email: req.user.email,
      });

      // filemodel theke allfile delete kora
      const userFilesDeleting = await FileModel.deleteMany({
        userEmail: req.user.email,
      });

      // foldermodel theke main user folder delete kora
      const userDeleteFolderModel = await FoldersModel.deleteMany({
        userEmail: req.user.email,
      });
      if (fs.existsSync(AccountPath)) {
        fs.rmSync(AccountPath, { recursive: true, force: true });
      }

      success_res(res, {
        statusCode: 200,
        message: "user delete successfully",
        payload: { Email: req.user.email },
      });
    } catch (error: any) {
      error_res(res, { statusCode: error.status, message: error.message });
    }
  }