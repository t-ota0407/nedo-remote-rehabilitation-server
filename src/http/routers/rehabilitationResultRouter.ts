import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import * as rehabilitationResultValidator from "../validations/rehabilitationResultValidator";
import * as rehabilitationResultController from "../controllers/rehabilitationResultController";
import passport from "../../authentification/passportAuthentification";

export const rehabilitationResultRouter = Router();

rehabilitationResultRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  rehabilitationResultValidator.postRehabilitationResult,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    rehabilitationResultController.postRehabilitationResultController(req, res);
  }
);
