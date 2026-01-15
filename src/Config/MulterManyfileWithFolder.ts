import multer from "multer";
import fs from "fs";
import path from "path";

export const getMulterStorage = (folderName: string) =>
  multer.diskStorage({
    destination: (req: any, file, cb) => {
      const userEmail = req?.user?.email;
      const uploadPath = path.join(
        __dirname,
        `../uploads/${userEmail}/${folderName || "root"}`
      );

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName =  file.originalname;
      cb(null, uniqueName);
    },
  });


export const uploadFiles = (folderName: string) =>
  multer({ storage: getMulterStorage(folderName) }).array("files", 20); 
