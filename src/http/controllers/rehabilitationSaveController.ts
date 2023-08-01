import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RehabilitationResult } from "../../database/postgres/entities/rehabilitationResult";
import { PostgresDB } from "../../database/postgres/postgresDB";
import { RehabilitationSaveData } from "../../database/postgres/entities/rehabilitationSaveData";

export const getRehabilitationSaveController = async (req: Request, res: Response) => {
  const userUuid = req.query.userUuid?.toString();

  const rehabilitationSaveData = await PostgresDB.getInstance().dataSource.manager.findOneOrFail(
    RehabilitationSaveData,
    {
      where: { userUuid, },
      order: { createdAt: "DESC", },
    }
  );

  if (rehabilitationSaveData === undefined) {
    return res.status(400).json({});
  }

  return res.status(200).json({
    userUuid,
    sharpenedKnife: rehabilitationSaveData.sharpenedKnife,
  });
}

export const postRehabilitationSaveController = async (req: Request, res: Response) => {

  const uuid = uuidv4();

  const rehabilitationSaveData = new RehabilitationSaveData();
  rehabilitationSaveData.uuid = uuid;
  rehabilitationSaveData.userUuid = req.body.userUuid;
  rehabilitationSaveData.sharpenedKnife = req.body.sharpenedKnife;
  rehabilitationSaveData.createdAt = new Date();
  await PostgresDB.getInstance().dataSource.manager.save(rehabilitationSaveData);

  return res.status(200).json({
    uuid,
  });
};