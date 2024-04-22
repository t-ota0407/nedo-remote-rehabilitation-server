import { create } from "node:domain";
import { AvatarState } from "../../../types/avatarState";
import { AvatarType } from "../../../types/avatarType";
import { Posture, createPosture } from "../../../types/posture";
import { RehabilitationCondition } from "../../../types/rehabilitationCondition";
import { SyncCommunicationOption } from "../../../types/syncCommunicationOption";
import { SyncCommunicationProtocol } from "../../../types/syncCommunicationProtocol";

export class ActiveUser {
  public readonly uuid: string;
  public readonly username: string;

  public readonly syncCommunicationProtocol: SyncCommunicationProtocol;
  public readonly syncCommunicationOption: SyncCommunicationOption;
  
  private readonly createdAt: Date;
  private _updatedAt: Date;

  private _rehabilitationCondition: RehabilitationCondition;
  private _avatarType: AvatarType;
  private _avatarState: AvatarState;
  private _reachingProgress: number;
  private _usersRehabilitationScore: number;
  private _headPosture: Posture;
  private _leftHandPosture: Posture;
  private _rightHandPosture: Posture;
  private _leftLegPosture: Posture;
  private _rightLegPosture: Posture;
  private _pelvisPosture: Posture;
  private _rehabilitationObjectPosture: Posture;

  public constructor(
    uuid: string, username: string,
    syncCommunicationProtocol: SyncCommunicationProtocol,
    syncCommunicationOption: SyncCommunicationOption,
    rehabilitationCondition: RehabilitationCondition,
    avatarType: AvatarType,
    avatarState: AvatarState,
    reachingProgress?: number,
    usersRehabilitationScore?: number,
    headPosture?: Posture,
    leftHandPosture?: Posture, rightHandPosture?: Posture,
    leftLegPosture?: Posture, rightLegPosture?: Posture,
    pelvisPosture?: Posture,
    rehabilitationObjectPosture?: Posture,
  ) {
    this.uuid = uuid;
    this.username = username;

    this.syncCommunicationProtocol = syncCommunicationProtocol;
    this.syncCommunicationOption = syncCommunicationOption;

    this.createdAt = new Date();
    this._updatedAt = new Date();

    this._rehabilitationCondition = rehabilitationCondition;

    this._avatarType = avatarType;

    this._avatarState = avatarState;
    
    this._reachingProgress = 0;
    if (reachingProgress) {
      this._reachingProgress = reachingProgress;
    }

    this._usersRehabilitationScore = 0;
    if (usersRehabilitationScore) {
      this._usersRehabilitationScore = usersRehabilitationScore;
    }

    this._headPosture = createPosture();
    if (headPosture) {
      this._headPosture = headPosture;
    }
    
    this._leftHandPosture = createPosture();
    if (leftHandPosture) {
      this._leftHandPosture = leftHandPosture;
    }

    this._rightHandPosture = createPosture();
    if (rightHandPosture) {
      this._rightHandPosture = rightHandPosture;
    }

    this._leftLegPosture = createPosture();
    if (leftLegPosture) {
      this._leftLegPosture = leftLegPosture;
    }

    this._rightLegPosture = createPosture();
    if (rightLegPosture) {
      this._rightLegPosture = rightLegPosture;
    }

    this._pelvisPosture = createPosture();
    if (pelvisPosture) {
      this._pelvisPosture = pelvisPosture;
    }

    this._rehabilitationObjectPosture = createPosture();
    if (rehabilitationObjectPosture) {
      this._rehabilitationObjectPosture = rehabilitationObjectPosture;
    }
  }

  get reachingProgress(): number {
    return this._reachingProgress;
  }

  get avatarType(): AvatarType {
    return this._avatarType;
  }

  get rehabilitationCondition(): RehabilitationCondition {
    return this._rehabilitationCondition;
  }

  get avatarState(): AvatarState {
    return this._avatarState;
  }

  get headPosture(): Posture {
    return this._headPosture;
  }

  get leftHandPosture(): Posture {
    return this._leftHandPosture;
  }

  get rightHandPosture(): Posture {
    return this._rightHandPosture;
  }

  get leftLegPosture(): Posture {
    return this._leftLegPosture;
  }

  get rightLegPosture(): Posture {
    return this._rightLegPosture;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set avatarState(value: AvatarState) {
    this._avatarState = value;
    this._updatedAt = new Date();
  }

  set reachingProgress(value: number) {
    this._reachingProgress = value;
    this._updatedAt = new Date();
  }

  set usersRehabilitationScore(value: number) {
    this._usersRehabilitationScore = value;
    this._updatedAt = new Date();
  }

  set rehabilitationCondition(value: RehabilitationCondition) {
    this.rehabilitationCondition = value;
    this._updatedAt = new Date();
  }

  set headPosture(value: Posture) {
    this._headPosture = value;
    this._updatedAt = new Date();
  }

  set leftHandPosture(value: Posture) {
    this._leftHandPosture = value;
    this._updatedAt = new Date();
  }

  set rightHandPosture(value: Posture) {
    this._rightHandPosture = value;
    this._updatedAt = new Date();
  }

  set leftLegPosture(value: Posture) {
    this._leftLegPosture = value;
    this._updatedAt = new Date();
  }

  set rightLegPosture(value: Posture) {
    this._rightLegPosture = value;
    this._updatedAt = new Date();
  }

  set pelvisPosture(value: Posture) {
    this._pelvisPosture = value;
    this._updatedAt = new Date();
  }

  set rehabilitationObjectPosture(value: Posture) {
    this._rehabilitationObjectPosture = value;
    this._updatedAt = new Date();
  }

  public copy(): ActiveUser {
    return new ActiveUser(
      this.uuid,
      this.username,
      this.syncCommunicationProtocol,
      this.syncCommunicationOption,
      this._rehabilitationCondition,
      this._avatarType,
      this._avatarState,
      this._reachingProgress,
      this._usersRehabilitationScore,
      this._headPosture,
      this._leftHandPosture,
      this._rightHandPosture,
      this._leftLegPosture,
      this._rightLegPosture,
      this._pelvisPosture,
      this._rehabilitationObjectPosture,
    );
  }
}