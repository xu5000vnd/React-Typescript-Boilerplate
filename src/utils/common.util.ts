export const isJson = (str: any): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};