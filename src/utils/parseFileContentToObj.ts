import yaml from 'yaml';

export const parseFileContentToObj = (content: string) => {
  try {
    return yaml.parse(content);
  } catch {
    return JSON.parse(content);
  }
};
