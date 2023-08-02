import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Token } from "../../authentification/token";
import { User } from "../../database/postgres/entities/user";
import { PostgresDB } from "../../database/postgres/postgresDB";

export const signupUser = async (req: Request, res: Response) => {

  const userUuid = uuidv4();
  const payload = { userUuid, };
  const token = Token.generate(payload);

  const user = new User();
  user.uuid = userUuid;
  user.userName = req.body.userName;
  user.password = req.body.password;
  user.createdAt = new Date();
  await PostgresDB.getInstance().dataSource.manager.save(user);

  return res.status(200).json({
    userUuid,
    token,
  });
};

export const signinUser = async (req: Request, res: Response) => {

  const userName = req.body.userName;
  const password = req.body.password;
  
  const user = await PostgresDB.getInstance().dataSource.manager.findOneOrFail(
    User,
    {
      where: {
        userName,
        password,
      },
    }
  );

  if (user === undefined) {
    return res.status(404).json({});
  }

  const userUuid = user.uuid;
  const payload = { userUuid, };
  const token = Token.generate(payload);

  return res.status(200).json({
    userUuid,
    token,
  });
};
