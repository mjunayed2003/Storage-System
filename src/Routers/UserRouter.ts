import { Request, Response, Router } from "express";
import {
  getUserControllers,
  signInUserController,
  SignUPController,
} from "../Controller/UserControllers/UserController";
import { Islogin } from "../Controller/UserControllers/Islogin";
import { tokenVerifyingMiddleware } from "../middlewares/tokenVerifying";
import { LogoutHandleController } from "../Controller/UserControllers/Logout";
import { changePassword } from "../Controller/UserControllers/ChangePassword";
import { changeUsername } from "../Controller/UserControllers/changeUserName";
import { forgotPass } from "../Controller/UserControllers/forgotPass";
import { otpCheckerController } from "../Controller/UserControllers/OTPCheking";
import { NewPassword } from "../Controller/UserControllers/NewPassword";
const userRouter = Router();

// */user
userRouter.get("/", getUserControllers);
userRouter.post("/signUP", SignUPController);
userRouter.post("/signIn", signInUserController);
userRouter.get("/logout", LogoutHandleController);
userRouter.get("/isLogged", tokenVerifyingMiddleware, Islogin);
userRouter.post("/changePassword", tokenVerifyingMiddleware, changePassword);
userRouter.post("/changeUserName", tokenVerifyingMiddleware, changeUsername);
userRouter.post("/forgotEmailSender", forgotPass);
userRouter.post("/otpChecker", otpCheckerController);
userRouter.post("/newPassword", NewPassword);

export { userRouter };
