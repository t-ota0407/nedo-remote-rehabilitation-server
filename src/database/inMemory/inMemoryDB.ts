import { ActiveUser } from "./entities/activeUser";

export class InMemoryDB {
  private static instance: InMemoryDB;

  private activeUsers: ActiveUser[] = [];

  private constructor() { }

  public static getInstance(): InMemoryDB {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }

    return InMemoryDB.instance;
  }

  public findUser(uuid: string): ActiveUser | undefined {
    const user = this.activeUsers.find((user) => user.uuid === uuid);
    return user;
  }

  public getActiveUsersClone() {
    return this.activeUsers.map(item => item.copy());
  }

  public addActiveUser(user: ActiveUser) {
    this.activeUsers.push(user);
    return user;
  }

  public removeActiveUser(uuid: string) {
    this.activeUsers = this.activeUsers.filter(user => user.uuid !== uuid);
  }
}