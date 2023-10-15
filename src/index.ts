import express from "express";
import cookieParser from "cookie-parser";

import passport from "./authentification/passportAuthentification";
import { PostgresDB } from "./database/postgres/postgresDB";
import { userRouter } from "./http/routers/userRouter";
import { rehabilitationResultRouter } from './http/routers/rehabilitationResultRouter';
import { rehabilitationSaveRouter } from "./http/routers/rehabilitationSaveRouter";
import { UDP } from "./syncCommunication/udp";
import { schedule } from "node-cron";
import { InMemoryDB } from "./database/inMemory/inMemoryDB";

class Server {
  private app: express.Application;

  private postgresDB = PostgresDB.getInstance();

  private readonly httpPort = Number(process.env.TCP_PORT) || 8080;
  private readonly socketPort = Number(process.env.SOCKET_PORT) || 5050;
  private readonly udpPort = Number(process.env.UDP_PORT) || 9090;

  private readonly udp = new UDP();

  constructor() {
    this.app = express();
    this.middleware();
    this.listen();
  }

  private middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(passport.initialize());
  }

  private async listen(): Promise<void> {
    await this.connectToDatabase();

    this.startHTTP();
    this.startUDP();
    this.startSocket();
    this.startScheduledPeriodicTasks();
  }

  private async connectToDatabase(): Promise<void> {
    this.postgresDB.establishConnection();
  }

  private startHTTP() {
    this.app.use("/api/v1/user", userRouter);
    this.app.use("/api/v1/rehabilitation-result", rehabilitationResultRouter);
    this.app.use("/api/v1/rehabilitation-save", rehabilitationSaveRouter);

    this.app.listen(this.httpPort, () => {
      console.log(`HTTP connection port is ${this.httpPort}`);
    }).setTimeout(10 * 1000);
  }

  private startUDP() {
    this.udp.listen(this.udpPort, () => {
      console.log(`UDP connection port is ${this.udpPort}`);
    });
  }

  private startSocket() {

  }

  private startScheduledPeriodicTasks() {
    schedule("10,30,50 * * * * *", () => {
      InMemoryDB.getInstance().CheckUserDeactivation();
    });

    schedule("0 * * * * *", () => {
      if (!InMemoryDB.getInstance().CheckActiveUserExistence()) {
        this.udp.stopSendingDatagram();
      }
    });
  }
}

const server = new Server();
