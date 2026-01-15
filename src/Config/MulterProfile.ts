import multer from "multer";
import fs from "fs";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const outputPath = path.join(
      __dirname,
      "../uploads/profilePictures"
    );
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    cb(null, outputPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      crypto
        .getRandomValues(new Uint8Array(64))
        .reduce((acc, val) => acc + val.toString(16).padStart(2, "0"), "") +
        "__" +
        file.originalname
    );
  },
});

export const upload = multer({ storage: storage });
