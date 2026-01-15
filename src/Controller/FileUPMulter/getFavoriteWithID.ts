import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import { success_res } from "../ErrorHandleController";

export const getFavoriteWithId = async (req: Request, res: Response) => {
  const ID: string = req.params.id;
  const file = await FileModel.findOneAndUpdate(
    {
      userEmail: req.user.email,
      _id: ID,
    },
    {
      $set: { favorite: true },
    },
    {
      new: true,
    }
  );

  success_res(res, { statusCode: 200, message: "favorite added" });
};
