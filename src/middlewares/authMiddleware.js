import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { accessJWTDecode } from "../utils/jwtHelper.js";

export const getUserFromAccessJWT = async (token) => {
  // check if accessJWT is valid
  const decoded = accessJWTDecode(token);
  if (decoded?.email) {
    // check if this exist in session table
    const tokenExist = await getSession({ token });
    if (tokenExist?._id) {
      // get user
      const user = await getUserByEmail(decoded.email);
      if (user?._id) {
        user.password = undefined;
        return user;
      }
    }
  }

  return false;
};

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // get user from accessJWT
    const user = await getUserFromAccessJWT(authorization);

    console.log("user is");
    console.log(user);

    if (user?._id) {
      user.password = undefined;
      req.userInfo = user;
      return next();
    }

    throw new Error("Invalid token, Unauthorized!");
  } catch (error) {
    error.errorCode = 401;
    if (error.message.includes("jwt expired")) {
      error.errorCode = 403;
    }
    next(error);
  }
};
