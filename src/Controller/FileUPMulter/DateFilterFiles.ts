import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import { error_res, success_res } from "../ErrorHandleController";

export const DateFilterFiles = 
  async (req: Request, res:Response) => {
    try {
      // data send with this structure :  "2025-09-27"
      const { date }: { date: string } = req?.body;
      console.log(date);

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const files = await FileModel.find({
        userEmail: req.user.email,
        createdAt: { $gte: start, $lte: end },
      }).sort({ createdAt: -1 });
      success_res(res, { statusCode: 200, payload: files });
    } catch (error: any) {
      error_res(res, { statusCode: error.status, message: error.message });
    }
  }