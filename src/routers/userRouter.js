import express from "express";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createUser } from "../models/user/UserModel.js";

const router = express.Router();

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

export default router;
