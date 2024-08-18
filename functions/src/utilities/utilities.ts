export const areEqualDates = (date1?: Date, date2?: Date): boolean => {
  const normalizeDate = (date?: Date): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return normalizeDate(date1) === normalizeDate(date2);
};

export const areEqualStrings = (left?: string, right?: string) => {
  try {
    return left?.toLocaleLowerCase() === right?.toLocaleLowerCase();
  } catch (err) {
    return false;
  }
};

export const areEqualArrays = (arr1?: any[], arr2?: any[]): boolean => {
  if (arr1 === arr2) return true;
  if (arr1 === undefined || arr2 === undefined) return false;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};

export const isMatchString = (left?: string, right?: string) => {
  if (!left && right) {
    return true;
  } else if (left && !right) {
    return false;
  } else if (!left && !right) {
    return false;
  } else return areEqualStrings(left, right);
};

export const isMatchDates = (left?: Date, right?: Date) => {
  if ((left === null || left === undefined) && right) {
    return true;
  } else if (left && (right === null || right === undefined)) {
    return false;
  } else if (
    (left === null || left === undefined) &&
    (right === null || right === undefined)
  ) {
    return false;
  } else return areEqualDates(left, right);
};

export const isMatchArray = (left?: any[], right?: any[]) => {
  if (!left && right) {
    return true;
  } else if (left && !right) {
    return false;
  } else if (!left && !right) {
    return false;
  } else return areEqualArrays(left, right);
};
