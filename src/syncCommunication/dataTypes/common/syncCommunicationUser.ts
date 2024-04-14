import { AvatarState, avatarStates } from "../../../types/avatarState";
import { AvatarType, avatarTypes } from "../../../types/avatarType";
import { Posture, createPostureFromObject } from "../../../types/posture";
import { RehabilitationCondition, rehabilitationConditions } from "../../../types/rehabilitationCondition";

export class SyncCommunicationUser {
  public constructor(
    public readonly userUuid: string,
    public readonly userName: string,
    public readonly avatarType: AvatarType,
    public readonly rehabilitationCondition: RehabilitationCondition,
    public readonly avatarState: AvatarState,
    public readonly rehabilitatingProgress: number,
    public readonly headPosture: Posture,
    public readonly leftHandPosture: Posture,
    public readonly rightHandPosture: Posture,
    public readonly leftLegPosture: Posture,
    public readonly rightLegPosture: Posture,
  ) { }
  
  public static fromJson(json: object): SyncCommunicationUser | undefined {

    if (!("userUuid" in json) || typeof json.userUuid !== "string") {
      return undefined;
    }

    if (!("userName" in json) || typeof json.userName !== "string") {
      return undefined;
    }

    if (!("avatarType" in json) || !(this.isConvertibleToAvatarType(json.avatarType))) {
      return undefined;
    }

    if (!("rehabilitationCondition" in json) || !(this.isConvertibleToRehabilitationCondition(json.rehabilitationCondition))) {
      return undefined;
    }

    if (!("avatarState" in json) || !(this.isConvertibleToAvatarState(json.avatarState))) {
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

    if (!("leftLegPosture" in json) || !(typeof json.leftLegPosture === "object" && json.leftLegPosture !== null)) {
      return undefined;
    }

    if (!("rightLegPosture" in json) || !(typeof json.rightLegPosture === "object" && json.rightLegPosture !== null)) {
      return undefined;
    }

    if (!("leftLegPosture" in json) || !(typeof json.leftLegPosture === "object" && json.leftLegPosture !== null)) {
      return undefined;
    }

    const headPosture = createPostureFromObject(json.headPosture);
    const leftHandPosture = createPostureFromObject(json.leftHandPosture);
    const rightHandPosture = createPostureFromObject(json.rightHandPosture);
    const leftLegPosture = createPostureFromObject(json.leftLegPosture);
    const rightLegPosture = createPostureFromObject(json.rightLegPosture);

    if (headPosture === undefined) {
      return undefined;
    }

    if (leftHandPosture === undefined) {
      return undefined;
    }

    if (rightHandPosture === undefined) {
      return undefined;
    }

    if (leftLegPosture === undefined) {
      return undefined;
    }

    if (rightLegPosture === undefined) {
      return undefined;
    }

    return new SyncCommunicationUser(
      json.userUuid,
      json.userName,
      json.avatarType as AvatarType,
      json.rehabilitationCondition as RehabilitationCondition,
      json.avatarState as AvatarState,
      Number(json.reachingProgress),
      headPosture,
      leftHandPosture,
      rightHandPosture,
      leftLegPosture,
      rightLegPosture,
    );
  }

  private static isConvertibleToAvatarType(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }

    return avatarTypes.find((element) => element === value) !== undefined;
  }

  private static isConvertibleToRehabilitationCondition(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }

    return rehabilitationConditions.find((element) => element === value) !== undefined; 
  }

  private static isConvertibleToAvatarState(value: unknown): boolean {
    if (typeof value !== "string") {
      return false;
    }
    
    return avatarStates.find((element) => element === value) !== undefined;
  }
}