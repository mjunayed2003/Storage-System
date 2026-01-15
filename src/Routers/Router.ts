import { Request, Response, Router } from "express";

import { userRouter } from "./UserRouter";
import { resetDBcontrollar } from "../Controller/UserControllers/resetDb";
import { upload } from "../Config/MulterProfile";
import { profilePictureController } from "../Controller/FileUPMulter/ProflePic";
import { tokenVerifyingMiddleware } from "../middlewares/tokenVerifying";
import { RouterFile } from "./filesUpload";
import { RouterFolder } from "./folderCreate";
const Routers = Router();
//user router
Routers.post(
  "/fileM",
  tokenVerifyingMiddleware,
  upload.single("profile"),
  profilePictureController
);
Routers.use("/user", userRouter);
Routers.use(RouterFile);
Routers.use(RouterFolder);
Routers.get("/resetDB", resetDBcontrollar);

export { Routers };
