import moment from "moment";
import { ActiveUser } from "../../../database/inMemory/entities/activeUser";
import { Posture } from "../../../types/posture";
import { RehabilitationCondition } from "../../../types/rehabilitationCondition";
import { SyncCommunicationUser } from "../common/syncCommunicationUser";

export class UDPDownloadData {

  public constructor(
    public readonly timestamp: string,
    public readonly user: SyncCommunicationUser,
  ) { }

  public static fromActiveUser(activeUser: ActiveUser) {
    return new UDPDownloadData(
      this.formatDate(new Date()),
      new SyncCommunicationUser(
        activeUser.uuid,
        activeUser.rehabilitationCondition,
        activeUser.reachingProgress,
        activeUser.headPosture,
        activeUser.leftHandPosture,
        activeUser.rightHandPosture
      )
    );
  }

  private static formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}