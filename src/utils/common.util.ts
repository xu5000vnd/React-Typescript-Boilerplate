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
  templateString: string,
  options?: { [key: string]: any }
) => {
  const compiledTemplate = _.template(templateString);
  return compiledTemplate(options);
};
