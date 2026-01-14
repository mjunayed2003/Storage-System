import express, { Application, NextFunction, Request, Response } from "express";
import { Routers } from "./Routers/Router";
import { error_res } from "./Controller/ErrorHandleController";
import { mongoDVConFunction } from "./Config/modngoDBconnect";
import cors from "cors";
const app: Application = express();
import "dotenv/config";
import cookieparsar from "cookie-parser";
import { corsSetup } from "./Config/corsSetup";
import { RouterFile } from "./Routers/filesUpload";
import path from "path";
import passport = require("passport");

import "./Config/googleAuthPassport";
import { cookieGenerate } from "./service/cookieGenerator";
import { tokenGenerator } from "./service/tokenGenerator";
import { RouterFolder } from "./Routers/folderCreate";
app.use(passport.initialize());

app.use(express.json());
app.enable("trust proxy");
app.use(express.urlencoded({ extended: true }));
app.use(cookieparsar());

const port: string = process.env.PORT!;
app.use(cors(corsSetup));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoDVConFunction();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ developer: "Md. Junayed", contact: "01939104157" });
});

app.use(Routers);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.ORIGIN1}/signin`,
  }),
  async (req: Request, res: Response) => {
    const isSecure = req?.secure;

    const user = req.user;
    // console.log(user);
    const {
      id,
      displayName,
      emails,
      photos,
    }: { id: string; displayName: string; emails: any; photos: any } = req.user;

    const data = {
      googleID: id,
      displayName,
      email: emails[0].value,
      profileURL: photos[0].value,
    };

    console.log(data);

    const token = tokenGenerator(
      {
        googleID: id,
        displayName,
        email: emails[0].value,
        profileURL: photos[0],
      },
      "30m"
    );
    cookieGenerate(res, { cookieName: "token", cookieValue: token, isSecure,maxAgeMinute:30 });
    res.redirect(process.env.ORIGIN1!);
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("page not found") as any;
  error.statusCode = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = {
    message: error.message,
    statusCode: error.statusCode,
  };
  error_res(res, { statusCode: error.statusCode, message: error.message });
  // res.status(error.statusCode).json(errorMessage);
});

export { app };
