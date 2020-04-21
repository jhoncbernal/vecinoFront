export const deepCopy = (value: any) => {
  if (value instanceof Date) {
    return new Date(value);
  }
  if (typeof value === "object") {
    if (value === null) return null;

    if (Array.isArray(value)) {
      const array = new Array(value.length);
      for (let index = 0; index < value.length; index++) {
        array[index] = deepCopy(value[index]);
      }
      return array;
    }

    if (Buffer && Buffer.isBuffer(value)) {
      return Buffer.from(value);
    }

    const object = new value.constructor();
    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        object[k] = deepCopy(value[k]);
      }
    }
    return object;
  }
  return value;
};
