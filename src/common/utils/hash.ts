import bcrypt from 'bcrypt';
export const hashData = async (data: string): Promise<string> => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (
  data: string,
  encrypted: string,
): Promise<boolean> => {
  return bcrypt.compare(data, encrypted);
};
