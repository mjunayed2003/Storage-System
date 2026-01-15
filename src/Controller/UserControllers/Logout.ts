import { Request, Response } from "express";
import { success_res } from "../ErrorHandleController";

export const LogoutHandleController = (req: Request, res: Response) => {
  const isSecure = req.secure;
  res.clearCookie("token", {
    httpOnly: isSecure,
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
    path: "/",
  });
  success_res(res,{statusCode:200,message:"logout successfully"})
};
