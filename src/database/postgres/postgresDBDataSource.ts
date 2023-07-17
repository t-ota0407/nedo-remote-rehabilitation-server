import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { RehabilitationResult } from "./entities/rehabilitationResult";

require('dotenv').config();

export const postgresDBDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, RehabilitationResult],
  migrations: ["dist/database/postgres/migrations/*.js"],
  subscribers: [],
})