import { Router } from "express";
import { tokenVerifyingMiddleware } from "../middlewares/tokenVerifying";
import FileModel from "../models/FileModel";
import { uploadFiles } from "../Config/MulterManyfileWithFolder";
import fs from "fs";

import path from "path";
import { error_res, success_res } from "../Controller/ErrorHandleController";
import { uploadFileWithFolderName } from "../Controller/FileUPMulter/uploadFileWithFolderName";
import { getFileWithTypeFilter } from "../Controller/FileUPMulter/getFileWithTypeFilter";
import { getFavoriteFile } from "../Controller/FileUPMulter/getFavoriteFile";
import { getRecentFile } from "../Controller/FileUPMulter/getRecentFile";
import { getFavoriteWithId } from "../Controller/FileUPMulter/getFavoriteWithID";
import { getAllFileWithCurrentFolder } from "../Controller/FileUPMulter/getAllFileWithCurrentFolder";
import { SearchWithKeywordANDType } from "../Controller/FileUPMulter/SearchWithKeywordANDType";
import { favoriteFileSearch } from "../Controller/FileUPMulter/favoriteFileSearch";
import { AllFileSearchWithKeyword } from "../Controller/FileUPMulter/AllFileSearchWithKeyword";
import { StorageDetails } from "../Controller/FileUPMulter/StorageDetails";
import { DateFilterFiles } from "../Controller/FileUPMulter/DateFilterFiles";
import { DuplicateFile } from "../Controller/FileUPMulter/DuplicateFile";
import { fileDeleteWithID } from "../Controller/FileUPMulter/fileDeleteWithID";
import { RenameFileWithId } from "../Controller/FileUPMulter/RenameFileWithId";
import { TextFileUpdate } from "../Controller/FileUPMulter/TextFileUpdate";
import { textTilteUpdate } from "../Controller/FileUPMulter/textTilteUpdate";

const RouterFile = Router();

//file upload with folderName add need to Postman //input name is : "files"
RouterFile.post(
  "/upload/:folderName",
  tokenVerifyingMiddleware,
  uploadFileWithFolderName
);

//all file search with type add need to Postman
RouterFile.post("/list/:type", tokenVerifyingMiddleware, getFileWithTypeFilter);

//all favorite file add need to Postman
RouterFile.post("/favorite", tokenVerifyingMiddleware, getFavoriteFile);

//all recent file get add need to Postman
RouterFile.post("/recentFile", tokenVerifyingMiddleware, getRecentFile);

RouterFile.post("/favorite/:id", tokenVerifyingMiddleware, getFavoriteWithId);

RouterFile.get(
  "/list/:folderName",
  tokenVerifyingMiddleware,
  getAllFileWithCurrentFolder
);

RouterFile.post("/search", tokenVerifyingMiddleware, SearchWithKeywordANDType);

RouterFile.post("/fav_search", tokenVerifyingMiddleware, favoriteFileSearch);

RouterFile.post(
  "/allSearch",
  tokenVerifyingMiddleware,
  AllFileSearchWithKeyword
);

RouterFile.get("/fileDetails", tokenVerifyingMiddleware, StorageDetails);

RouterFile.post("/dateFilterFile", tokenVerifyingMiddleware, DateFilterFiles);

RouterFile.post("/duplicate/:id", tokenVerifyingMiddleware, DuplicateFile);

RouterFile.delete(
  "/fileDelete/:id",
  tokenVerifyingMiddleware,
  fileDeleteWithID
);

RouterFile.patch("/rename/:fileId", tokenVerifyingMiddleware, RenameFileWithId);

RouterFile.post("/fileTExtUpdate", tokenVerifyingMiddleware, TextFileUpdate);

RouterFile.post("/textFileTile", tokenVerifyingMiddleware, textTilteUpdate);

export { RouterFile };
