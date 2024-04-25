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
    public readonly usersRehabilitationScore: number,
    public readonly eps: number,
    public readonly headPosture: Posture,
    public readonly leftHandPosture: Posture,
    public readonly rightHandPosture: Posture,
    public readonly leftLegPosture: Posture,
    public readonly rightLegPosture: Posture,
    public readonly pelvisPosture: Posture,
    public readonly rehabilitationObjectPosture: Posture
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

    if (!("rehabilitationProgress" in json) || isNaN(Number(json.rehabilitationProgress))) {
      return undefined;
    }

    if (!("usersRehabilitationScore" in json) || isNaN(Number(json.usersRehabilitationScore))) {
      return undefined;
    }

    if (!("eps" in json) || isNaN(Number(json.eps))) {
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

    if (!("pelvisPosture" in json) || !(typeof json.pelvisPosture === "object" && json.pelvisPosture !== null)) {
      return undefined;
    }

    if (!("rehabilitationObjectPosture" in json) || !(typeof json.rehabilitationObjectPosture === "object" && json.rehabilitationObjectPosture !== null)) {
      return undefined;
    }

    const headPosture = createPostureFromObject(json.headPosture);
    const leftHandPosture = createPostureFromObject(json.leftHandPosture);
    const rightHandPosture = createPostureFromObject(json.rightHandPosture);
    const leftLegPosture = createPostureFromObject(json.leftLegPosture);
    const rightLegPosture = createPostureFromObject(json.rightLegPosture);
    const pelvisPosture = createPostureFromObject(json.pelvisPosture);
    const rehabilitationObjectPosture = createPostureFromObject(json.rehabilitationObjectPosture);

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

    if (pelvisPosture === undefined) {
      return undefined;
    }

    if (rehabilitationObjectPosture === undefined) {
      return undefined;
    }

    return new SyncCommunicationUser(
      json.userUuid,
      json.userName,
      json.avatarType as AvatarType,
      json.rehabilitationCondition as RehabilitationCondition,
      json.avatarState as AvatarState,
      Number(json.rehabilitationProgress),
      Number(json.usersRehabilitationScore),
      Number(json.eps),
      headPosture,
      leftHandPosture,
      rightHandPosture,
      leftLegPosture,
      rightLegPosture,
      pelvisPosture,
      rehabilitationObjectPosture,
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