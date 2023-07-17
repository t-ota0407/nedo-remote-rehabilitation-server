import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Token } from "../../authentification/token";
import { User } from "../../database/postgres/entities/user";
import { PostgresDB } from "../../database/postgres/postgresDB";

export const signupUser = async (req: Request, res: Response) => {

  const uuid = uuidv4();
  const payload = { uuid, };
  const token = Token.generate(payload);

  const user = new User();
  user.uuid = uuid;
  user.userName = req.body.userName;
  user.password = req.body.password;
  user.createdAt = new Date();
  await PostgresDB.getInstance().dataSource.manager.save(user);

  return res.status(200).json({
    uuid,
    token,
  });
};
