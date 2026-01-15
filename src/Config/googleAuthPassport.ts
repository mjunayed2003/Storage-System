import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import UserModel from "../models/UserModel";
import { Request } from "express";
import { hashTextGeneration } from "../service/hashTextGeneraton";
import FoldersModel from "../models/FoldersModel";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CallBackURL,
      passReqToCallback: true,
    },
    async (request: Request, accessToken, refreshToken, profile, done) => {
      const user = await UserModel.findOne({
        email: profile?.emails![0].value,
      });
      console.log(
        profile?.photos![0].value,
        "---------------------------------------------8888888888888888888888"
      );

      if (!user) {
        // console.log(profile);
        const hashTEXT = await hashTextGeneration(profile?.emails![0].value);
        UserModel.insertOne({
          email: profile?.emails![0].value,
          userName: profile?.emails![0].value,
          password: hashTEXT,
          profilePic: profile?.photos![0].value,
        });
        FoldersModel.create({
          userEmail: profile?.emails![0].value,
          folderName: "root",
        });
       
        done(null, profile); 
        return;
      }
      done(null, profile);
    }
  )
);
