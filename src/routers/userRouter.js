import express from "express";
import {
  newUserValidation,
  userLoginValidation,
} from "../middlewares/joiValidation.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createUser, getUserByEmail } from "../models/user/UserModel.js";
import { signJWTs } from "../utils/jwtHelper.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// login
router.post("/login", userLoginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    const user = await getUserByEmail(email);
    console.log("first");
    console.log(user?._id);

    if (user?._id) {
      // check password
      console.log("second");
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        // create jwts
        console.log("third");
        const jwts = signJWTs({ email: user.email });

        console.log(jwts);

        return res.json({
          status: "success",
          message: "Login successfull",
          jwts,
        });
      }
    }

    return res.json({
      status: "error",
      message:
        "Oops! It seems like there was an issue with your login credentials. Please double-check your username and/or password and try again. If you need assistance, contact support. Thank you!",
    });
  } catch (error) {
    next(error);
  }
});

// below this are all private routes

// create new admin
router.post("/admin", newUserValidation, async (req, res, next) => {
  try {
    // encrpt password before storing to db
    req.body.password = hashPassword(req.body.password);
    req.body.role = "admin";

    const admin = await createUser(req.body);

    if (admin?._id) {
      return res.json({
        status: "success",
        message:
          "Congratulations!!! Your account has been created! Welcome to the admin panel, where you can manage and optimize your library system. Let the seamless administration begin!",
      });
    }

    res.json({
      status: "error",
      message:
        "Sorry!!! We're currently unable to create your account. Please double-check your information or try again later. If you need assistance, contact support. Thank you!",
    });
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "Uh-oh! It seems there's already a user with this email. Please use a different email or try logging in. If you need assistance, contact support. Thank you!";
      error.errorCode = 200;
    }
    next(error);
  }
});

// get user after login
router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "user info",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
