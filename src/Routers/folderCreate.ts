import { Request, Response, Router } from "express";
import FolderModel from "../models/FoldersModel";
import { tokenVerifyingMiddleware } from "../middlewares/tokenVerifying";
import { error_res, success_res } from "../Controller/ErrorHandleController";
import FileModel from "../models/FileModel";
const RouterFolder = Router();
import fs from "fs";
import path from "path";
import UserModel from "../models/UserModel";
import { GetAllFolder } from "../Controller/FolderMulterControllar/GetAllFolder";
import { GetFolderFileWithName } from "../Controller/FolderMulterControllar/GetFolderFileWithName";
import { FolderDeleteWithID } from "../Controller/FolderMulterControllar/FolderDeleteWithID";
import { AccountDelete } from "../Controller/FolderMulterControllar/AccountDelete";
import { folderCreator } from "../Controller/FolderMulterControllar/folderCreator";

RouterFolder.post("/folderCreate", tokenVerifyingMiddleware, folderCreator);

RouterFolder.get("/allFOlders", tokenVerifyingMiddleware, GetAllFolder);

RouterFolder.get(
  "/folderFiles/:folderName",
  tokenVerifyingMiddleware,
  GetFolderFileWithName
);

RouterFolder.delete(
  "/folderDelete/:id",
  tokenVerifyingMiddleware,
  FolderDeleteWithID
);

RouterFolder.delete("/accountDelete", tokenVerifyingMiddleware, AccountDelete);

export { RouterFolder };
