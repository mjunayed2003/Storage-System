import { Request, Response } from "express";
import FileModel from "../../models/FileModel";
import { error_res, success_res } from "../ErrorHandleController";

export const StorageDetails = async (req: Request, res: Response) => {
  try {
    const files: any = await FileModel.find({
      userEmail: req?.user?.email,
    }).sort({ createdAt: -1 });

    let memoryWest = files.reduce((sum: number, item: any) => {
      return sum + Number(item.size);
    }, 0);

    const allImage = files.filter((item: any) => {
      return item?.mimeType?.includes("image");
    });
    const allPdf = files.filter((item: any) => {
      return item?.mimeType?.includes("pdf");
    });
    const allTExt = files.filter((item: any) => {
      return item?.mimeType?.includes("text");
    });

    const data = {
      image: {
        item: allImage.length,
        size: (
          allImage.reduce((sum: number, item: any) => {
            return sum + Number(item.size);
          }, 0) /
          1024 /
          1024
        ).toFixed(2),
      },
      allPdf: {
        item: allPdf.length,
        size: (
          allPdf.reduce((sum: number, item: any) => {
            return sum + Number(item.size);
          }, 0) /
          1024 /
          1024
        ).toFixed(2),
      },
      allTExt: {
        item: allTExt.length,
        size: (
          allTExt.reduce((sum: number, item: any) => {
            return sum + Number(item.size);
          }, 0) /
          1024 /
          1024
        ).toFixed(2),
      },
      StorageSize: (memoryWest / 1024 / 1024 / 1024).toFixed(3),
      AllFolderSize: (memoryWest / 1024 / 1024).toFixed(2),
    };

    console.log(data);

    success_res(res, { statusCode: 200, payload: data });
  } catch (error: any) {
    error_res(res, { statusCode: error.status, message: error.message });
  }
};
