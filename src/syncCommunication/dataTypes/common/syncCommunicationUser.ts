import { Posture, createPostureFromObject } from "../../../types/posture";
import { RehabilitationCondition, rehabilitationConditions } from "../../../types/rehabilitationCondition";

export class SyncCommunicationUser {
  public constructor(
    public readonly userUuid: string,
    public readonly userName: string,
    public readonly rehabilitationCondition: RehabilitationCondition,
    public readonly reachingProgress: number,
    public readonly headPosture: Posture,
    public readonly leftHandPosture: Posture,
    public readonly rightHandPosture: Posture,
  ) { }
  
  public static fromJson(json: object): SyncCommunicationUser | undefined {

    if (!("userUuid" in json) || typeof json.userUuid !== "string") {
      return undefined;
    }

    if (!("userName" in json) || typeof json.userName !== "string") {
      return undefined;
    }

    if (!("rehabilitationCondition" in json) || !(this.isConvertibleToRehabilitationCondition(json.rehabilitationCondition))) {
      return undefined;
    }

    if (!("reachingProgress" in json) || isNaN(Number(json.reachingProgress))) {
      return undefined;
    }

    if (!("headPosture" in json) || !(typeof json.headPosture === "object" && json.headPosture !== null)) {
      return undefined;
    }

    if (!("leftHandPosture" in json) || !(typeof json.leftHandPosture === "object" && json.leftHandPosture !== null)) {
      return undefined;
    }

    if (!("rightHandPosture" in json) || !(typeof json.rightHandPosture === "object" && json.rightHandPosture !== null)) {
      return undefined;
    }

    const headPosture = createPostureFromObject(json.headPosture);
    const leftHandPosture = createPostureFromObject(json.leftHandPosture);
    const rightHandPosture = createPostureFromObject(json.rightHandPosture);

    if (headPosture === undefined) {
      return undefined;
    }

    if (leftHandPosture === undefined) {
      return undefined;
    }

    if (rightHandPosture === undefined) {
      return undefined;
    }

    return new SyncCommunicationUser(
      json.userUuid,
      json.userName,
      json.rehabilitationCondition as RehabilitationCondition,
      Number(json.reachingProgress),
      headPosture,
      leftHandPosture,
      rightHandPosture,
    );
  }

  private static isConvertibleToRehabilitationCondition(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }

    return rehabilitationConditions.find((element) => element === value) !== undefined; 
  }
}