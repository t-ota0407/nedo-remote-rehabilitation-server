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
  rehabilitationResult.rehabilitationCondition = req.body.result.rehabilitationCondition;
  rehabilitationResult.rehabilitationStartedAt = new Date(); // todo: req.body.result.rehabilitationStartedAtから取得できるようにする。
  rehabilitationResult.rehabilitationFinishedAt = new Date(); // todo: req.body.result.rehabilitationFinishedAtから取得できるようにする。
  rehabilitationResult.reachingTimes = req.body.result.reachingTimes;
  rehabilitationResult.sharpenedKnifeBefeore = req.body.result.sharpenedKnifeBefore;
  rehabilitationResult.sharpenedKnifeAfter = req.body.result.sharpenedKnifeAfter;
  await PostgresDB.getInstance().dataSource.manager.save(rehabilitationResult);

  return res.status(200).json({
    uuid,
  });
};