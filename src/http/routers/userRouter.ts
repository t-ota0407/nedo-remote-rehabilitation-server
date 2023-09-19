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

    return userController.signupUser(req, res);
  }
);

userRouter.post(
  "/signin",
  userValidator.signinUser,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    return userController.signinUser(req, res);
  }
);

userRouter.post(
  "/signup-with-temporary-account",
  userValidator.signupWithTemporaryAccountUser,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    return userController.signupWithTemporaryAccount(req, res);
  }
);
