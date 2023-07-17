import { postgresDBDataSource } from "./postgresDBDataSource";

export class PostgresDB {
  private static instance: PostgresDB;

  public readonly dataSource = postgresDBDataSource;

  private constructor() { }

  public static getInstance(): PostgresDB {
    if (!PostgresDB.instance) {
      PostgresDB.instance = new PostgresDB();
    }

    return PostgresDB.instance;
  }
  
  public establishConnection() {
    postgresDBDataSource.initialize().then(async () => {
      console.log("database connection has established");
    }).catch((error) => {
      console.error(error);
    });
  }
}
