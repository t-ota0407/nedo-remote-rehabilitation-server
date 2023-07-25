import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import * as userValidator from "../validations/userValidator";
import * as userController from "../controllers/userController";

export const userRouter = Router();

userRouter.post(
  "/signup",
  userValidator.signupUser,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    console.log("post");
    return userController.signupUser(req, res);
  }
);
