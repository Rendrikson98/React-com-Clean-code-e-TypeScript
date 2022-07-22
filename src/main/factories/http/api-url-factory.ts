export const MakeApiURL = (path: string): string => {
  return `process.env.API_URL${path}`;
};
