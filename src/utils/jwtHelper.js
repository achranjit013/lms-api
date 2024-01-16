import jwt from "jsonwebtoken";
import { createSession } from "../models/session/SessionModel.js";
import { updateRefreshJWT } from "../models/user/UserModel.js";

// create access token
export const signAccessJWT = (obj) => {
  const token = jwt.sign(obj, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  createSession({ token });

  return token;
};

// create refresh token
export const signRefreshJWT = (obj) => {
  const token = jwt.sign(obj, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  updateRefreshJWT({ ...obj, refreshJWT: token });

  return token;
};

// decode access token
export const accessJWTDecode = (accessJWT) => {
  return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
};

// decode refresh token
export const refreshJWTDecode = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
};

// function to create jwts
export const signJWTs = (obj) => {
  console.log("i am obj");
  return {
    accessJWT: signAccessJWT(obj),
    refreshJWT: signRefreshJWT(obj),
  };
};
