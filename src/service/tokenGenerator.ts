import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

const secretKeyJWT = process.env.SECRETEKEYJWT;
if (!secretKeyJWT) {
  throw new Error("JWT secret key is not defined in .env");
}

export const tokenGenerator = (data: object, expireMinute: string): string => {
  const options: SignOptions = {
    expiresIn: expireMinute as unknown as import("ms").StringValue,
  };
  return jwt.sign(data, secretKeyJWT, options);
};
