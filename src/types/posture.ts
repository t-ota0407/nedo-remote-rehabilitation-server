import { Vector3, createVector3, createVector3FromObject } from "./vector3";

export function createPosture(): Posture {
  return {
    position: createVector3(),
    rotation: createVector3(),
  }
}

export function createPostureFromObject(obj: object): Posture | undefined {
  if (!("position" in obj) || !(typeof obj.position === "object" && obj.position !== null)) {
    return undefined;
  }

  if (!("rotation" in obj) || !(typeof obj.rotation === "object" && obj.rotation !== null)) {
    return undefined;
  }

  const position = createVector3FromObject(obj.position);
  const rotation = createVector3FromObject(obj.rotation);

  if (position === undefined || rotation === undefined) {
    return undefined;
  }

  return {
    position,
    rotation,
  };
}

export type Posture = {
  position: Vector3,
  rotation: Vector3,
};
