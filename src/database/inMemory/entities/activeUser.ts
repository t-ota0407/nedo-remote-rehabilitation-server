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
  private _reachingProgress: number;
  private _headPosture: Posture;
  private _leftHandPosture: Posture;
  private _rightHandPosture: Posture;

  public constructor(
    uuid: string, username: string,
    syncCommunicationProtocol: SyncCommunicationProtocol,
    syncCommunicationOption: SyncCommunicationOption,
    rehabilitationCondition: RehabilitationCondition,
    reachingProgress?: number,
    headPosture?: Posture,
    leftHandPosture?: Posture, rightHandPosture?: Posture
  ) {
    this.uuid = uuid;
    this.username = username;

    this.syncCommunicationProtocol = syncCommunicationProtocol;
    this.syncCommunicationOption = syncCommunicationOption;

    this.createdAt = new Date();
    this._updatedAt = new Date();

    this._rehabilitationCondition = rehabilitationCondition;
    
    this._reachingProgress = 0;
    if (reachingProgress) {
      this._reachingProgress = reachingProgress;
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
  }

  get reachingProgress(): number {
    return this._reachingProgress;
  }

  get rehabilitationCondition(): RehabilitationCondition {
    return this._rehabilitationCondition;
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

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set reachingProgress(value: number) {
    this._reachingProgress = value;
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

  public copy(): ActiveUser {
    return new ActiveUser(
      this.uuid,
      this.username,
      this.syncCommunicationProtocol,
      this.syncCommunicationOption,
      this._rehabilitationCondition,
      this._reachingProgress,
      this._headPosture,
      this._leftHandPosture,
      this._rightHandPosture,
    );
  }
}