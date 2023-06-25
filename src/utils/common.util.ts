import _ from "lodash";

export const isJson = (str: any): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

export const replaceAll = (
  str: string,
  options?: { [key: string]: any }
) => {
  for (const key in options) {
    str = str.replace(`:${key}`, options[key]);
  }
  return str;
};
