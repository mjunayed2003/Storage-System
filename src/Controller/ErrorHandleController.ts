import { Request, Response } from "express";

export const success_res = (
  res: Response,
  {
    statusCode = 404,
    message = "Success",
    payload = {},
  }: { statusCode?: number; message?: string; payload?: any }
) => {
  res.status(statusCode).json({
    message,
    statusCode,
    payload,
  });
};
export const error_res = (
  res: Response,
  { statusCode=500, message }: { statusCode?: number; message: string }
) => {
  res.status(statusCode).json({
    message,
    statusCode,
  });
};
