import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PostgresDB } from "../../database/postgres/postgresDB";
import { RehabilitationSaveData } from "../../database/postgres/entities/rehabilitationSaveData";
import { SaveDataContent } from "../../types/saveDataContent";

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

  const saveData: SaveDataContent = {
    sharpenedKnife: rehabilitationSaveData.sharpenedKnife,
  }

  return res.status(200).json({
    userUuid,
    saveData,
  });
}

export const postRehabilitationSaveController = async (req: Request, res: Response) => {

  const uuid = uuidv4();

  const rehabilitationSaveData = new RehabilitationSaveData();
  rehabilitationSaveData.uuid = uuid;
  rehabilitationSaveData.userUuid = req.body.userUuid;
  rehabilitationSaveData.sharpenedKnife = req.body.saveData.sharpenedKnife;
  rehabilitationSaveData.createdAt = new Date();
  await PostgresDB.getInstance().dataSource.manager.save(rehabilitationSaveData);

  return res.status(200).json({
    uuid,
  });
};