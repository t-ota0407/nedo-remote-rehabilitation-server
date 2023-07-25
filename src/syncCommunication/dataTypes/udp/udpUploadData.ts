import { SyncCommunicationUser } from "../common/syncCommunicationUser";

export class UDPUploadData {

  public constructor(
    public readonly timestamp: string,
    public readonly user: SyncCommunicationUser,
  ) { }

  public static fromJson(jsonString: string): UDPUploadData | undefined {
    const parsedObject: object = JSON.parse(jsonString);
    
    if (!("timestamp" in parsedObject) || (typeof parsedObject.timestamp !== "string")) {
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
      parsedObject.timestamp,
      syncCommunicationUser
    );
  }
}
