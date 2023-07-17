import { ActiveUser } from "../../../database/inMemory/entities/activeUser";
import { Posture } from "../../../types/posture";
import { RehabilitationCondition } from "../../../types/rehabilitationCondition";

export class UDPDownloadData {

  public constructor(
    public readonly timestamp: Date,
    public readonly userUuid: string,
    public readonly rehabilitationCondition: RehabilitationCondition,
    public readonly reachingProgress: number,
    public readonly headPosture: Posture,
    public readonly leftHandPosture: Posture,
    public readonly rightHandPosture: Posture,
  ) { }

  public static fromActiveUser(activeUser: ActiveUser) {
    return new UDPDownloadData(
      new Date(),
      activeUser.uuid,
      activeUser.rehabilitationCondition,
      activeUser.reachingProgress,
      activeUser.headPosture,
      activeUser.leftHandPosture,
      activeUser.rightHandPosture
    );
  }
}