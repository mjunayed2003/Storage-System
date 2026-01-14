import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import { error_res, success_res } from "../ErrorHandleController";

export const AllFileSearchWithKeyword =  async (req: Request, res:Response) => {
    try {
      const { keyword }: { keyword: string } = req?.body;
      const files = await FileModel.find({
        userEmail: req.user.email,
        fileName: { $regex: keyword, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(3);
      success_res(res, { statusCode: 200, payload: files });
    } catch (error: any) {
      error_res(res, { statusCode: error.status, message: error.message });
    }
  }