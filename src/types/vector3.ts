export function createVector3(): Vector3 {
  return {
    x: 0,
    y: 0,
    z: 0,
  };
}

export function createVector3FromObject(obj: object): Vector3 | undefined {
  if (!("x" in obj) || !("y" in obj) || !("z" in obj)) {
    return undefined;
  }

  if (isNaN(Number(obj.x)) || isNaN(Number(obj.y)) || isNaN(Number(obj.z))) {
    return undefined;
  }

  return {
    x: Number(obj.x),
    y: Number(obj.y),
    z: Number(obj.z)
  };
}

export type Vector3 = {
  x: number,
  y: number,
  z: number,
};
