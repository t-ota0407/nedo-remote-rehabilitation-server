import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import * as rehabilitationSaveValidator from "../validations/rehabilitationSaveValidator";
import * as rehabilitationSaveController from "../controllers/rehabilitationSaveController";
import passport from "../../authentification/passportAuthentification";

export const rehabilitationSaveRouter = Router();

rehabilitationSaveRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  rehabilitationSaveValidator.getRehabilitationSave,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    rehabilitationSaveController.getRehabilitationSaveController(req, res);
  }
)

rehabilitationSaveRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  rehabilitationSaveValidator.postRehabilitationSave,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    rehabilitationSaveController.postRehabilitationSaveController(req, res);
  }
);
