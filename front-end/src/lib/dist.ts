export const isUndefinedOrNullString = (object: string | undefined | null) => {
  return object === undefined || object === null || object.trim() === ""
    ? true
    : false;
};
