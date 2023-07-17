import { SyncCommunicationUser } from "../common/syncCommunicationUser";

export class UDPUploadData {

  public constructor(
    public readonly timestamp: Date,
    public readonly user: SyncCommunicationUser,
  ) { }

  public static fromJson(jsonString: string): UDPUploadData | undefined {
    const parsedObject: object = JSON.parse(jsonString);
    
    if (!("timestamp" in parsedObject) || !(this.isConvertibleToDate(parsedObject.timestamp))) {
      return undefined;
    }

    if (!("user" in parsedObject)) {
      return undefined;
    }

    const userJson = parsedObject.user;
    if ((typeof userJson !== "object") || (userJson === null)) {
      return undefined;
    }

    const syncCommunicationUser = SyncCommunicationUser.fromJson(userJson);

    if (syncCommunicationUser === undefined) {
      return undefined;
    }

    return new UDPUploadData(
      new Date(parsedObject.timestamp as string),
      syncCommunicationUser
    );
  }

  private static isConvertibleToDate(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }

    const date = new Date(value);
    return date.toString() !== "Invalid Date";
  }
}
