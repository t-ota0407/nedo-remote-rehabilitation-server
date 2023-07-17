import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RehabilitationResult } from "../../database/postgres/entities/rehabilitationResult";
import { PostgresDB } from "../../database/postgres/postgresDB";

export const postRehabilitationResultController = async (req: Request, res: Response) => {
 
  const uuid = uuidv4();

  const rehabilitationResult = new RehabilitationResult();
  rehabilitationResult.uuid = uuid;
  rehabilitationResult.createdAt = new Date();
  rehabilitationResult.userUuid = req.body.userUuid;
  rehabilitationResult.rehabilitationCondition = req.body.rehabilitationCondition;
  rehabilitationResult.rehabilitationStartedAt = req.body.rehabilitationStartedAt;
  rehabilitationResult.rehabilitationFinishedAt = req.body.rehabilitationFinishedAt;
  rehabilitationResult.reachingTimes = req.body.reachingTimes;
  rehabilitationResult.sharpenedKnifeBefeore = req.body.sharpenedKnifeBefore;
  rehabilitationResult.sharpenedKnifeAfter = req.body.sharpenedKnifeAfter;
  await PostgresDB.getInstance().dataSource.manager.save(rehabilitationResult);

  return res.status(200).json({
    uuid,
  });
};